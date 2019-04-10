import React, { Component } from 'react';
import MenuCard from './MenuCard';
import MenuError from './MenuError';
import SubDropdownMenu from './SubDropdownMenu';
import { Consumer } from './Context';

class FetchMenu extends Component {
  state = {
    errorOccurred: false,
    errorInfo: ''
  }

  componentDidCatch(err, info) {
    this.setState({
      errorOccurred: true,
      errorInfo: err
    });
  }

  componentDidMount() {
    const { setContextState } = this.props;

    setContextState({
      date: new Date()
    });
  }

  render() {
    if (!this.state.errorOccurred) {
      return (
        <div>
          <SubDropdownMenu />
          <MenuCard
            menu={this.state.menu}
          />
        </div>
        
      )
    } else {
      return (
        <MenuError tryAgain={this.getMenu} />
      )
    }
  }
}

export default () => (
  <Consumer>
    {
      ({ contextState: { cookies }, setContextState }) => <FetchMenu cookies={cookies} setContextState={setContextState} />
    }
  </Consumer>
)