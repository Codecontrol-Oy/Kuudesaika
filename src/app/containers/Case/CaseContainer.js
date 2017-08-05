import React from 'react';
import { connect } from 'react-redux';
import theme from '../../theme/global.scss';
import axios from 'axios';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Section';
import Article from 'grommet/components/Article';
import Label from 'grommet/components/Label';
import Timestamp from 'grommet/components/Timestamp';
import Accordion from 'grommet/components/Accordion';
import AccordionPanel from 'grommet/components/AccordionPanel';
import Heading from 'grommet/components/Heading';
import { OrganizationMap, Loader } from 'Components';
import {browserHistory} from 'react-router';
import { fetchLatest, fetchCase, setCity } from 'Actions';

@connect((store) => {
	return {
		selected_case: store.case.selected_case,
		cases: store.case.latest_cases
	};
})

export default class CaseContainer extends React.Component {
	constructor (props) {
		super(props);
		this.state = {
			actionListing: null,
			actions: null,
			organizations: null,
			pending: true,
			selected_case: null
		};
		self = this;
	}

	componentDidMount = () => {
		setCity(this.props.params.city);
		const case_id = this.props.params.id;
		this.setState({ fetchStarted: false }, function () {
			fetchLatest();
			fetchCase(case_id);
		});
	}

	componentDidUpdate = () => {
		const selected_case = this.state.selected_case || this.props.selected_case;
		if (selected_case && !this.state.fetchStarted) {
			console.log(selected_case);
			this.setState({ fetchStarted: true }, function () {
				if (selected_case.actions.length > 0) {
					this.fetchActions(selected_case);
				}
				if (selected_case.geometries.length > 0) {
					console.log('---- GEOMETRIES ----');
					console.log(selected_case.geometries);
				}
			});
		}

	}

	gatherActions = () => {
		const actionListing = [];
		if (this.state.actions) {
			this.state.actions.map(function (action) {
				let actionList = [];
				action.contents.sort((a, b) => a.ordering - b.ordering)
					.map(function (content) {
						actionList.push(<Section key={content.origin_id + '_Action'}>
							<Heading tag={"h5"} uppercase>
								{content.title}
							</Heading>
							<Article><div dangerouslySetInnerHTML={{ __html: content.hypertext }}></div></Article>
						</Section>);
					});
				actionListing.push(<AccordionPanel
					key={action.id + '_actionValue'}
					heading={<Label>{action.title}</Label>}>
					{actionList}
					<Heading tag={"h5"}>
						Käsitelty <Timestamp
										fields={"date"}
										value={action.event ? action.event.start_date : action.post.start_date}
									/>
						{action.event ? action.event.organization.name : action.post.organization.name} kokouksessa.
					</Heading>
					{action.post && <Label>Lausunnonantaja: {action.post.label}</Label>}
					<Anchor onClick={() => self.onLinkAction(action.event ? action.event.organization.id : action.post.organization.id)} >Siirry</Anchor>
				</AccordionPanel>);
			});
		}
    return actionListing;
	}


	fetchActions = (selected_case) => {
		if (selected_case.function) {
			axios.get(selected_case.function)
				.then(function (functionResponse) {
					selected_case.function = functionResponse.data;
					self.setState({selected_case});
				});
		}
		selected_case.actions.map((action) => {
			axios.get(action)
				.then(function (actionResponse) {
					const currentAction = actionResponse.data;

					if (currentAction.event) {
						axios.get(currentAction.event)
							.then(function (eventResponse) {
								currentAction.event = eventResponse.data;
								axios.get(currentAction.event.organization)
									.then(function (orgResponse) {
										currentAction.event.organization = orgResponse.data;
										const actions = self.state.actions || [];
										const organizations = self.state.organizations || [];
										actions.push(currentAction);
										organizations.push(orgResponse.data);
										self.setState({ actions, organizations, pending: false });
									});
							});
					} else {
						axios.get(currentAction.post)
							.then(function (postResponse) {
								currentAction.post = postResponse.data;
								axios.get(currentAction.post.organization)
									.then(function (orgResponse) {
										currentAction.post.organization = orgResponse.data;
										const actions = self.state.actions || [];
										const organizations = self.state.organizations || [];
										actions.push(currentAction);
										organizations.push(orgResponse.data);
										self.setState({ actions, organizations, pending: false });
									});
							});
					}
				});
	});
}

	onLinkAction = (id) => {
		browserHistory.push('/organisaatio/' + id);
	}

	render () {
		const cases = this.props.cases;
		const selected_case = this.state.selected_case;
		const actions = this.gatherActions();
		const attachments = this.state.attachments;
		const pending = this.state.pending;

		return (
			<Section>
				{selected_case && cases
					? <div>
						<Heading tag={"h3"} uppercase className={theme.sectionTitle}>
							{selected_case.title}
						<Article><Label>{selected_case.function.name}</Label></Article>
						</Heading>

						<Heading className={theme.marginTop} tag={"h4"} uppercase>Maininnat</Heading>
						{!pending
						? actions && actions.length > 0
						? <Accordion onActive={this.onAccordionChange}>
								{actions}
							</Accordion>
						: <Label>Ei mainintoja</Label>
						: <Loader />
						}

						<Heading className={theme.marginTop} tag={"h4"} uppercase>Liitteet</Heading>
						{!pending
						? attachments && attachments.length > 0
							? <Accordion onActive={this.onPostAccordionChange}>
								{attachments}
							</Accordion>
							: <Label>Ei liitteitä</Label>
						: <Loader />
						}
					</div>
					: <Loader />
				}
			</Section>
		);
	}
}
