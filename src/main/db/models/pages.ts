import { Model, Sequelize, STRING } from 'sequelize';

export class Pages extends Model {
  domain: string;
  path: string;
  document: string;
}

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
    {
      sequelize,
      indexes: [
        {
          unique: true,
          fields: ['domain', 'path'],
        },
      ],
    }
  );
};
