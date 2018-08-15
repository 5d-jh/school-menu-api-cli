import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import AppEntry from './AppEntry';
import SideContent from './SideContent';

class App extends Component {
  state = {
    date: null
  }

  handleDateChange = (date) => {
    this.setState({
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        date: date.getDate(),
        day: date.getDay()
      }
    })
  }

  render() {
    return (
      <Container fluid={true}>
        <Row>
          <Col sm="4" className="_left">
            <SideContent date={this.state.date} />
          </Col>
          <Col sm="8" className="_right">
            <CookiesProvider>
              <AppEntry onDateChange={this.handleDateChange} />
            </CookiesProvider>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default App;
