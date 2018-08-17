import React, { Component } from 'react';
import { Alert, Button } from 'reactstrap';
import './MenuCard.css';
import 'material-icons/iconfont/material-icons.css';

const MenuError = (props) => {
  return (
    <Alert color="danger" className="_card">
      <h4 className="alert-heading _btnWithIcon"><i className="material-icons">warning</i>&nbsp;오류 발생</h4>
      <p>데이터를 불러오는 데 문제가 생겼습니다. API 서버(https://schoolmenukr.ml)의 오류이거나 인터넷 연결이 끊겼을 수 있습니다.</p>
      <hr />
      <Button onClick={props.tryAgain} color="link" className="_btnWithIcon"><i className="material-icons">refresh</i>다시 시도</Button>
    </Alert>
  )
}

export default MenuError;