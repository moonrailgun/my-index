import { app } from 'electron';
import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize';
import { regPages } from './models/pages';

const dbpath = path.resolve(app.getAppPath(), '../database.sqlite');
console.log('dbpath:', dbpath);

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: dbpath,
});

regPages(sequelize);

if (!fs.existsSync(dbpath)) {
  sequelize.sync();
}
