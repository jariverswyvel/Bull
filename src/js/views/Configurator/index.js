import React, { Component, Fragment } from 'react';
import './index.css';

import Menu from '../../components/Menu';
import Overlay from '../../components/Overlay';
import OptionsHolder from './OptionsHolder';

import oak from '../../../assets/img/oak.jpeg';
import maple from '../../../assets/img/maple.jpg';
import walnut from '../../../assets/img/walnut.jpg';
import yellowMarble from '../../../assets/img/yellowMarble.jpg';
import blueMarble from '../../../assets/img/blueMarble.jpg';
import granite from '../../../assets/img/granite.jpg';
import lighting from '../../../assets/img/lighting.jpeg';
import loader from '../../../assets/svg/loader.svg';

import { parserData } from '../../lib/helpers';
import threeEntryPoint from '../../lib/threejs/threeEntryPoint';

class Configurator extends Component {
    state = {
        rendered: false,
        showMenu: false,
        optionPage: 1,
        selectedArmatuurOption: `oak`,
        selectedSteenOption: `granite`,
        selectedBelichtingOption: `geen belichting`,
        selectedOptions: {
            Armatuur: {
                type: `Armatuur`,
                title: `oak`,
                price: 0,
                img: oak
            },
            Steen: {
                type: `Steen`,
                title: `granite`,
                price: 0,
                img: granite
            },
            Belichting: {
                type: `Belichting`,
                title: `geen belichting`,
                price: 0,
                img: lighting
            }
        }
    };

    componentDidMount() {
        threeEntryPoint(this.renderNode, `chair/chair.json`, () => this.setState({ rendered: true }));
    }

    armatureOptions = [
        {
            type: `Armatuur`,
            title: `oak`,
            price: 0,
            img: oak
        },
        {
            type: `Armatuur`,
            title: `maple`,
            price: 1000,
            img: maple
        },
        {
            type: `Armatuur`,
            title: `walnut`,
            price: 1500,
            img: walnut
        }
    ];

    stoneOptions = [
        {
            type: `Steen`,
            title: `granite`,
            price: 0,
            img: granite
        },
        {
            type: `Steen`,
            title: `yellow marble`,
            price: 1000,
            img: yellowMarble
        },
        {
            type: `Steen`,
            title: `blue marble`,
            price: 1200,
            img: blueMarble
        }
    ];

    lightingOptions = [
        {
            type: `Belichting`,
            title: `geen belichting`,
            price: 0,
            img: lighting
        },
        {
            type: `Belichting`,
            title: `belichting`,
            price: 700,
            img: lighting
        }
    ];

    handleShowMenu = () => {
        const { showMenu } = this.state;
        this.setState({ showMenu: !showMenu });
        document.querySelector(`html`).classList.toggle(`no-scroll`);
    };

    handleChooseOption = (type, title, img, price) => {
        const { selectedOptions, selectedArmatuurOption } = this.state;
        const previousOption = this.state[`selected${type}Option`];
        this.setState(
            { selectedOptions: { ...selectedOptions, [type]: { type, title, img, price } }, [`selected${type}Option`]: title },
            () => {
                switch (selectedArmatuurOption) {
                    case `oak`:
                        if (previousOption !== `oak`) {
                            this.setState({ rendered: false }, () => {
                                this.renderNode.innerHTML = null;
                                threeEntryPoint(this.renderNode, `chair/chair.json`, () => this.setState({ rendered: true }));
                            });
                        }
                        break;
                    case `maple`:
                        if (previousOption !== `maple`) {
                            this.setState({ rendered: false }, () => {
                                this.renderNode.innerHTML = null;
                                threeEntryPoint(this.renderNode, `couch/couch.json`, () => this.setState({ rendered: true }));
                            });
                        }
                        break;
                    case `walnut`:
                        if (previousOption !== `walnut`) {
                            this.setState({ rendered: false }, () => {
                                this.renderNode.innerHTML = null;
                                threeEntryPoint(this.renderNode, `car/car.json`, () => this.setState({ rendered: true }));
                            });
                        }
                        break;
                    default:
                        break;
                }
            }
        );
    };

    handleChangeOptionsView = direction => {
        if (typeof direction === `string`) {
            const { optionPage } = this.state;
            this.setState({ optionPage: direction === `next` ? optionPage + 1 : optionPage - 1 });
        } else {
            this.setState({ optionPage: direction });
        }
    };

    render() {
        const {
            rendered,
            showMenu,
            selectedOptions,
            selectedArmatuurOption,
            selectedSteenOption,
            selectedBelichtingOption,
            optionPage
        } = this.state;

        const pricing = Object.keys(selectedOptions).map(option => selectedOptions[option].price);

        return (
            <Fragment>
                <Menu
                    aboutPosition={this.aboutNode ? this.aboutNode.offsetTop : 0}
                    activeNav="configurator"
                    contactPosition={this.contactNode ? this.contactNode.offsetTop : 0}
                    handleCloseMenu={this.handleShowMenu}
                    productsPosition={this.productsNode ? this.productsNode.offsetTop : 0}
                    show={showMenu}
                    topPosition={this.last_known_scroll_position}
                />
                <div>
                    <Overlay
                        aboutPosition={this.aboutNode ? this.aboutNode.offsetTop : 0}
                        activeNav="configurator"
                        contactPosition={this.contactNode ? this.contactNode.offsetTop : 0}
                        handleShowMenu={this.handleShowMenu}
                        productsPosition={this.productsNode ? this.productsNode.offsetTop : 0}
                        show={showMenu}
                    />
                    <section className="configurator">
                        <div className="configurator-main">
                            <div style={{ width: `100%`, height: `40rem`, position: `relative` }}>
                                <div className="configurator-render-node" ref={node => (this.renderNode = node)} />
                                {!rendered && (
                                    <div className="render-overlay">
                                        <img alt="" src={loader} />
                                    </div>
                                )}
                            </div>
                            <div className="configurator-options">
                                <h3 className="configurator-options-title upper">
                                    {optionPage === 1 && `Armatuur`}
                                    {optionPage === 2 && `Steen`}
                                    {optionPage === 3 && `Belichting`}
                                </h3>
                                <div className="configurator-selection">
                                    <div
                                        className="configurator-selection-button upper pointer"
                                        onClick={() => (optionPage === 1 ? false : this.handleChangeOptionsView(`previous`))}
                                        style={optionPage === 1 ? { opacity: 0 } : {}}>
                                        <i className="fas fa-arrow-left" />
                                        previous
                                    </div>
                                    {optionPage === 1 && (
                                        <OptionsHolder
                                            handleChooseOption={this.handleChooseOption}
                                            options={this.armatureOptions}
                                            selectedOption={selectedArmatuurOption}
                                        />
                                    )}
                                    {optionPage === 2 && (
                                        <OptionsHolder
                                            handleChooseOption={this.handleChooseOption}
                                            options={this.stoneOptions}
                                            selectedOption={selectedSteenOption}
                                        />
                                    )}
                                    {optionPage === 3 && (
                                        <OptionsHolder
                                            handleChooseOption={this.handleChooseOption}
                                            options={this.lightingOptions}
                                            selectedOption={selectedBelichtingOption}
                                        />
                                    )}
                                    <div
                                        className="configurator-selection-button upper pointer"
                                        onClick={() => (optionPage === 3 ? false : this.handleChangeOptionsView(`next`))}
                                        style={optionPage === 3 ? { opacity: 0 } : {}}>
                                        <i className="fas fa-arrow-right" />
                                        next
                                    </div>
                                </div>
                            </div>
                        </div>
                        <aside className="selected-options">
                            <h2 className="upper selected-options-title">geselecteerde opties</h2>
                            {Object.keys(selectedOptions).map((option, index) => (
                                <div
                                    className="selected-option pointer"
                                    key={index}
                                    onClick={() => this.handleChangeOptionsView(index + 1)}>
                                    <h3 className="upper">{selectedOptions[option].type}</h3>
                                    <div className="selected-option-img">
                                        <img alt="" className="cover" src={selectedOptions[option].img} />
                                    </div>
                                </div>
                            ))}
                            <p className="configuration-price">€ {parserData(5000 + pricing.reduce((a, b) => a + b, 0))} </p>
                        </aside>
                    </section>
                </div>
            </Fragment>
        );
    }
}

export default Configurator;
