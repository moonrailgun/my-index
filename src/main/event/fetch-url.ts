import axios from 'axios';
import { Pages } from '../db/models/pages';
import urlUtils from 'url';

/**
 * 获取目标网页的内容并离线保存
 * @param url 目标网页Url
 */
export const fetchUrl = async (url: string) => {
  const { data } = await axios.get(url);
  const { protocol, host, path } = urlUtils.parse(url);

  await Pages.create({
    domain: `${protocol}//${host}`,
    path,
    document: data,
  });
};
