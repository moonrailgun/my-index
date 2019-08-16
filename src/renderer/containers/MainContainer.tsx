import React from 'react';
import SplitPane from 'react-split-pane';
import { Input } from 'antd';
import './MainContainer.css';

class MainContainer extends React.Component {
  state = {
    url: ''
  };

  render() {
    return (
      <div>
        <Input />
        <SplitPane split="vertical" minSize={200}>
          <div />
          <div>
            <webview />
          </div>
        </SplitPane>
      </div>
    );
  }
}

export default MainContainer;
