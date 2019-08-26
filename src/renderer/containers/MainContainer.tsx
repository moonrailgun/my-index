import React from 'react';
import SplitPane from 'react-split-pane';
import { Input, Select, notification } from 'antd';
import { ipcRenderer } from 'electron';
import { checkUrl } from '../../shared/string-helper';
import WebView from '../components/WebView';
const Option = Select.Option;

import './MainContainer.css';

class MainContainer extends React.Component {
  state = {
    url: '',
    webviewSrc: '',
  };

  handleEnterUrl = () => {
    const url = this.state.url;
    console.log('url:', url);
    if (checkUrl(url)) {
      this.setState({ webviewSrc: url });
    } else {
      notification.warning({
        message: '请输入一个合法的Url',
        placement: 'bottomLeft',
      });
    }
  };

  handleFetchUrl = (url: string) => {
    console.log('fetch', url);
    ipcRenderer.send('fetch-url', url);
  };

  render() {
    const { url, webviewSrc } = this.state;

    return (
      <div>
        <Input
          value={url}
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
