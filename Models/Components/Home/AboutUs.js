import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView , StatusBar, TextInput,Image, ScrollView,ImageBackground,FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get('window')
import { DrawerActions } from 'react-navigation-drawer'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';


import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class AboutUs extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         data:[],
        
      };
   }

    UNSAFE_componentWillMount(){
    }



   renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center' }]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')}>
                  <Icon name="home" style={{ color: '#fff', fontSize: 30,paddingHorizontal:20 }} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>عن الشركة</Text>
               <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
               <Icon name="navicon" style={{ color: '#fff', fontSize: 30,paddingHorizontal:20 }} />
               </TouchableOpacity>
            </View>
         )
      } else {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',}]}>
               <TouchableOpacity 
                onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} > 
               <Icon name="navicon" style={{ color: '#fff', fontSize: 30,paddingHorizontal:20 }} />
               </TouchableOpacity>
                <Text style={{flex:1,textAlign:'center', color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>About company</Text>              
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')} >
                  <Icon name="home" style={{ color: '#fff', fontSize: 30 ,paddingHorizontal:20}} />
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
            <View style={{width:width , alignItems:'center',justifyContent:'center'}}>
               <View style={{width:'60%',height:100,alignItems:'center',justifyContent:'center',marginTop:20}}>
                <Image source={require('./../../../image/title.png')} style={{ width:'100%', height:'100%' }} resizeMode='stretch' />
               </View>
               <Text style={{fontSize:16,textAlign:'center',color:'#707070',fontFamily:'segoe',marginTop:15}}>
                  {this.props.Language=='AR'?'وسائل التواصل الأجتماعى':'Social media'}</Text>
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'90%',alignItems:'center',justifyContent:'space-evenly',marginTop:20}]}>
                <TouchableOpacity style={[styles.social,{}]}>
                <Image source={require('./../../../image/face.png')} style={{ width:35 , height:35 }} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.social,{}]}>
                <Image source={require('./../../../image/insta.png')} style={{ width:35 , height:35 }} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.social,{}]}>
                <Image source={require('./../../../image/youtube.png')} style={{ width:35 , height:35 }} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.social,{}]}>
                <Image source={require('./../../../image/chat.png')} style={{ width:35 , height:35 }} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.social,{}]}>
                <Image source={require('./../../../image/whats.png')} style={{ width:35 , height:35 }} resizeMode='contain'/>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.social,{}]}>
                <Image source={require('./../../../image/twitter.png')} style={{ width:35 , height:35 }} resizeMode='contain'/>
                </TouchableOpacity>
               </View>
               <View style={[styles.shadow,{width:width*0.93,height:height*0.55,backgroundColor:'#F8F8F8',borderRadius:8,margin:5,marginTop:20}]}>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,{width:'98%',fontSize:16,color:'#707070',fontFamily:'segoe',marginTop:10}]}>
                 text </Text>
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
export default connect(mapStateToProps, { SetLoading  })(AboutUs)

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
      backgroundColor: '#fff',
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
  social:{
   width:40,height:40,
   borderRadius:40/2,
   borderColor:'#707070',
   borderWidth:1,
   alignItems:'center',
   justifyContent:'center',
  }
  
});