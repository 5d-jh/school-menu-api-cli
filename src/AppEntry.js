import React, { Component } from 'react';
import { Badge, InputGroup, InputGroupButtonDropdown, Button, Form, Input, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { withCookies } from 'react-cookie';
import FetchMenu from './FetchMenu';
import 'bootstrap/dist/css/bootstrap.css';
import './AppEntry.css';

let schoolTypes = [{name: '유치원', value: 'kindergarten'},
                   {name: '초등학교', value: 'elementary'},
                   {name: '중학교', value: 'middle'},
                   {name: '고등학교', value: 'high'}];

class AppEntry extends Component {
  state = {
    dropdownOpen: false,
    schoolCode: null,
    schoolType: null,
    schoolTypeName: '학교 유형'
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  selectSchoolType = (event) => {
    this.setState({
      schoolType: event.target.value,
      schoolTypeName: event.target.name
    });
  }

  updateSchoolCode = (event) => {
    this.setState({
      schoolCode: event.target.value
    });
  }

  saveData = (e) => {
    e.preventDefault();

    let date = new Date();
    date.setDate(date.getDate() + 100);

    const { cookies } = this.props;
    cookies.set('schoolType', this.state.schoolType, {
      expires: date
    });
    cookies.set('schoolCode', this.state.schoolCode, {
      expires: date
    });
    
    this.render();
  }

  removeCookies = () => {
    const { cookies } = this.props;
    cookies.remove('schoolType');
    cookies.remove('schoolCode');
  }

  handleDateChange = (date) => {
    this.props.onDateChange(date);
  }

  render() {
    const { cookies } = this.props;
    if (cookies.get('schoolType') && cookies.get('schoolCode')) {
      return(
        <FetchMenu schoolType={cookies.get('schoolType')} onUserExit={this.removeCookies} schoolCode={cookies.get('schoolCode')} onDateChange={this.handleDateChange} />
      )
    } else {
      return(
        <div className="_center">
          <section>
            <h6><Badge>STEP 01</Badge> 학교 코드를 찾으세요</h6>
            <iframe title="findSchoolCode" src="https://www.meatwatch.go.kr/biz/bm/sel/schoolListPopup.do" width="100%"></iframe>
          </section>
          <section>
            <h6><Badge>STEP 02</Badge> 필요한 정보를 입력하세요</h6>
            <Form onSubmit={this.saveData}>
              <InputGroup>
                <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret outline>
                    {this.state.schoolTypeName}
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      schoolTypes.map(type => <DropdownItem value={type.value} name={type.name} onClick={this.selectSchoolType}>{type.name}</DropdownItem>)
                    }
                  </DropdownMenu>
                </InputGroupButtonDropdown>
                <Input placeholder="코드를 입력하세요" onChange={this.updateSchoolCode} />
              </InputGroup>
              <p>
                <Button type="submit" color="primary" className="_doneBtn">완료</Button>
              </p>
            </Form>
          </section>
        </div>
      )
    }
  }
}

export default withCookies(AppEntry);