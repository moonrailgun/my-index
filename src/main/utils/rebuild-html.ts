import { js2xml, xml2js, ElementCompact, Options } from 'xml-js';

const commonOptions: Options.XML2JS & Options.JS2XML = {
  compact: false,
};

/**
 * html转js对象
 * @param html html文本
 */
export const html2js = (html: string) => {
  const obj = xml2js(html, { ...commonOptions, lowercase: true, strict: false });

  return obj;
};

/**
 * js对象转html文本
 * @param obj 由html2js生成的文本
 */
export const js2html = (obj: Element | ElementCompact) => {
  const html = js2xml(obj, commonOptions);

  return html;
};
