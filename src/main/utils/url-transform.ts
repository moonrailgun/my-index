import urlUtils from 'url';
import pathUtils from 'path';

/**
 * 计算相对路径
 * @param from 起始路径
 * @param to 目标路径
 */
export const calcRelativePath = (from: string, to: string): string => {
  return pathUtils.relative(from, to);
};
