import {applyMiddleware , compose, createStore,} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from '../reducer/index';

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

const store = createStore(
    rootReducer,
    compose(applyMiddleware(thunk), typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
    ? a => a
    : window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()),
  )
export default store;
