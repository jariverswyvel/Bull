import React, { Component, Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { objectOf, any } from 'prop-types';
import './index.css';

import Menu from '../../components/Menu';
import Overlay from '../../components/Overlay';
import Input from '../../components/Input';

import logo from '../../../assets/img/logo-head.png';
import lamp from '../../../assets/img/stone-lamp.png';

import threeEntryPoint from '../../lib/threejs/threeEntryPoint';
import { scrollIt } from '../../lib/smoothScroll';

class Home extends Component {
    state = {
        showMenu: false,
        activeNav: `bull`,
        activeProduct: 1
    };

    componentDidMount() {
        console.log(`mounted`);
        this.handleScrollFromOtherPage();
        this.setState({ mounted: true });
        // threeEntryPoint(this.tableRenderNode, `chair/chair.json`);
        threeEntryPoint(this.tableRenderNode2, `car/car.json`);
        // threeEntryPoint(this.tableRenderNode3, `couch/couch.json`);
        window.addEventListener(`scroll`, this.handleScroll);
    }

    componentWillUnmount() {
        console.log(`unmounted`);
        window.removeEventListener(`scroll`, this.handleScroll);
    }

    last_known_scroll_position = 0;
    ticking = false;

    handleChangeHeader = scroll_pos => {
        if (scroll_pos <= this.productsNode.offsetTop) {
            this.setState({ activeNav: `bull` });
            document.removeEventListener(`keyup`, this.handleKeyPress);
        }
        if (scroll_pos >= this.productsNode.offsetTop - 200) {
            this.setState({ activeNav: `products` });
            document.addEventListener(`keyup`, this.handleKeyPress);
        }
        if (scroll_pos >= this.aboutNode.offsetTop - 200) {
            this.setState({ activeNav: `about` });
            document.removeEventListener(`keyup`, this.handleKeyPress);
        }
        if (scroll_pos >= this.contactNode.offsetTop - 200) {
            this.setState({ activeNav: `contact` });
            document.removeEventListener(`keyup`, this.handleKeyPress);
        }
    };

    handleKeyPress = e => {
        e = e || window.event;

        switch (e.keyCode) {
            case 37:
                this.handleMoveCarousel(`left`);
                break;
            case 39:
                this.handleMoveCarousel(`right`);
                break;
            default:
                break;
        }
    };

    handleScroll = () => {
        this.last_known_scroll_position = window.scrollY;

        if (!this.ticking) {
            window.requestAnimationFrame(() => {
                this.handleChangeHeader(this.last_known_scroll_position);
                this.ticking = false;
            });

            this.ticking = true;
        }
    };

    handleScrollFromOtherPage = () => {
        const {
            location: { hash }
        } = this.props;

        switch (hash) {
            case `#products`:
                this.setState({ showMenu: true }, () => this.setState({ showMenu: false }));
                scrollIt(this.productsNode.offsetTop, 400, `easeOutQuad`, 300);
                break;
            case `#about`:
                this.setState({ showMenu: true }, () => this.setState({ showMenu: false }));
                scrollIt(this.aboutNode.offsetTop, 400, `easeOutQuad`, 300);
                break;
            case `#contact`:
                this.setState({ showMenu: true }, () => this.setState({ showMenu: false }));
                scrollIt(this.contactNode.offsetTop, 400, `easeOutQuad`, 300);
                break;
            case `#home`:
                this.setState({ showMenu: true }, () => this.setState({ showMenu: false }));
                break;
            default:
                break;
        }
    };

    onChange = (e, name) => this.setState({ [name]: e.currentTarget.value });

    handleShowMenu = () => {
        const { showMenu } = this.state;
        this.setState({ showMenu: !showMenu });
        document.querySelector(`html`).classList.toggle(`no-scroll`);
    };

    handleMoveCarousel = direction => {
        let { activeProduct } = this.state;
        if (direction === `right`) {
            if (activeProduct === 2) {
                document.querySelectorAll(`.product`).forEach(item => item.classList.remove(`disable-transition`));
                this.setState({ activeProduct: 0 }, () =>
                    document.querySelector(`.product-right`).classList.add(`disable-transition`)
                );
            } else
                this.setState({ activeProduct: ++activeProduct }, () =>
                    document.querySelector(`.product-right`).classList.add(`disable-transition`)
                );
        } else {
            if (activeProduct === 0) {
                document.querySelectorAll(`.product`).forEach(item => item.classList.remove(`disable-transition`));
                this.setState({ activeProduct: 2 }, () =>
                    document.querySelector(`.product-left`).classList.add(`disable-transition`)
                );
            } else
                this.setState({ activeProduct: --activeProduct }, () =>
                    document.querySelector(`.product-left`).classList.add(`disable-transition`)
                );
        }
    };

    render() {
        const { showMenu, activeNav, name, email, message, activeProduct, mounted } = this.state;
        return (
            <Fragment>
                {mounted && (
                    <Menu
                        aboutPosition={this.aboutNode ? this.aboutNode.offsetTop : 0}
                        activeNav={activeNav}
                        contactPosition={this.contactNode ? this.contactNode.offsetTop : 0}
                        handleCloseMenu={this.handleShowMenu}
                        productsPosition={this.productsNode ? this.productsNode.offsetTop : 0}
                        show={showMenu}
                        topPosition={this.last_known_scroll_position}
                    />
                )}

                <div>
                    {mounted && (
                        <Overlay
                            aboutPosition={this.aboutNode ? this.aboutNode.offsetTop : 0}
                            activeNav={activeNav}
                            contactPosition={this.contactNode ? this.contactNode.offsetTop : 0}
                            handleShowMenu={this.handleShowMenu}
                            productsPosition={this.productsNode ? this.productsNode.offsetTop : 0}
                            show={showMenu}
                        />
                    )}

                    <section className="landing section">
                        <div className="landing-logo-bar">
                            <div className="landing-titles">
                                <h1 className="upper">bull</h1>
                                <h2 className="upper">pure furniture</h2>
                            </div>
                            <img alt="" className="landing-logo" src={logo} />
                            <h2 className="upper landing-subtitle">exclusief</h2>
                        </div>
                    </section>

                    <section className="products section" ref={node => (this.productsNode = node)}>
                        <div className="products-carousel">
                            <div
                                className="pointer products-carousel-button products-carousel-button-left"
                                onClick={() => this.handleMoveCarousel(`left`)}>
                                <i className="fas fa-angle-left" />
                            </div>
                            <div
                                className={`product ${
                                    activeProduct === 0
                                        ? `product product-active`
                                        : activeProduct === 1
                                            ? `product-left`
                                            : `product-right`
                                }`}
                                data-product-id={0}>
                                <div className="render-node" ref={node => (this.tableRenderNode = node)} />
                                <div
                                    className={`product-info ${
                                        activeProduct === 0 ? `` : activeProduct !== 0 && ` product-info-hide`
                                    }`}>
                                    <p className="upper product-title">alpm</p>
                                    <p className="product-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima cupiditate odit,
                                        molestias a placeat voluptates ut architecto officia earum sed sunt quibusdam maiores.
                                    </p>
                                    <Link to="/configurator">
                                        <div className="upper product-button pointer">configureer</div>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className={`product ${
                                    activeProduct === 1
                                        ? `product product-active`
                                        : activeProduct === 2
                                            ? `product-left`
                                            : `product-right`
                                }`}
                                data-product-id={1}>
                                <div className="render-node" ref={node => (this.tableRenderNode2 = node)} />
                                <div
                                    className={`product-info ${
                                        activeProduct === 1 ? `` : activeProduct !== 1 && ` product-info-hide`
                                    }`}>
                                    <p className="upper product-title">cupidatat</p>
                                    <p className="product-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima cupiditate odit,
                                        molestias a placeat voluptates ut architecto officia earum sed sunt quibusdam maiores.
                                    </p>
                                    <Link to="/configurator">
                                        <div className="upper product-button pointer">configureer</div>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className={`product ${
                                    activeProduct === 2
                                        ? `product product-active`
                                        : activeProduct === 0
                                            ? `product-left`
                                            : `product-right`
                                }`}
                                data-product-id={2}>
                                <div className="render-node" ref={node => (this.tableRenderNode3 = node)} />
                                <div
                                    className={`product-info ${
                                        activeProduct === 2 ? `` : activeProduct !== 2 && ` product-info-hide`
                                    }`}>
                                    <p className="upper product-title">alpm</p>
                                    <p className="product-text">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima cupiditate odit,
                                        molestias a placeat voluptates ut architecto officia earum sed sunt quibusdam maiores.
                                    </p>
                                    <Link to="/configurator">
                                        <div className="upper product-button pointer">configureer</div>
                                    </Link>
                                </div>
                            </div>
                            <div
                                className="pointer products-carousel-button products-carousel-button-right"
                                onClick={() => this.handleMoveCarousel(`right`)}>
                                <i className="fas fa-angle-right" />
                            </div>
                        </div>
                    </section>

                    <section className="about section" ref={node => (this.aboutNode = node)}>
                        <div className="about-content">
                            <p className="about-content-text about-content-text-left">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quasi blanditiis sapiente,
                                necessitatibus ipsa non magnam distinctio quis et maxime earum doloremque est autem similique!
                            </p>
                            <img alt="" className="about-content-img" src={lamp} />
                            <p className="about-content-text about-content-text-right">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, quasi blanditiis sapiente,
                                necessitatibus ipsa non magnam distinctio quis et maxime earum doloremque est autem similique!
                            </p>
                        </div>
                    </section>

                    <section className="contact section" ref={node => (this.contactNode = node)}>
                        <div className="contact-form">
                            <div className="flex-row-holder">
                                <Input
                                    doubleRow
                                    name="name"
                                    onChange={e => this.onChange(e, `name`)}
                                    placeholder="John Doe"
                                    title="naam"
                                    value={name}
                                />
                                <Input
                                    doubleRow
                                    name="email"
                                    onChange={e => this.onChange(e, `email`)}
                                    placeholder="John.doe@email.com"
                                    title="email"
                                    value={email}
                                />
                            </div>
                            <label className="input-title" htmlFor="input-message">
                                bericht
                            </label>
                            <textarea
                                className="contact-form-message"
                                id="input-message"
                                name="message"
                                onChange={e => this.onChange(e, 'message')}
                                placeholder="Bericht"
                                value={message}
                            />
                        </div>
                        <div className="contact-form-button pointer upper">Verstuur</div>
                    </section>
                </div>
            </Fragment>
        );
    }
}

Home.propTypes = {
    location: objectOf(any).isRequired
};

export default withRouter(Home);
