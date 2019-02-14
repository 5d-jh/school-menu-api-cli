import React, { Component } from 'react';
import { 
  Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { withCookies } from 'react-cookie';
import FetchMenu from './FetchMenu';
import 'bootstrap/dist/css/bootstrap.css';
import './AppEntry.css';

class AppEntry extends Component {
  state = {
    schoolInfoQuery: null,
    schoolInfos: null,
    badgeColor: 'primary',
    dropdownOpen: false,
    submitButtonDisabled: false
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

  updateSchoolInfoQuery = (event) => {
    this.setState({
      schoolInfoQuery: event.target.value
    });
  }

  saveData = (event) => {
    const { schoolInfos } = this.state;

    event.preventDefault();

    let date = new Date();
    date.setDate(date.getDate() + 100);

    const schoolType = schoolInfos[event.target.value].type;
    const schoolCode = schoolInfos[event.target.value].code;

    const { cookies } = this.props;
    cookies.set('schoolType', schoolType, {
      expires: date
    });
    cookies.set('schoolCode', schoolCode, {
      expires: date
    });

    this.setState({schoolInfos: null});
    
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

  fetchSchoolInfos = (event) => {
    event.preventDefault();

    this.setState({
      submitButtonDisabled: true
    }, () => {
      const url = 'https://code.schoolmenukr.ml/api?q='+this.state.schoolInfoQuery;

      fetch(url)
      .then(response => response.json())
      .then(data => data.school_infos)
      .then(schoolInfos => {
        this.setState({ 
          schoolInfos,
          dropdownOpen: schoolInfos.length !== 0,
          submitButtonDisabled: false
        })
      })
      .catch(error => console.error(error));
    });
  }

  render() {  
    const { cookies } = this.props;
    const { dropdownOpen, submitButtonDisabled } = this.state;

    if (cookies.get('schoolType') && cookies.get('schoolCode')) {
      return(
        <FetchMenu schoolType={cookies.get('schoolType')} onUserExit={this.removeCookies} schoolCode={cookies.get('schoolCode')} onDateChange={this.handleDateChange} />
      )
    } else {
      return (
        <div className="_center">
          <Dropdown isOpen={dropdownOpen}>
            <DropdownToggle tag="span">
              <Form onSubmit={this.fetchSchoolInfos}>
                <InputGroup style={{
                  width: '350px'
                }}>
                  <Input placeholder="학교 이름을 검색하세요" onChange={this.updateSchoolInfoQuery} />
                  <InputGroupAddon addonType="append">
                    <Button outline color="primary" disabled={submitButtonDisabled}>
                      {submitButtonDisabled ? "불러오는 중..." : "완료"}
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </Form>
            </DropdownToggle>
            <DropdownMenu style={{
              maxHeight: '200px',
              overflowY: 'scroll'
            }}>
              {
                this.state.schoolInfos
                ? this.state.schoolInfos.map((info, i) => (
                  <DropdownItem onClick={this.saveData} value={i} key={i} tag="button" action>
                    <strong>{info.name}</strong><br /><span>{info.address}</span>
                  </DropdownItem>
                )) : ''
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      )
    }
  }
}

export default withCookies(AppEntry);