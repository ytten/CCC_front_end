import EChartsReact from "echarts-for-react";
import React, { useRef, useEffect, useState } from 'react';
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.myRef = React.createRef();
    }
    render() {
      return <EChartsReact ref={this.myRef} />;
    }
  }

export default MyComponent