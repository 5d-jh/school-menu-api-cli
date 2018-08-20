import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import 'material-icons/iconfont/material-icons.css';
import './SubDropdownMenu.css';

class SubDropdownMenu extends Component {
  state = {
    dropdownOpen: false
  }

  toggleDropdown = () => {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }

  render() {
    return (
      <Dropdown className="dropdownRight" isOpen={this.state.dropdownOpen} toggle={this.toggleDropdown} tag="a">
        <DropdownToggle color="link" >
          <i className="material-icons">more_vert</i>
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem header>{this.props.schoolCode}</DropdownItem>
          <DropdownItem divider />
          <DropdownItem className="btnWithIcon" target="_blank" href="https://github.com/5d-jh/school-menu-api-demo-app"><img src={process.env.PUBLIC_URL + "GitHub-Mark-32px.png"} alt="GitHub Icon" height="20px" width="20px" />&nbsp;&nbsp;GitHub</DropdownItem>
          <DropdownItem className="btnWithIcon" onClick={this.props.onUserExit}><i className="material-icons">exit_to_app</i>&nbsp;나가기</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

export default SubDropdownMenu;