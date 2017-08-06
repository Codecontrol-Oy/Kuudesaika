import React from 'react';
import PropTypes from 'prop-types';
import CheckMarkIcon from 'grommet/components/icons/base/Checkmark';
import InformationIcon from 'grommet/components/icons/base/CircleInformation';
import ArchivedIcon from 'grommet/components/icons/base/Archive';
import RejectedIcon from 'grommet/components/icons/base/Close';
import ReturnedIcon from 'grommet/components/icons/base/Cycle';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Heading';
import theme from '../theme/global.scss';

export default class Breadcrumb extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
        action: null
    };
  }

  getResolution = (value) => {
        switch (value) {
            case 'PASSED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><CheckMarkIcon colorIndex={"ok"} /> Hyväksytty ehdotuksen mukaan</Heading>;
            }
            case 'PASSED_MODIFIED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><CheckMarkIcon colorIndex={"ok"} /> Hyväksytty esittelijän ehdotuksesta poiketen</Heading>;
            }
            case 'PASSED_REVISED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><CheckMarkIcon colorIndex={"ok"} /> Hyväksytty esittelijän muutetun ehdotuksen mukaan</Heading>;
            }
            case 'PASSED_VOTED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><CheckMarkIcon colorIndex={"ok"} /> Hyväksytty ehdotuksen mukaan äänestyksin</Heading>;
            }
            case '': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><InformationIcon colorIndex={"unknown"} /> Ei tietoa päätöksestä</Heading>;
            }
            case 'NOTED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><InformationIcon colorIndex={"unknown"} /> Merkittiin tiedoksi</Heading>;
            }
            case 'TABLED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><ArchivedIcon colorIndex={"unknown"} /> Pöydätty</Heading>;
            }
            case 'REJECTED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><RejectedIcon colorIndex={"critical"} /> Hylätty</Heading>;
            }
            case 'RETURNED': {
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><ReturnedIcon colorIndex={"warning"} /> Palautettu</Heading>;
            }
            default:
                return <Heading className={theme.marginTop} tag={"h4"} uppercase><ReturnedIcon colorIndex={"warning"} />-</Heading>;
        }
  }

  render () {
    return (
        <div>
            {this.getResolution(this.props.resolution)}
        </div>
    );
  }
}

Breadcrumb.propTypes = {
    resolution: PropTypes.string,
};