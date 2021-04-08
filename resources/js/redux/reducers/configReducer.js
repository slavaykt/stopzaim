import {LOAD_CONFIG } from './../actions/ActionTypes';

const initialState = { enumerations: -{} };
export const configReducer = (state = initialState, action) => {

  switch (action.type) {
    case LOAD_CONFIG:
      return { ...state, enumerations: action.payload};
    default: return state
  }
}
