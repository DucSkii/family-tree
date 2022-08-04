import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from 'redux'
import logger from 'redux-logger'
import dataReducer from './reducers/dataReducer'

const reducer = combineReducers({
  data: dataReducer,
})

const store = createStore(reducer, applyMiddleware(logger))

export default store
