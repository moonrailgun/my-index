import { ipcRenderer } from 'electron';
import store from './store';
import { updatePage } from './actions/pageActions';

ipcRenderer.on('update-page-list', (event: any, pages: any) => {
  console.log('update pages:', pages);
  store.dispatch(updatePage(pages));
});
