import urlUtils from 'url';
import pathUtils from 'path';

/**
 * 将一个网络地址转为本地地址
 * @param fullUrl 完整路径
 */
export const transformScriptUrl = (fullUrl: string): string => {
  const { host = '', pathname = '' } = urlUtils.parse(fullUrl);
  return host + pathname;
};

/**
 * 计算相对路径
 * @param from 起始路径
 * @param to 目标路径
 */
export const calcRelativePath = (from: string, to: string): string => {
  return pathUtils.relative(from, to);
};
