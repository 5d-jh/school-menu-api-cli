import React, { Component } from 'react';
import 'material-icons/iconfont/material-icons.css';
import './SideContent.css';

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
        <div className="_center mainTitle">
          <p>
            <img src={process.env.PUBLIC_URL + "icons8-meal-100.png"} alt="Main App Icon" width="50px" />
          </p>
          <h2><span className="btnWithIcon">오늘의 급식</span></h2>
          <hr />
          <a href="https://github.com/5d-jh/school-menu-api-demo-app">
            <img src={process.env.PUBLIC_URL + "GitHub-Mark-32px.png"} alt="GitHub Icon" /> GitHub Repo
          </a>
        </div>
      )
    }
  }
}

export default Calendar