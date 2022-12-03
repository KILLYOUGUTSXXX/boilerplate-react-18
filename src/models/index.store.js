import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit'
import thunkMiddleware from 'redux-thunk'

const staticEffects = {}
const staticReducers = {}


// configuration of loading models
const handleLogs = stores => next => action => {
  // const { dispatch } = stores

  return next({ ...action })
}


// configure reducers
function createReducer (asyncReducers) {
  return combineReducers({
    ...staticReducers,
    ...asyncReducers
  })
}

// configure the store
const store = configureStore({
  reducer: staticReducers,
  enhancers: [applyMiddleware(thunkMiddleware, handleLogs)],
  middleware: getDefaultMiddleware => {
    return getDefaultMiddleware({ serializableCheck: false })
  }
})

// function to configure the stores
export function configurationOfStores () {
  store.asyncReducers = {}

  store.addModels = (asyncReducer) => {
    store.asyncReducers[asyncReducer.name] = asyncReducer.reducer
    if(typeof asyncReducer.effects === 'object' && asyncReducer.effects) {
      staticEffects[asyncReducer.name] = asyncReducer.effects
    } else {
      staticEffects[asyncReducer.name] = {}
    }
    store.replaceReducer(createReducer(store.asyncReducers))
  }

  return store
}

// built a function to fetch specific current state of models.
function onGetState (name) {
  if(!store.getState()[name]) return null

  return store.getState()[name]
}

// configuring the effects
export function createEffects (dispatch) {
  return async ({ type, payload = {} }) => {
    const left = type.split('/')[0]
    const right = type.split('/')[1]
    dispatch({ type: 'loading/updateState', payload: { [type]: true } })
    const res = await staticEffects[left][right](payload, { dispatch, getState: onGetState })
    dispatch({ type: 'loading/updateState', payload: { [type]: false } })
    return res
  }
}



