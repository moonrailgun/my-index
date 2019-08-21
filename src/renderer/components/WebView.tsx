import React from 'react';
import { WebviewTag } from 'electron';
import { Spring } from 'react-spring/renderprops';
import { Button } from 'antd';

interface Props {
  src: string;
  onLoad?: () => void;
  onRequestSave?: (url: string) => void;
}
class Webview extends React.Component<Props> {
  state = {
    canFetch: false,
  };
  ref?: WebviewTag;

  componentDidMount() {
    if (this.ref) {
      this.ref.addEventListener('did-start-loading', () => {
        console.log('start load');
        this.setState({ canFetch: false });
      });
      this.ref.addEventListener('did-stop-loading', () => {
        console.log('end load');
        this.setState({ canFetch: true });
        this.props.onLoad && this.props.onLoad();
      });
    }
  }

  handleSave = () => {
    if (this.ref && this.props.onRequestSave) {
      this.props.onRequestSave(this.ref.getURL());
    }
  };

  render() {
    const { src } = this.props;
    const { canFetch } = this.state;

    const style = { height: '100%', width: '100%' };

    return (
      <div style={style}>
        <Spring config={{ duration: 200 }} to={{ top: canFetch ? 20 : -40 }}>
          {({ top }) => (
            <Button
              style={{
                position: 'absolute',
                right: 20,
                top,
              }}
              onClick={this.handleSave}
            >
              保存到本地
            </Button>
          )}
        </Spring>
        <webview ref={(ref: any) => (this.ref = ref)} style={style} src={src} />
      </div>
    );
  }
}

export default Webview;
