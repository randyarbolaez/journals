import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import NavigationContainer from "./navigation/NavigationContainer";
import journalReducer from "./store/reducers/journal-reducer";
import authReducer from "./store/reducers/auth-reducer";

const rootReducer = combineReducers({
  journal: journalReducer,
  auth: authReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
};

export default App;
