import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar,SafeAreaView , Dimensions } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
const { width, height } = Dimensions.get('window')

//import { AsyncStorage } from 'react-native';

export default class SplashScreen extends Component {
   constructor(props) {
      super(props);
      this.state = {
      };
   }

   componentDidMount() {
      setTimeout(() => {
         this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
               NavigationActions.navigate({ routeName: 'ChooseLanguage' })
            ],
         }))
      }, 3000)
   }

   render() {
      return (
         <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Image source={require('./../../image/logo.png')} style={[styles.image, {}]} resizeMode='cover' />
         </SafeAreaView>
      );
   }
}

const styles = StyleSheet.create({
   container: {
      width: width,
      height: height,
      alignItems: 'center',
      justifyContent:'center',
      backgroundColor: '#FFF',
   },
   image: {
      width: width*0.8,
      height: 400,
   },
});