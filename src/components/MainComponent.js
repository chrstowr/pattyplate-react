import React, { Component } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { HISTORY } from '../shared/history';
import { MENUDATA } from '../shared/menu';
import { INGREDIENTS } from '../shared/ingredients'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Menu from './MenuComponent';
import RequestStop from './RequestStopComponent';
import BurgerBuilder from './BurgerBuilderComponent';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { fetchHistory } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        history: state.history
    };
};

const mapDispatchToProps = {
    fetchHistory: () => (fetchHistory())
}

class Main extends Component {

    componentDidMount() {
        this.props.fetchHistory();
    }

    render() {
        console.log(this.props);
        const HomePage = () => {
            return (
                <Home
                    history={this.props.history.history}
                    historyLoading={this.props.history.isLoading}
                    historyFailed={this.props.history.errMess}
                />
            );
        };

        return (
            <div>
                <Header />
                <Switch>
                    <Route path='/home' component={HomePage} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main))
