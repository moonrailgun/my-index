import React from 'react';
import SplitPane from 'react-split-pane';
import { Input, Select } from 'antd';
import './MainContainer.css';

const Option = Select.Option;

class MainContainer extends React.Component {
  state = {
    protocol: 'http://',
    url: ''
  };

  SelectBefore = (
    <Select
      value={this.state.protocol}
      onSelect={(val: string) => this.setState({ protocol: val })}
      style={{ width: 90 }}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  onEnterUrl = () => {
    console.log('url:', this.state.protocol + this.state.url);
  };

  render() {
    const { url } = this.state;

    return (
      <div>
        <Input
          value={url}
          addonBefore={this.SelectBefore}
          onChange={e => this.setState({ url: e.target.value })}
          onPressEnter={this.onEnterUrl}
        />
        <SplitPane split="vertical" minSize={200} style={{ height: 'calc(100% - 32px)' }}>
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
