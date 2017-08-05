import React from 'react';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
import {setCity} from 'Actions';
import {browserHistory} from 'react-router';

export default class LandingPageContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  onSelectCity = (value) => {
    setCity(value);
    browserHistory.push(`/${value}`);
  }

  componentDidMount = () => {
      console.log("inside");
  }

  render () {
    return (
        <Section>
                <Tiles>
                <Card flex={"grow"}
                    heading={"Helsinki"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 1} />}
                    headingStrong
                    link={<Anchor onClick={() => this.onSelectCity('Helsinki')} label={"siirry"} />}/>
                <Card flex={"grow"}
                    heading={"Espoo"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 2} />}
                    headingStrong
                    link={<Anchor onClick={() => this.onSelectCity('Espoo')} label={"siirry"} />}/>
                <Card flex={"grow"}
                    heading={"Turku"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 3} />}
                    headingStrong
                    link={<Anchor onClick={() => this.onSelectCity('Turku')} label={"siirry"} />}/>
                <Card flex={"grow"}
                    heading={"Oulu"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 4} />}
                    headingStrong
                    link={<Anchor onClick={() => this.onSelectCity('Oulu')} label={"siirry"} />}/>
                <Card flex={"grow"}
                    heading={"Tampere"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 5} />}
                    headingStrong
                    link={<Anchor onClick={() => this.onSelectCity('Tampere')} label={"siirry"} />}/>
                <Card flex={"grow"}
                    heading={"Vantaa"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 6} />}
                    headingStrong
                    link={<Anchor onClick={() => this.onSelectCity('Vantaa')} label={"Vantaa"} />}/>
                </Tiles>    
        </Section>
    );
  }
}