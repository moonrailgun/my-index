import axios from 'axios';
import { Pages } from '../db/models/pages';
import urlUtils from 'url';
import { downloadAsset } from '../utils/downloader';
import { rebuildHtml } from '../utils/rebuild-html';

/**
 * 获取目标网页的内容并离线保存
 * @param url 目标网页Url
 */
export const fetchUrl = async (url: string) => {
  const { data } = await axios.get(url);
  const { protocol, host, path = '' } = urlUtils.parse(url);

  const domain = `${protocol}//${host}`;

  const page: Pages = await Pages.findOne({
    where: {
      domain,
      path,
    },
  });

  // 重构网页数据
  const { html, assets } = rebuildHtml(data, { url });

  if (page) {
    // 如果已存在则更新
    page.setDataValue('document' as any, html);
    await page.save();
  } else {
    await Pages.create({
      domain,
      path,
      document: html,
    });
  }

  // 下载文件
  for (const assetUrl of assets) {
    downloadAsset(assetUrl);
  }
};
