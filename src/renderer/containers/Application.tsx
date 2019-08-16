import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import MainContainer from './MainContainer';

const Application = () => (
  <div>
    Hello World from Electron!
    <MainContainer />
  </div>
);

export default hot(Application);
