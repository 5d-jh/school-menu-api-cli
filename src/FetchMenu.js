import React, { Component } from 'react';
import MenuCard from './MenuCard';
import MenuError from './MenuError';
import SubDropdownMenu from './SubDropdownMenu';

class FetchMenu extends Component {
  state = {
    menu: null,
    errorOccurred: false,
    errorInfo: ''
  }

  date = new Date();

  fetchMenu = () => {
    let year = this.date.getFullYear();
    let date = this.date.getDate();
    let month = this.date.getMonth() + 1;
    this.props.onDateChange(this.date);

    let url = `https://schoolmenukr.ml/api`;
    
    let init = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        school_type: this.props.schoolType,
        school_code: this.props.schoolCode,
        ymd: {
          year: year,
          month: month,
          date: date
        }
      })
    };
    return fetch(url, init)
    .then(response => {
      this.setState({
        errorOccurred: false
      });
      return response.json()
    })
    .then(response => response.menu)
    .catch((err) => {
      this.setState({
        errorOccurred: true,
        errorInfo: err
      });
    });
  }

  getMenu = async() => {
    let menu = await this.fetchMenu();
    this.setState({
      menu: menu
    });
    
  }

  changeDate = async(days) => {
    await this.setState({
      menu: null
    })
    this.date.setDate(this.date.getDate() + days);
    this.getMenu();
  }

  componentDidCatch(err, info) {
    this.setState({
      errorOccurred: true,
      errorInfo: err
    });
  }

  componentDidMount() {
    this.getMenu();
  }

  render() {
    if (!this.state.errorOccurred) {
      return (
        <div>
          <SubDropdownMenu schoolCode={this.props.schoolCode} onUserExit={this.props.onUserExit} />
          <MenuCard
            menu={this.state.menu}
            onDateChange={this.changeDate}
          />
        </div>
        
      )
    } else {
      return (
        <MenuError tryAgain={this.getMenu} />
      )
    }
  }
}

export default FetchMenu;