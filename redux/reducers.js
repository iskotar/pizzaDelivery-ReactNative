import { combineReducers } from 'redux'
import orderList from './reducers/orderList'
import orderTotal from './reducers/orderTotal'

export const rootReducer = combineReducers({ orderList, orderTotal })
