import {combineReducers} from 'redux';
import {appReducer} from './appReducer';
import { configReducer } from './configReducer';
export const rootReducer = combineReducers({
  app: appReducer,
  config: configReducer
})
