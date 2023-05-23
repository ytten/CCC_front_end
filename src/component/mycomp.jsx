import EChartsReact from "echarts-for-react";
import React, { useRef, useEffect, useState } from 'react';
class MyComponent extends React.Component {
    constructor(props, option=option, style = style) {
        super(props);
        this.option = option;
        this.style = style;
        this.myRef = React.createRef();
    }
    render() {
        return <EChartsReact ref={this.myRef} style={this.style} option={this.option} />;
    }
  }

export default MyComponent