import React, { Component } from 'react';
import 'material-icons/iconfont/material-icons.css';
import './SideContent.css';
import GitHubImage from './GitHub-Mark-32px.png';

let week = ['일', '월', '화', '수', '목', '금', '토'];

class Calendar extends Component {
  render() {
    if (this.props.date) {
      return (
        <div className="_center">
          <p className="yr block">{this.props.date.year}</p>
          <p className="mmdd"><span className="block">{this.props.date.month}월 {this.props.date.date}일</span><span className="block">&nbsp;{week[this.props.date.day]}요일</span> </p>
        </div>
      )
    } else {
      return (
        <div className="_center">
          <h1>오늘의 급식</h1>
          <a href="https://github.com/5d-jh/school-menu-api-demo-app">
            <img src={GitHubImage} alt="repo" /> GitHub Repo
          </a>
        </div>
      )
    }
  }
}

export default Calendar