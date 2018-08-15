import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabPane, TabContent, Button } from 'reactstrap';
import classnames from 'classnames';
import axios from 'axios';
import './MenuCard.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';

class FetchMenu extends Component {
  state = {
    menu: null,
    activeTab: '2'
  }

  date = new Date();

  fetchMenu = () => {
    let date = this.date.getDate()
    this.props.onDateChange(this.date)
    let url = `https://schoolmenukr.ml/api/${this.props.region}/${this.props.schoolCode}?date=${date}`;
    return axios.get(url)
    .then(response => {
      return response.data[0];
    });
  }

   renderMenu = async() => {
    let menu = await this.fetchMenu();
    this.setState({
      menu: menu
    });
  }

  updateToNextMenu = () => {
    this.date.setDate(this.date.getDate() + 1);
    this.renderMenu();
  }
  updateToPrevMenu = () => {
    this.date.setDate(this.date.getDate() - 1);
    this.renderMenu();
  }
  
  componentDidMount() {
    this.renderMenu();
  }

  toggleTab = (event) => {
    let tab = event.target.name;
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    return (
      <div className="_card">
        <Nav pills fill>
          <NavItem>
            <NavLink 
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={this.toggleTab}
              name="1"
            >
              아침
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={this.toggleTab}
              name="2"
            >
              점심
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '3' })}
              onClick={this.toggleTab}
              name="3"
            >
              저녁
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <div className="_menuContent">
              {
                this.state.menu ? (new Array(this.state.menu.breakfast))[0].map(
                  (menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>
                ) : '불러오는 중..'
              }
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="_menuContent">
              {
                this.state.menu ? (new Array(this.state.menu.lunch))[0].map(
                  (menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>
                ) : '불러오는 중..'
              }
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="_menuContent">
              {
                this.state.menu ? (new Array(this.state.menu.dinner))[0].map(
                  (menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>
                ) : '불러오는 중..'
              }
            </div>
          </TabPane>
        </TabContent>
        <div>
          <Button color="link" onClick={this.updateToPrevMenu} className="_btnWithIcon">
              <i className="material-icons">
                navigate_before
              </i>
              어제
          </Button>
          <Button color="link" onClick={this.updateToNextMenu} className="_btnWithIcon">
            <span>
              내일
            </span>
            <i className="material-icons">
              navigate_next
            </i>
          </Button>
        </div>
        
      </div>
    )
  }
}

export default FetchMenu;