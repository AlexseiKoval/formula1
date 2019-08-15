

import React, { Fragment } from 'react';
import {

} from 'react-native';

import { createStackNavigator, createAppContainer } from "react-navigation";

import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";


import AppStart from "./component/start";
import AppF1List from "./component/f1list";
import AppItems from "./component/listitem";

const f1Items = [];


let rootReducer = combineReducers({
  name: (state = ' MY name ', action) => {
    switch (action.type) {
      case 'newname':
        return action.name
      default:
        return state
    }
  },
  masItems: (state = f1Items, action) => {
    switch (action.type) {
      case 'getNewList':
        return action.masItems
      default:
        return state
    }
  },
  masItemsItem: (state = f1Items, action) => {
    switch (action.type) {
      case 'getMasItemsItem':
        return action.masItems
      default:
        return state
    }
  },
});

let store = createStore(rootReducer);


store.subscribe(() => {
  //alert('ok');
})


 

const AppNavigator = createStackNavigator(
  {
 
    Start :AppStart,
    AppList :AppF1List,
    AppItems :AppItems,
  },

  {
    initialRouteName: "Start"
  }
);

const AppContainer = createAppContainer(AppNavigator);
const App = () => {
  return (
    <Provider store={store}>
      <AppContainer/>
    </Provider>


  );
};

 
export default App;
