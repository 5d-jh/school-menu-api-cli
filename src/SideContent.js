import React, { Component } from 'react';
import 'material-icons/iconfont/material-icons.css';
import './SideContent.css';

let week = new Array('일', '월', '화', '수', '목', '금', '토');

class Calendar extends Component {
  render() {
    if (this.props.date) {
      return (
        <div className="_center">
          <p className="yr">{this.props.date.year}</p>
          <p className="mmdd">{this.props.date.month}월 {this.props.date.date}일 {week[this.props.date.day]}</p>
        </div>
      )
    } else {
      
      return (
        <div className="_center">
          <h1>오늘의 급식</h1>
          <a href="https://github.com/5d-jh/school-menu-api-demo-app">
            <img src="/GitHub-Mark-32px.png" alt="repo" /> GitHub Repo
          </a>
        </div>
      )
    }
  }
}

export default Calendar