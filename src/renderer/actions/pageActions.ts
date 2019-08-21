import { Action, ActionCreator } from 'redux';
import { IPage } from '../../shared/model-type/page';

export const UPDATE_PAGE = 'UPDATE_PAGE';

export interface UpdatePageAction extends Action {
  type: 'UPDATE_PAGE';
  payload: IPage[];
}

export const updatePage: ActionCreator<UpdatePageAction> = (pages: IPage[]) => ({
  type: UPDATE_PAGE,
  payload: pages,
});

export type PageAction = UpdatePageAction;
