import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'material-icons/iconfont/material-icons.css';
import './RightPaneDropdown.css';
import { Consumer } from './Context';

class RightPaneDropdown extends Component {
  state = {
    dropdownOpen: false
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  removeCookies = () => {
    const { cookies, setContextState } = this.props;

    cookies.remove('schoolType');
    cookies.remove('schoolCode');

    setContextState({
      schoolCode: null,
      schoolType: null
    });
  }

  render() {
    const { schoolCode } = this.props;

    return (
      <Consumer>
        {
          () => (
            <Dropdown className="dropdownRight" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} tag="a">
              <DropdownToggle color="link" >
                <i className="material-icons">more_vert</i>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header>{schoolCode}</DropdownItem>
                <DropdownItem divider />
                <DropdownItem className="btnWithIcon" target="_blank" href="https://github.com/5d-jh/school-menu-api-demo-app"><img src={process.env.PUBLIC_URL + "/GitHub-Mark-32px.png"} alt="GitHub Icon" height="20px" width="20px" />&nbsp;&nbsp;GitHub</DropdownItem>
                <DropdownItem className="btnWithIcon" onClick={this.removeCookies}>
                  <i className="material-icons">exit_to_app</i>&nbsp;나가기
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          )
        }
      </Consumer>
    )
  }
}

export default () => (
  <Consumer>
    {
      ({ contextState: { cookies, schoolCode }, setContextState }) => (
        <RightPaneDropdown cookies={cookies} schoolCode={schoolCode} setContextState={setContextState} />
      )
    }
  </Consumer>
)