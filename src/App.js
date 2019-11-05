import React, { Component } from "react";

import { Routes } from "./routes";
import Header from "./header/header";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <Routes />
      </React.Fragment>
    );
  }
}

export default App;
