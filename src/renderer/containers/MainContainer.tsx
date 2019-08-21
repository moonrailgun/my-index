import React from 'react';
import SplitPane from 'react-split-pane';
import { Input, Select, notification } from 'antd';
import { checkUrl } from '../../shared/string-helper';
import WebView from '../components/WebView';
const Option = Select.Option;

import './MainContainer.css';

class MainContainer extends React.Component {
  state = {
    protocol: 'http://',
    url: '',
    webviewSrc: ''
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

  handleEnterUrl = () => {
    const url = this.state.protocol + this.state.url;
    console.log('url:', url);
    if (checkUrl(url)) {
      this.setState({ webviewSrc: url });
    } else {
      notification.warning({
        message: '请输入一个合法的Url',
        placement: 'bottomLeft'
      });
    }
  };

  handleFetchUrl = (url: string) => {
    console.log('fetch', url);
  };

  render() {
    const { url, webviewSrc } = this.state;

    return (
      <div>
        <Input
          value={url}
          addonBefore={this.SelectBefore}
          onChange={e => this.setState({ url: e.target.value })}
          onPressEnter={this.handleEnterUrl}
        />
        <SplitPane split="vertical" minSize={200} style={{ height: 'calc(100% - 32px)' }}>
          <div />
          <WebView
            src={webviewSrc}
            onLoad={() => console.log('onLoad')}
            onRequestSave={this.handleFetchUrl}
          />
        </SplitPane>
      </div>
    );
  }
}

export default MainContainer;
