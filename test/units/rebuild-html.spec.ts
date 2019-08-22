import { html2js } from '../../src/main/utils/rebuild-html';

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
});
