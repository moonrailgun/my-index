import { BaseModel } from './base';

export interface IPage extends BaseModel {
  domain: string;
  path: string;
  document: string;
}
