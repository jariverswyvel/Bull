import React from 'react';
import {Link} from 'react-router-dom';
import {func, string, number} from 'prop-types';
import './index.css';

import logo from '../../../assets/img/logo-head.png';
import menuIcon from '../../../assets/svg/menu-icon.svg';

import {scrollIt} from '../../lib/smoothScroll';

const Overlay = ({activeNav, handleShowMenu, productsPosition, aboutPosition, contactPosition}) => {
    return (
        <div className="overlay">
            <header className="overlay-header">
                <div className="nav-indicator upper">
                    <span className="nav-indicator-block" />
                    <span className="nav-indicator-title">{activeNav}</span>
                </div>
                <div
                    className="overlay-logo pointer"
                    onClick={() => scrollIt(0, 300, `easeInQuad`)}
                    style={activeNav !== `bull` ? {transform: 'translateY(0)'} : {}}>
                    <Link to="/">
                        <div>
                            <img alt="" src={logo} />
                            <p className="upper">bull</p>
                        </div>
                    </Link>
                </div>
                <div className="menu-icon pointer" onClick={handleShowMenu}>
                    <span className="hide">menu</span>
                    <img alt="" src={menuIcon} />
                </div>
            </header>
            <footer className="overlay-footer">
                {activeNav !== `configurator` && (
                    <nav className="overlay-nav">
                        <ul>
                            <li className="pointer" onClick={() => scrollIt(0, 300, `easeInQuad`)}>
                                <span
                                    className={
                                        activeNav === `bull` ? `overlay-nav-item overlay-nav-item-active` : `overlay-nav-item`
                                    }
                                />
                            </li>
                            <li className="pointer" onClick={() => scrollIt(productsPosition, 300, `easeInQuad`)}>
                                <span
                                    className={
                                        activeNav === `products` ? `overlay-nav-item overlay-nav-item-active` : `overlay-nav-item`
                                    }
                                />
                            </li>
                            <li className="pointer" onClick={() => scrollIt(aboutPosition, 300, `easeInQuad`)}>
                                <span
                                    className={
                                        activeNav === `about` ? `overlay-nav-item overlay-nav-item-active` : `overlay-nav-item`
                                    }
                                />
                            </li>
                            <li className="pointer" onClick={() => scrollIt(contactPosition, 300, `easeInQuad`)}>
                                <span
                                    className={
                                        activeNav === `contact` ? `overlay-nav-item overlay-nav-item-active` : `overlay-nav-item`
                                    }
                                />
                            </li>
                        </ul>
                    </nav>
                )}
            </footer>
        </div>
    );
};

Overlay.propTypes = {
    activeNav: string.isRequired,
    handleShowMenu: func.isRequired,
    productsPosition: number.isRequired,
    aboutPosition: number.isRequired,
    contactPosition: number.isRequired
};

export default Overlay;
