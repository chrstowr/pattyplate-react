import React, { Component } from 'react';
import { Switch, Route, Redirect} from 'react-router-dom';
import {MENUDATA} from '../shared/menu';
import { INGREDIENTS } from '../shared/ingredients'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import RequestStop from './RequestStopComponent';
import BurgerBuilder from './BurgerBuilderComponent';


class Main extends Component {

    constructor(props){
        super(props)
        this.state = {};
    }

    render() {

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={Home}/>
                    <Route path='/menu' render={() => <Menu ingredients={INGREDIENTS} menu={MENUDATA} />} />
                    <Route path='/requeststop' component={RequestStop} />
                    <Route path='/burgerbuilder' render={() => <BurgerBuilder ingredients={INGREDIENTS} />} />
                    <Redirect to='/home' />
                </Switch>
                <Footer />
            </div>
        );
    };
}

export default Main;
