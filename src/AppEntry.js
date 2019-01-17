import React, { Component } from 'react';
import { ListGroupItem, ListGroup, Form, Input, Badge } from 'reactstrap';
import { withCookies } from 'react-cookie';
import FetchMenu from './FetchMenu';
import 'bootstrap/dist/css/bootstrap.css';
import './AppEntry.css';

class AppEntry extends Component {
  state = {
    schoolInfoQuery: null,
    schoolInfos: null,
    badgeColor: 'primary'
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
    event.preventDefault();

    let date = new Date();
    date.setDate(date.getDate() + 100);

    let schoolType = null;
    const schoolName = this.state.schoolInfoQuery;
    const matchKeywords = {
      '고': 'high',
      '중': 'middle',
      '초': 'elementary'
    };
    for (let i = schoolName.length-1; i >= 0; i--) {
      for (const keyword in matchKeywords) {
        if (schoolName[i].match(keyword)) {
          schoolType = matchKeywords[keyword];
        }
      }
    }
    if (!schoolType) {
      return this.setState({
        badgeColor: 'warning'
      });
    }

    const { cookies } = this.props;
    cookies.set('schoolType', schoolType, {
      expires: date
    });
    cookies.set('schoolCode', event.target.value, {
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

    const url = 'https://code.schoolmenukr.ml/api?q='+this.state.schoolInfoQuery;
    fetch(url)
    .then(response => response.json())
    .then(data => data.school_infos)
    .then(schoolInfos => { this.setState({schoolInfos}) })
    .catch(error => console.error(error));
  }

  render() {
    const { cookies } = this.props;
    if (cookies.get('schoolType') && cookies.get('schoolCode')) {
      return(
        <FetchMenu schoolType={cookies.get('schoolType')} onUserExit={this.removeCookies} schoolCode={cookies.get('schoolCode')} onDateChange={this.handleDateChange} />
      )
    } else {
      return (
        <div className="_center">
          <Badge color={this.state.badgeColor}>주의사항: 검색어에 '초', '중', '고'가 포함되어야 합니다</Badge>
          <Form onSubmit={this.fetchSchoolInfos}>
            <Input placeholder="학교 이름을 검색하세요" onChange={this.updateSchoolInfoQuery} />
          </Form>
          <ListGroup className="_schoolInfoList">
            {
              this.state.schoolInfos
              ? this.state.schoolInfos.map((info, i) => <ListGroupItem onClick={this.saveData} value={info.code} key={i} tag="button" action>{info.address}</ListGroupItem>)
              : ''
            }
          </ListGroup>
        </div>
      )
    }
  }
}

export default withCookies(AppEntry);