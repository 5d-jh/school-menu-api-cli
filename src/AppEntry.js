import React, { Component } from 'react';
import { Badge, InputGroup, InputGroupButtonDropdown, Button, Form, Input, DropdownMenu, DropdownItem, DropdownToggle } from 'reactstrap';
import { withCookies, Cookies } from 'react-cookie';
import MenuCard from './MenuCard';
import 'bootstrap/dist/css/bootstrap.css';
import './AppEntry.css';

let regions = [
  {
    name: '서울',
    value: 'sen'
  }, {
    name: '인천',
    value: 'ice'
  }, {
    name: '부산',
    value: 'pen'
  }, {
    name: '광주',
    value: 'gen'
  }, {
    name: '대전',
    value: 'dje'
  }, {
    name: '대구',
    value: 'dge'
  }, {
    name: '세종',
    value: 'sje'
  }, {
    name: '울산',
    value: 'use'
  }, {
    name: '경기',
    value: 'goe'
  }, {
    name: '강원',
    value: 'kwe'
  }, {
    name: '충북',
    value: 'cbe'
  }, {
    name: '충남',
    value: 'cne'
  }, {
    name: '경북',
    value: 'gbe'
  }, {
    name: '경남',
    value: 'gne'
  }, {
    name: '전북',
    value: 'jbe'
  }, {
    name: '전남',
    value: 'jne'
  }, {
    name: '제주',
    value: 'jje'
  },
];

class AppEntry extends Component {
  constructor(props) {
    super(props);
 
    // const { cookies } = props;
  }
  state = {
    dropdownOpen: false,
    region: null,
    school_code: null,
    regionName: '지역을 선택하세요'
  };

  toggle = () => {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  selectRegion = (event) => {
    this.setState({
      region: event.target.value,
      regionName: event.target.name
    });
  }

  updateSchoolCode = (event) => {
    this.setState({
      school_code: event.target.value
    });
  }

  saveData = (e) => {
    e.preventDefault();

    const { cookies } = this.props;
    cookies.set('region', this.state.region);
    cookies.set('school_code', this.state.school_code);
    
    this.render();
  }

  handleDateChange = (date) => {
    this.props.onDateChange(date);
  }

  render() {
    const { cookies } = this.props;
    if (cookies.get('region') && cookies.get('school_code')) {
      return(
        <MenuCard region={cookies.get('region')} schoolCode={cookies.get('school_code')} onDateChange={this.handleDateChange} />
      )
    } else {
      return(
        <div className="_center">
          <section>
            <h6><Badge>STEP 01</Badge> 학교 코드를 찾으세요</h6>
            <iframe src="https://www.meatwatch.go.kr/biz/bm/sel/schoolListPopup.do" width="100%"></iframe>
          </section>
          <section>
            <h6><Badge>STEP 02</Badge> 필요한 정보를 입력하세요</h6>
            <Form onSubmit={this.saveData}>
              <InputGroup>
                <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                  <DropdownToggle caret outline>
                    {this.state.regionName}
                  </DropdownToggle>
                  <DropdownMenu>
                    {
                      regions.map(region => <DropdownItem value={region.value} name={region.name} onClick={this.selectRegion}>{region.name}</DropdownItem>)
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