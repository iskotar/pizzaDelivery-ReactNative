import { combineReducers } from 'redux'
import orderList from './reducers/orderList'
import orderTotal from './reducers/orderTotal'
import locations from './reducers/locations'

export const rootReducer = combineReducers({ orderList, orderTotal, locations })
