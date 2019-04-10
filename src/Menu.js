import React, { Component } from 'react';
import { Nav, NavItem, NavLink, TabPane, TabContent, Button } from 'reactstrap';
import classnames from 'classnames';
import './Menu.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'material-icons/iconfont/material-icons.css';
import { Consumer } from './Context';

/*
  컴포넌트 역할:
  - 컴포넌트 마운트 시 식단 요청하기(현재 날짜로)
  - '어제', '내일' 버튼 클릭 시 contextState.date 변경하기
    * 날짜 변경 시 변경된 날짜로 식단 요청하기
  - 식단 보여주기
*/

class Menu extends Component {
  state = {
    activeTab: '2',
    menu: null
  }
  
  toggleTab = (event) => {
    let tab = event.target.name;
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  fetchMenu = () => {
    const { contextState } = this.props;

    const date = new Date(contextState.date);
    let year = date.getFullYear();
    let dateOfMonth = date.getDate();
    let month = date.getMonth() + 1;
    
    this.setState({
      menu: null
    }, async () => {
      let url = `https://schoolmenukr.ml/api/${contextState.schoolType}/${contextState.schoolCode}`;
      url += `?year=${year}&month=${month}&date=${dateOfMonth}`;

      fetch(url)
      .then(response => {
        this.setState({
          errorOccurred: false
        });
        return response.json()
      })
      .then(response => response.menu)
      .then(menu => this.setState({ menu }))
      .catch((err) => err);
    });
  }

  onClickEvent = (days) => {
    const { contextState, setContextState } = this.props;

    const date = new Date(contextState.date);
    date.setDate(date.getDate() + days);

    setContextState({ date }, this.fetchMenu);
  }

  componentDidMount() {
    this.fetchMenu();
  }

  render() {
    const { menu } = this.state;

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
                menu ? (
                  menu.breakfast ? (
                    menu.breakfast.map((menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>)
                  ) : null
                ) : null
              }
            </div>
          </TabPane>
          <TabPane tabId="2">
            <div className="_menuContent">
              {
                menu ? (
                  menu.lunch ? (
                    menu.lunch.map((menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>)
                  ) : null
                ) : null
              }
            </div>
          </TabPane>
          <TabPane tabId="3">
            <div className="_menuContent">
              {
                menu ? (
                  menu.dinner ? (
                    menu.dinner.map((menu, i) => <span className="_menuBlock" key={i}>{menu.replace(/\d|[.]/g, '')}</span>)
                  ) : null
                ) : null
              }
            </div>
          </TabPane>
        </TabContent>
        <div>
          <Button color="link" onClick={() => this.onClickEvent(-1)} className="_btnWithIcon" disabled={menu ? false : true}>
            <i className="material-icons">navigate_before</i>
            어제
          </Button>
          <Button color="link" onClick={() => this.onClickEvent(1)} className="_btnWithIcon" disabled={menu ? false : true}>
            내일
            <i className="material-icons">navigate_next</i>
          </Button>
          {!menu ? <Button color="link" className="_btnWithIcon" disabled={true}>
            <i className="material-icons">
              refresh
            </i>
            불러오는 중
          </Button> : null}
        </div>
      </div>
    )
  }
}

export default () => (
  <Consumer>
    {
      ({ contextState, setContextState }) => <Menu contextState={contextState} setContextState={setContextState} />
    }
  </Consumer>
)