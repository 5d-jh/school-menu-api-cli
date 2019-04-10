import React, { Component } from 'react';
import { 
  Button,
  Dropdown, DropdownItem, DropdownMenu, DropdownToggle,
  Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';
import { withCookies } from 'react-cookie';
import { Consumer } from './Context';
import FetchMenu from './FetchMenu';
import 'bootstrap/dist/css/bootstrap.css';
import './AppEntry.css';

/*
  컴포넌트 역할:
  - 컴포넌트 마운트 시 'schoolCode', 'schoolType' 쿠키 가져오기
    * 쿠키 정보 유무에 따라 contextState.enabled 값 변경하기
  - 학교 이름 입력 받아 학교 정보 요청하기(code.schoolmenukr.ml)
  - 선택된 학교 정보 쿠키로 저장하기
  - 렌더링 다시 하기
*/

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

  saveData = (i) => {
    const { schoolInfos } = this.state;
    

    let date = new Date();
    date.setDate(date.getDate() + 100);

    const schoolType = schoolInfos[i].type;
    const schoolCode = schoolInfos[i].code;

    const { cookies } = this.props;
    cookies.set('schoolType', schoolType, {
      expires: date
    });
    cookies.set('schoolCode', schoolCode, {
      expires: date
    });

    this.setState({schoolInfos: null, dropdownOpen: false}, () => {
      this.fetchCookies();
      this.render();
    });
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

  fetchCookies = () => {
    const { setContextState, cookies } = this.props;

    const schoolCode = cookies.get('schoolCode');
    const schoolType = cookies.get('schoolType');

    setContextState({
      enabled: Boolean(schoolCode) && Boolean(schoolType),
      schoolType,
      schoolCode,
      cookies
    });
  }

  componentDidMount() {
    this.fetchCookies();
  }

  render() {  
    const { contextState } = this.props;
    const { dropdownOpen, submitButtonDisabled } = this.state;

    return (
      contextState.enabled && contextState.schoolType && contextState.schoolCode ? (
        <FetchMenu />
       ) : (
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
                  <DropdownItem
                    onClick={(e) => {
                      e.preventDefault();
                      this.saveData(i);
                    }}
                    key={i} 
                    tag="button" 
                    action
                  >
                    <strong>{info.name}</strong><br /><span>{info.address}</span>
                  </DropdownItem>
                )) : ''
              }
            </DropdownMenu>
          </Dropdown>
        </div>
      )
    )
  }
}

export default withCookies(
  ({ cookies }) => (
    <Consumer>
      {
        ({ setContextState, contextState }) => <AppEntry setContextState={setContextState} contextState={contextState} cookies={cookies} />
      }
    </Consumer>
  )
);