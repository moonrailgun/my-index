/**
 * 判断该字符串是否是一个url
 * @param str 待检测的字符串
 */
export function checkUrl(str: string): boolean {
  const reg: RegExp = new RegExp('^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&?/.=]+$');
  if (!reg.test(str)) {
    return false;
  }

  return true;
}
