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

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class TotalMovement extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         required_amount: null,
         paid_amount: null,
         total_amount: null
      };
   }

    UNSAFE_componentWillMount(){
       this.getRequiredAmounts()
       this.getPaidAmounts()
       this.getTotalAmounts()
    }
     getRequiredAmounts = () => {
          NetInfo.fetch().then(state =>{
              if (state.isConnected){
          try {
            this.setState({Processing: true})
              axios.get('http://elnamla.ants.sa/api/Client/getRequiedAmounts',{
                 params:{
                  cid: this.props.User.ID
                 }
              }).then((response)=> {
               this.setState({Processing: false})
                  const Data = response.data;
                  this.setState({required_amount: Data})
              }).catch(function (error) {
               this.setState({Processing: false})
               alert(error)
              }).finally(function () {
                  // always executed
              });
          } catch (error) {
            this.setState({Processing: false})
            alert('Something went wrong')
          }
         } else {
            if(this.props.Language=='AR'){
               alert('لا يوجد أتصال بالأنترنت')
               }else{
                     alert('No internet connection')
              }
         }
       });
  }

  getPaidAmounts = () => {
   NetInfo.fetch().then(state =>{
       if (state.isConnected){
   try {
       axios.get('http://elnamla.ants.sa/api/Client/getPaidAmounts',{
          params:{
            cid: this.props.User.ID
          }
       }).then((response)=> {
           const Data = response.data;
           this.setState({paid_amount: Data})
       }).catch(function (error) {
        alert(error)
       }).finally(function () {
           // always executed
       });
   } catch (error) {
     alert('Something went wrong')
   }
  } else {
     if(this.props.Language=='AR'){
        alert('لا يوجد أتصال بالأنترنت')
        }else{
              alert('No internet connection')
       }
  }
});
}

  getTotalAmounts = () => {
   NetInfo.fetch().then(state =>{
       if (state.isConnected){
   try {
       axios.get('http://elnamla.ants.sa/api/Client/getTotalAmounts',{
          params:{
            cid: this.props.User.ID
          }
       }).then((response)=> {
           const Data = response.data;
           this.setState({total_amount: Data})
       }).catch(function (error) {
        alert(error)
       }).finally(function () {
           // always executed
       });
   } catch (error) {
     alert('Something went wrong')
   }
  } else {
     if(this.props.Language=='AR'){
        alert('لا يوجد أتصال بالأنترنت')
        }else{
              alert('No internet connection')
       }
  }
});
}


    renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center' }]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')}>
                  <Icon name="home" style={{ color: '#fff', fontSize: 30 ,paddingHorizontal:20}} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>أجمالى الحركة</Text>
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Total Movement</Text>              
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
            <View style={[styles.shadow,{width:width*0.93 , height:height*0.85 , margin:5,backgroundColor:'#F8F8F8',alignItems:'center',borderRadius:8,marginTop:20}]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'95%',alignItems:'center',marginTop:20}]}>
                 <Text style={[styles.text,{textAlignVertical:'center', backgroundColor:'#fff',color:'#969696',}]}>{this.state.required_amount}</Text>
                 <Text style={{color:'#707070',fontSize:20,fontFamily:'segoe_bold',margin:10}}>
                    {this.props.Language=='AR'?'المبالـغ المطلوبـة':'Amounts required'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'95%',alignItems:'center',marginTop:10}]}>
               <Text style={[styles.text,{textAlignVertical:'center', backgroundColor:'#fff',color:'#969696',}]}>{this.state.paid_amount}</Text>
               <Text style={{color:'#707070',fontSize:20,fontFamily:'segoe_bold',margin:10}}>
                    {this.props.Language=='AR'?'المبالـغ المدفوعـة':'Amounts payed'}</Text>
              </View>
              <View style={{width:'95%',height:1,backgroundColor:'#DBDBDB',marginTop:10}}></View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'95%',alignItems:'center',marginTop:10}]}>
               <Text style={[styles.text,{textAlignVertical:'center',backgroundColor:'#3FC1CF',color:'#fff',}]}>{this.state.total_amount}</Text>
               <Text style={{color:'#707070',fontSize:20,fontFamily:'segoe_bold',margin:10}}>
                    {this.props.Language=='AR'?'الأجمالـــى':'Total amounts'}</Text>
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
export default connect(mapStateToProps, { SetLoading  })(TotalMovement)

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
     right:20
  },
  left:{
     left:20
  },
  text:{
   flex:1,height:55,
   borderRadius:10,
   textAlign:'center',fontSize:18,
   fontFamily:'segoe'
  }
  
});