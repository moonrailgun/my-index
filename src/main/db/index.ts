import fs from 'fs';
import { Sequelize } from 'sequelize';
import { regPages } from './models/pages';
import { getAssetsPath } from '../utils/path-helper';

const dbpath = getAssetsPath('database.sqlite');
console.log('dbpath:', dbpath);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbpath,
});

regPages(sequelize);

if (!fs.existsSync(dbpath)) {
  sequelize.sync();
}

/**
 * 重置数据库
 */
export const resetDB = (force: boolean = false) => {
  sequelize.sync({ force });
};
