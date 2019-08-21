import { Model, Sequelize, STRING } from 'sequelize';

export class Pages extends Model {}

export const regPages = (sequelize: Sequelize) => {
  Pages.init(
    {
      domain: {
        type: STRING,
        allowNull: false,
      },
      path: {
        type: STRING,
        allowNull: false,
      },
      document: {
        type: STRING,
      },
    },
    { sequelize }
  );
};
