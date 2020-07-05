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


class BillDetail extends Component {
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
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Bills')}>
               <Icon name="caret-left" style={{ color: '#ffffff', fontSize: 30,paddingHorizontal:20 }} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>الفواتــير</Text>
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Bills</Text>              
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Bills')} >
                <Icon name="caret-right" style={{ color: '#ffffff', fontSize: 30,paddingHorizontal:20 }} />
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
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'50%',alignItems:'center',justifyContent:'center',marginTop:20}]}>
                  <Text style={{flex:1,height:40,color:'#FFFFFF',textAlign:'center',textAlignVertical:'center',fontSize:16,fontFamily:'segoe',backgroundColor:'#3FC1CF',borderRadius:8,}}>
                   1487</Text>
                   <Text style={{flex:1,color:'#707070',fontSize:16,fontFamily:'segoe_bold',}}>
                   {this.props.Language=='AR'?'رقـم الفاتورة':'Bill number'}</Text>
              </View>

              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:height*0.08}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>28-6-2020</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'تاريـخ الفاتـورة':'Bill date'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>2500</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'المـبـلــغ':'Coast'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>قيد الأنتظار</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'حالة الدفع':'Payment state'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>0</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'المـدفـوع':'Payed'}</Text>
              </View>
             
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>0</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'الغـير مســدد':'Not payed'}</Text>
              </View>

              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}></Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'التفاصيــل':'Details'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}></Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'التعــديل':'Edit'}</Text>
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
export default connect(mapStateToProps, { SetLoading  })(BillDetail)

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
    flex:2.1,
    alignItems:'center',
    backgroundColor:'#fff',
    borderRadius:8,
    height:55
 },
 view2:{
     flex:1,
     alignItems:'center',
     justifyContent:'center',
     backgroundColor:'#fff',
     borderRadius:8,
     height:55
    },
 
 text:{
     flex:0.8,
    color:'#707070',
    fontSize:16,
    fontFamily:'segoe_bold'
 },
  
});