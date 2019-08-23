import { app } from 'electron';
import pathUtils from 'path';
import urlUtils from 'url';

/**
 * 获取资源文件地址
 * @param relativePath 相对路径
 */
export const getAssetsPath = (relativePath: string) => {
  return pathUtils.resolve(app.getAppPath(), '../', relativePath);
};

/**
 * 处理网址path部分没有以.html之类的后缀结尾的话
 * 视为RESTful网址，添加默认后缀/index.html
 * @param path 路径
 */
export const padDefaultFilePath = (path: string) => {
  if (path.includes('.')) {
    return path;
  }

  let ret = path;
  if (!ret.endsWith('/')) {
    ret += '/';
  }

  ret += 'index.html';
  return ret;
};

/**
 * 将完整的网络路径转化为本地相对路径
 * @param fullUrl 完整网络路径
 */
export const transformUrlToLocalPath = (fullUrl: string) => {
  const { protocol = 'http:', host, pathname = '' } = urlUtils.parse(fullUrl);

  return `${protocol.replace(':', '')}/${host}${padDefaultFilePath(pathname)}`;
};
