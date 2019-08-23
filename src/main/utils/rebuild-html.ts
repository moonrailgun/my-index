import { js2xml, xml2js, Element, Options } from 'xml-js';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _cloneDeep from 'lodash/cloneDeep';
import urlUtils from 'url';
import { transformUrlToLocalPath } from './path-helper';

interface PageContext {
  url: string;
  assets?: string[];
}

const commonOptions: Options.XML2JS & Options.JS2XML = {
  compact: false,
};

/**
 * html转js对象
 * @param html html文本
 */
export const html2js = (html: string): Element => {
  const obj = xml2js(html, { ...commonOptions, lowercase: true, strict: false });

  return obj as Element;
};

/**
 * js对象转html文本
 * @param obj 由html2js生成的文本
 */
export const js2html = (obj: Element): string => {
  const html = js2xml(obj, commonOptions);

  return html;
};

export const rebuildHtml = (htmlStr: string, pageContext: Readonly<PageContext>) => {
  const obj = html2js(htmlStr);
  const context = _cloneDeep(pageContext);
  travelNode(obj, context);

  return {
    html: js2html(obj),
    assets: context.assets || [],
  };
};

/**
 * 遍历ast， 并对其中特定类型的节点进行处理
 * @param node 节点元素
 */
export const travelNode = (node: Element, context: PageContext) => {
  if (!context.assets) {
    context.assets = [];
  }

  const type = node.type;
  const name = node.name;
  if (type === 'element' && name === 'script') {
    // 处理script标签
    let scriptSrc: string = _get(node, 'attributes.src');
    if (!scriptSrc) {
      // 不处理没有src的标签
      return;
    }

    if (scriptSrc.startsWith('//')) {
      scriptSrc = `http:${scriptSrc}`;
    }

    // 将地址标准化为绝对路径
    const { host, pathname } = urlUtils.parse(scriptSrc); // 使用pathname不包括querystring
    if (host === null) {
      // 是一个内部地址
      if (pathname) {
        // path是一个绝对路径
        scriptSrc = urlUtils.resolve(context.url, pathname);
      }
    }

    const scriptLocalPath = transformUrlToLocalPath(scriptSrc);
    // TODO: 需要处理相对当前网页的路径，或者file协议

    _set(node, 'attributes.src', scriptLocalPath);
    context.assets.push(scriptSrc);
  }

  const children = node.elements || [];
  children.forEach(child => travelNode(child, context));
};
