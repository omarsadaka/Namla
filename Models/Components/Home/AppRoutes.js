import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import {createStackNavigator} from 'react-navigation-stack';

import Home from './Home'
import OrderDetail from './OrderDetail'
import BillDetail from './BillDetail'

import { connect } from 'react-redux' // redux
import { } from './../../Actions' //redux


const AppRoutes = createStackNavigator(
    {
      Home: {
         screen: Home,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      OrderDetail: {
        screen: OrderDetail,
        navigationOptions: ({ navigation }) => ({
           header: null,
        }),
     },
     BillDetail: {
        screen: BillDetail,
        navigationOptions: ({ navigation }) => ({
           header: null,
        }),
     },
       
       
    },
    {
      initialRouteName: 'Home',
    },
  );
  
//redux
 const mapStateToProps = state => {
   return {
       Language: state.LanguageReducer.Language
   }
}
  // redux
  export default connect(mapStateToProps, {  })(AppRoutes)

