import React from 'react';
import {Link} from 'react-router-dom';
import {bool, func, number, string} from 'prop-types';
import './index.css';

import {scrollIt} from '../../lib/smoothScroll';

import logo from '../../../assets/img/logo-head.png';

const Menu = ({show, handleCloseMenu, topPosition, activeNav, productsPosition, aboutPosition, contactPosition}) => {
    return (
        <div className={show ? `menu-slide-in menu` : `menu`} style={{top: topPosition}}>
            <div className="menu-header">
                <div className="nav-indicator upper">
                    <span className="nav-indicator-block nav-indicator-block-white" />menu
                </div>
                <div className="menu-close pointer" onClick={handleCloseMenu}>
                    <i className="fas fa-times" />
                </div>
            </div>
            <nav>
                <ul className="menu-list">
                    <li
                        className={
                            activeNav === `bull`
                                ? `upper pointer menu-list-item menu-list-item-active`
                                : `upper pointer menu-list-item`
                        }
                        onClick={() => {
                            handleCloseMenu();
                            scrollIt(0, 400, `easeOutQuad`, 300);
                        }}>
                        <Link to="/#home">home</Link>
                    </li>
                    <li
                        className={
                            activeNav === `products`
                                ? `upper pointer menu-list-item menu-list-item-active`
                                : `upper pointer menu-list-item`
                        }
                        onClick={() => {
                            handleCloseMenu();
                            scrollIt(productsPosition, 400, `easeOutQuad`, 300);
                        }}>
                        <Link to="/#products">products</Link>
                    </li>
                    <li
                        className={
                            activeNav === `about`
                                ? `upper pointer menu-list-item menu-list-item-active`
                                : `upper pointer menu-list-item`
                        }
                        onClick={() => {
                            handleCloseMenu();
                            scrollIt(aboutPosition, 400, `easeOutQuad`, 300);
                        }}>
                        <Link to="/#about">about</Link>
                    </li>
                    <li
                        className={
                            activeNav === `contact`
                                ? `upper pointer menu-list-item menu-list-item-active`
                                : `upper pointer menu-list-item`
                        }
                        onClick={() => {
                            handleCloseMenu();
                            scrollIt(contactPosition, 400, `easeOutQuad`, 300);
                        }}>
                        <Link to="/#contact">contact</Link>
                    </li>
                </ul>
            </nav>
            <div className="menu-background" style={show ? {display: 'flex'} : {display: 'none'}}>
                <img alt="" src={logo} />
            </div>
        </div>
    );
};

Menu.propTypes = {
    show: bool.isRequired,
    handleCloseMenu: func.isRequired,
    topPosition: number,
    activeNav: string,
    productsPosition: number,
    aboutPosition: number,
    contactPosition: number
};

Menu.defaultProps = {
    topPosition: 0,
    activeNav: `bull`,
    productsPosition: 0,
    aboutPosition: 0,
    contactPosition: 0
};
export default Menu;
