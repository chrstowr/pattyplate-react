import React, { Component } from "react";
import { HISTORY } from "../shared/history";
import { MENUDATA } from "../shared/menu";
import { INGREDIENTS } from "../shared/ingredients";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import Home from "./HomeComponent";
import Menu from "./MenuComponent";
import RequestStop from "./RequestStopComponent";
import { connect } from "react-redux";
import { fetchHistory, fetchMenu, fetchIngredient } from "../redux/ActionCreators";


const mapStateToProps = state => {
  return {
    history: state.history,
    menu: state.menu,
    ingredient: state.ingredient
  };
};

const mapDispatchToProps = {
  fetchHistory: () => fetchHistory(),
  fetchMenu: () => fetchMenu(),
  fetchIngredient: () => fetchIngredient()
};

class Main extends Component {
  componentDidMount() {
    this.props.fetchHistory();
    this.props.fetchMenu();
    this.props.fetchIngredient();
  }


  render() {
    const HomePage = () => {
      return (
        <Home
          history={this.props.history.history}
          historyLoading={this.props.history.isLoading}
          historyFailed={this.props.history.errMess}
          menu={this.props.menu.menu}
          menuLoading={this.props.menu.isLoading}
          menuFailed={this.props.menu.errMess}
          ingredient={this.props.ingredient.ingredient}
          ingredientLoading={this.props.ingredient.isLoading}
          ingredientFailed={this.props.ingredient.errMess}
        />
      );
    };

    return (
      <>
        <Header /> 
          <HomePage />
        {/* <Footer /> */}
      </>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
