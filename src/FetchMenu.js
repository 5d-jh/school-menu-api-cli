import React, { Component } from 'react';
import MenuCard from './MenuCard';


class FetchMenu extends Component {
  state = {
    menu: null,
    error: false
  }

  date = new Date();

  fetchMenu = () => {
    let date = this.date.getDate();
    this.props.onDateChange(this.date);
    let url = `https://schoolmenukr.ml/api/${this.props.region}/${this.props.schoolCode}?date=${date}`;
    return fetch(url)
    .then(response => response.json())
    .then(response => response[0]);
  }

  getMenu = async() => {
    let menu = await this.fetchMenu();
    this.setState({
      menu: menu
    });
  }

  changeDate = (days) => {
    this.date.setDate(this.date.getDate() + days);
    this.getMenu();
  }

  componentDidMount() {
    this.getMenu();
  }

  render() {
    if (!this.state.error) {
      return (
        <MenuCard
          menu={this.state.menu}
          onDateChange={this.changeDate}
        />
      )
    }
  }
}

export default FetchMenu;