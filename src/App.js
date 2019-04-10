import React, { Component } from 'react';
import { CookiesProvider } from 'react-cookie';
import { Container, Row, Col } from 'reactstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Provider } from './Context';
import AppEntry from './AppEntry';
import SideContent from './SideContent';

class App extends Component {
  state = {
    date: new Date(),
    cookies: null,
    enabled: false
  }

  setContextState = (value, callback) => {
    this.setState(value, callback);
  }

  componentDidUpdate(_, prevState) {
    const { state: currentState } = this;

    if (!Boolean(currentState.schoolCode) && !Boolean(currentState.schoolCode) && prevState.enabled) {
      this.setState({
        enabled: !prevState.enabled
      });
    }
    

    return true;
  }

  render() {
    const { state, setContextState } = this;

    return (
      <Provider value={{ contextState: state, setContextState }}>
        <Container fluid={true}>
          <Row>
            <Col sm="4" className="_left">
              <SideContent /> 
            </Col>
            <Col sm="8" className="_right">
              <CookiesProvider>
                <AppEntry />
              </CookiesProvider>
            </Col>
          </Row>
        </Container>
      </Provider>
    )
  }
}

export default App;
