import React, { Component } from 'react';
import 'material-icons/iconfont/material-icons.css';
import './LeftPane.css';
import { Consumer } from './Context';

/*
  컴포넌트 역할:
  - 컴포넌트 마운트 시 contextState.enabled, contextState.date 값이 있는 경우 날짜 보여주기
    * 조건을 만족하지 못할 경우 타이틀 보여주기
*/

let week = ['일', '월', '화', '수', '목', '금', '토'];

class LeftPane extends Component {
  render() {
    return (
      <Consumer>
        {
          ({ contextState }) => {
            return contextState.enabled && contextState.date ? (
              <div className="_center">
                <p className="yr block">{contextState.date.getFullYear()}</p>
                <p className="mmdd"><span className="block">{contextState.date.getMonth()+1}월 {contextState.date.getDate()}일</span><span className="block">&nbsp;{week[contextState.date.getDay()]}요일</span> </p>
              </div>
            ) : (
              <div className="_center mainTitle">
                <p>
                  <img src={process.env.PUBLIC_URL + "/icons8-meal-100.png"} alt="Main App Icon" width="50px" />
                </p>
                <h2><span className="btnWithIcon">오늘의 급식</span></h2>
                <hr />
                <a href="https://github.com/5d-jh/school-menu-api-demo-app">
                  <img src={process.env.PUBLIC_URL + "/GitHub-Mark-32px.png"} alt="GitHub Icon" /> GitHub Repo
                </a>
              </div>
            )
          }
        }
      </Consumer>
    )
  }
}

export default LeftPane;