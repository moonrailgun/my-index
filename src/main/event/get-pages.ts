import { Pages } from '../db/models/pages';

export const getAllPages = async () => {
  const pages: Pages[] = await Pages.findAll();

  return pages.map(v => v.toJSON());
};
