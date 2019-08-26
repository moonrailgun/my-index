import { Model, Sequelize, STRING, TEXT } from 'sequelize';

export class Pages extends Model {
  // 这里有个BUG 如果这里定义了模型字段后会重置数据
  // 有时间找找问题
  // domain: string;
  // path: string;
  // document: string;
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
        type: TEXT,
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
