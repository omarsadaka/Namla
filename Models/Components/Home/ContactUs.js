import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView , StatusBar, TextInput,Image, ScrollView,ImageBackground,FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get('window')
import { DrawerActions } from 'react-navigation-drawer'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class ContactUs extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         data:[],
         color:'#969696'
      };
   }

    UNSAFE_componentWillMount(){
    }



    renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center' }]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')}>
                  <Icon name="home" style={{ color: '#fff', fontSize: 30 ,paddingHorizontal:20}} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>تواصل معنا</Text>
               <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
               <Icon name="navicon" style={{ color: '#fff', fontSize: 30 ,paddingHorizontal:20}} />
               </TouchableOpacity>
            </View>
         )
      } else {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',}]}>
               <TouchableOpacity 
                onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
               <Icon name="navicon" style={{ color: '#fff', fontSize: 30 ,paddingHorizontal:20}} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Contact us</Text>              
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')} >
                  <Icon name="home" style={{ color: '#fff', fontSize: 25 ,paddingHorizontal:20}} />
               </TouchableOpacity>

            </View>
         )
      }
   }

  

  


   render() {
      return (
         <SafeAreaView style={styles.container} >
            <StatusBar backgroundColor='#383B43' barStyle="light-content" />
            <Spinner
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
             {this.renderHeader(this.props.Language)}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
            <View style={[styles.shadow,{width:width*0.93 ,height:height*0.85,marginTop:20,margin:5,alignItems:'center',backgroundColor:'#F8F8F8',borderRadius:8}]}>

    <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
    {this.props.Language=='AR'?'الأســم':'Name'}</Text>
    <View style={{width:'90%',alignItems:'center',justifyContent:'center',marginTop:10}}>
     <TextInput  
       placeholder={this.props.Language=='AR'?'الأسم':'Name'}
       placeholderTextColor='#969696'
       underlineColorAndroid="transparent"
       defaultValue={this.state.info}
       onChangeText={(info) => this.setState({ info  }) } 
       style={[this.props.Language=='AR'? styles.right : styles.left,styles.shadow,{width:'100%',height:55,borderRadius: 8,color:'#000',fontSize:16,fontFamily:'segoe',backgroundColor:'#fff',textAlignVertical:'center',paddingHorizontal:15}]}>
       </TextInput>
   </View>

    <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
    {this.props.Language=='AR'?'البريد الألكترونى':'Email'}</Text>
    <View style={{width:'90%',alignItems:'center',justifyContent:'center',marginTop:10}}>
     <TextInput  
       placeholder={this.props.Language=='AR'?'البريد الألكترونى':'Email'}
       placeholderTextColor='#969696'
       underlineColorAndroid="transparent"
       defaultValue={this.state.info}
       onChangeText={(info) => this.setState({ info  }) } 
       style={[this.props.Language=='AR'? styles.right : styles.left,styles.shadow,{width:'100%',height:55,borderRadius: 8,color:'#000',fontSize:16,fontFamily:'segoe',backgroundColor:'#fff',textAlignVertical:'center',paddingHorizontal:15}]}>
       </TextInput>
   </View>

    <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
    {this.props.Language=='AR'?'أكتب رسالتك':'Write message'}</Text>
    <View style={{width:'90%',alignItems:'center',justifyContent:'center',marginTop:10}}>
     <TextInput  
       placeholder={this.props.Language=='AR'?'أكتب هنا':'Write here'}
       placeholderTextColor='#969696'
       underlineColorAndroid="transparent"
       defaultValue={this.state.info}
       onChangeText={(info) => this.setState({ info  }) } 
       style={[this.props.Language=='AR'? styles.right : styles.left,styles.shadow,{width:'100%',height:150,borderRadius: 8,color:'#000',fontSize:16,fontFamily:'segoe',backgroundColor:'#fff',textAlignVertical:'top',paddingHorizontal:15}]}>
       </TextInput>
   </View>
   
   <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', position:'absolute',bottom:25 }]}>
       <TouchableOpacity onPress={() => { alert('hhh') }} style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center',backgroundColor:'#4B4B4B',borderRadius:10,height:55}]} >
          <Text style={{ color: '#FFFFFF', fontSize: 20,fontFamily:'segoe_bold', }}>
             {this.props.Language == "AR" ? 'أرسال رسالة' : 'Send message'}
           </Text>
       </TouchableOpacity>
   </View>

  </View>
            </ScrollView>
             
         </SafeAreaView>
         
      );
   }
}

//redux
const mapStateToProps = state => {
   return {
      Language: state.LanguageReducer.Language,
      Processing: state.AuthReducer.Processing,
      Message: state.AuthReducer.Message,
      User: state.AuthReducer.User,
   }
}
// redux
export default connect(mapStateToProps, { SetLoading  })(ContactUs)

const styles = StyleSheet.create({
   flex: {
      flex: 0
   },
   row: {
      flexDirection: 'row'
   },
   rowReversed: {
      flexDirection: 'row-reverse'
   },
   column: {
      flexDirection: 'column'
   },
   shadow: {
      shadowColor: '#000',
      shadowOffset: {
         width: 0,
         height: 6,
      },
      shadowOpacity: 0.05,
      shadowRadius: 10,
      elevation: 5,
   },
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F0F2F5',
   },
   image: {
      width: 90,
      height: 50
  },
  right:{
   textAlign:'right'
  },
  left:{
   textAlign:'left'
 },
  view1:{
   width:'90%',
   alignItems:'center',
   backgroundColor:'#fff',
   borderRadius:8,
   height:55
},

text:{
   width:'90%',
   color:'#707070',
   fontSize:15,
   fontFamily:'segoe'
},
  
});