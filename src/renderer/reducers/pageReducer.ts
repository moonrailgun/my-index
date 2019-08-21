import { Reducer } from 'redux';
import { UPDATE_PAGE, PageAction } from '../actions/pageActions';
import { IPage } from '../../shared/model-type/page';

export interface PagesState {
  readonly pages: IPage[];
}

const defaultState: PagesState = {
  pages: [],
};

export const pageReducer: Reducer<PagesState, PageAction> = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_PAGE:
      return {
        ...state,
        pages: action.payload,
      };
    default:
      return state;
  }
};
