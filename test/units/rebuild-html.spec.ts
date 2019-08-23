import { html2js, rebuildHtml } from '../../src/main/utils/rebuild-html';

// baidu html
const testHtml = `<html>
<head>

	<script>
		location.replace(location.href.replace("https://","http://"));
  </script>
</head>
<body>
	<noscript><meta http-equiv="refresh" content="0;url=http://www.baidu.com/"></noscript>
</body>
</html>`;

const targetStr =
  // tslint:disable-next-line: max-line-length
  '{"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"head","elements":[{"type":"element","name":"script"}]},{"type":"element","name":"body","elements":[{"type":"element","name":"noscript","elements":[{"type":"element","name":"meta","attributes":{"http-equiv":"refresh","content":"0;url=http://www.baidu.com/"}}]}]}]}]}';

describe('rebuild-html', () => {
  it('should be transform html to js', async () => {
    const obj = await html2js(testHtml);
    expect(typeof obj).toBe('object');
    expect(obj).toHaveProperty('elements');
    expect(JSON.stringify(obj)).toBe(targetStr);
  });

  it('should be parse non-strict xml', async () => {
    const html = '<html><head><meta http-equiv="Cache-Control" content="no-siteapp"></head></html>';
    const json =
      // tslint:disable-next-line: max-line-length
      '{"elements":[{"type":"element","name":"html","elements":[{"type":"element","name":"head","elements":[{"type":"element","name":"meta","attributes":{"http-equiv":"Cache-Control","content":"no-siteapp"}}]}]}]}';

    expect(JSON.stringify(html2js(html))).toBe(json);
  });

  it('should be rebuild js script', async () => {
    const sourceHtml = '<html><head><script src="/test.js"></script></head></html>';
    const targetHtml = '<html><head><script src="domain.com/test.js"/></head></html>';

    const dest = rebuildHtml(sourceHtml, { url: 'http://domain.com' });
    expect(dest.html).toBe(targetHtml);
    expect(dest.assets).toEqual(['domain.com/test.js']);
  });
});
