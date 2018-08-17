import React, { Component } from 'react';
import MenuCard from './MenuCard';
import MenuError from './MenuError';

class FetchMenu extends Component {
  state = {
    menu: null,
    error: {
      occurred: false,
      info: ''
    }
  }

  date = new Date();

  fetchMenu = () => {
    let date = this.date.getDate();
    this.props.onDateChange(this.date);
    let url = `https://schoolmenukr.ml/api/${this.props.region}/${this.props.schoolCode}?date=${date}`;
    return fetch(url)
    .then(response => response.json())
    .then(response => response[0])
    .catch((err) => {
      console.log(err)
      this.setState({
        error: {
          occurred: true
        }
      });
    });
  }

  getMenu = async() => {
    let menu = await this.fetchMenu();
    this.setState({
      menu: menu,
      error: {
        occurred: menu ? false : true
      }
    });
    
  }

  changeDate = async(days) => {
    await this.setState({
      menu: null
    })
    this.date.setDate(this.date.getDate() + days);
    this.getMenu();
  }

  componentDidMount() {
    this.getMenu();
  }

  render() {
    if (!this.state.error.occurred) {
      return (
        <MenuCard
          menu={this.state.menu}
          onDateChange={this.changeDate}
        />
      )
    } else {
      return (
        <MenuError tryAgain={this.getMenu} />
      )
    }
  }
}

export default FetchMenu;