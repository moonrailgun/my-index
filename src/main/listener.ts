import { ipcMain } from 'electron';
import { fetchUrl } from './event/fetch-url';
import { getAllPages } from './event/get-pages';

/**
 * 注册监听器
 */
export const regListener = () => {
  ipcMain.on('fetch-url', (event: any, url: string) => {
    console.log('fetching', url);
    fetchUrl(url);
  });

  ipcMain.on('get-pages', async (event: any) => {
    const pages = await getAllPages();
    event.sender.send('update-page-list', pages);
  });
};
