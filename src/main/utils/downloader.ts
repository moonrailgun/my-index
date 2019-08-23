import urlUtils from 'url';
import pathUtils from 'path';
import { getAssetsPath, transformUrlToLocalPath } from './path-helper';
import axios from 'axios';
import fs from 'fs-extra';

/**
 * 下载文件到指定目录
 * @param url 下载地址, 需要是一个完整的url地址
 */
export const downloadAsset = async (url: string) => {
  const relativePath = transformUrlToLocalPath(url);
  const downloadPath = getAssetsPath(`assets/${relativePath}`);
  await fs.ensureDir(pathUtils.dirname(downloadPath));

  console.log(`下载资源${url}到${downloadPath}`);

  const { data } = await axios.get(url);
  await fs.writeFile(downloadPath, data);
  console.log('下载完毕');
};
