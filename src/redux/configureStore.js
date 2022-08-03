import { legacy_createStore as createStore, combineReducers } from 'redux'
import dataReducer from './reducers/dataReducer'

const reducer = combineReducers({
  data: dataReducer,
})

const store = createStore(reducer)

export default store
