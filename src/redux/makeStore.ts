import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './modules'

export default initialState => {
  return createStore(
    reducer,
    initialState,
    applyMiddleware(thunkMiddleware, logger)
  )
}
