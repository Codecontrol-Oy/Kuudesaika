import React from 'react';
import { connect } from 'react-redux';
import Section from 'grommet/components/Section';
import Anchor from 'grommet/components/Anchor';
import Tiles from 'grommet/components/Tiles';
import Card from 'grommet/components/Card';
import Image from 'grommet/components/Image';
import {setCity} from 'Actions';
import {browserHistory} from 'react-router';
import theme from './LandingPageContainer.scss';

export default class LandingPageContainer extends React.Component {
  constructor (props) {
    super(props);
  }

  onSelectCity = (value) => {
    setCity(value);
    browserHistory.push(`/${value}`);
  }

  render () {
    return (
        <Section>
                <Tiles>
                <Card
                    heading={"Helsinki"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 1} />}
                    headingStrong
                    onClick={() => this.onSelectCity('Helsinki')} 
                    link={<Anchor onClick={() => this.onSelectCity('Helsinki')} label={"siirry"} />}
                    className={theme.cardShadow}/>
                <Card
                    heading={"Espoo"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 2} />}
                    headingStrong
                    onClick={() => this.onSelectCity('Espoo')}
                    link={<Anchor onClick={() => this.onSelectCity('Espoo')} label={"siirry"} />}
                    className={theme.cardShadow}/>
                <Card
                    heading={"Turku"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 3} />}
                    headingStrong
                    onClick={() => this.onSelectCity('Turku')}                  
                    link={<Anchor onClick={() => this.onSelectCity('Turku')} label={"siirry"} />}
                    className={theme.cardShadow}/>
                <Card
                    heading={"Oulu"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 4} />}
                    headingStrong
                    onClick={() => this.onSelectCity('Oulu')}
                    link={<Anchor onClick={() => this.onSelectCity('Oulu')} label={"siirry"} />}
                    className={theme.cardShadow}/>
                <Card
                    heading={"Tampere"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 5} />}
                    headingStrong
                    onClick={() => this.onSelectCity('Tampere')}                    
                    link={<Anchor onClick={() => this.onSelectCity('Tampere')} label={"siirry"} />}
                    className={theme.cardShadow}/>
                <Card
                    heading={"Vantaa"}
                    thumbnail={<Image alt={"temporary image"} src={'http://lorempixel.com/640/480/city?' + 6} />}
                    headingStrong
                    onClick={() => this.onSelectCity('Vantaa')}                
                    link={<Anchor onClick={() => this.onSelectCity('Vantaa')} label={"siirry"} />}
                    className={theme.cardShadow}/>
                </Tiles>
        </Section>
    );
  }
}