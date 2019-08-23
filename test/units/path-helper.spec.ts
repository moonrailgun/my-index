import { transformUrlToLocalPath } from '../../src/main/utils/path-helper';

describe('path-helper', () => {
  it('transformUrlToLocalPath should be ok', () => {
    const testcase = 'http://baidu.com/a/b/c/d.js';
    expect(transformUrlToLocalPath(testcase)).toBe('http/baidu.com/a/b/c/d.js');
  });
});
