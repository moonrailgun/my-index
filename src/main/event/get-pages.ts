import { Pages } from '../db/models/pages';

export const getPages = async () => {
  const pages: Pages[] = await Pages.findAll();

  return pages.map(v => v.toJSON());
};
