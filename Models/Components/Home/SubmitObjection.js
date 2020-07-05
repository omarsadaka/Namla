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
import { SetLoading , GetOrders } from './../../Actions' //redux


class SubmitObjection extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         color:'#969696',
         RID: null,
         Details: ''
      };
   }

    UNSAFE_componentWillMount(){
       this.props.GetOrders(this.props.User.ID)
    }
    

    AddObjection=()=>{
      const { RID , Details }=this.state
      if(RID){
         if(Details){
          NetInfo.fetch().then(state =>{
            if (state.isConnected){
             try {
              this.setState({Processing: true})
               axios.post('http://elnamla.ants.sa/api/Client/addObjection',{
                  CID: this.props.User.ID,
                  RID: RID,
                  des: Details,
                  userTypeID: this.props.User.userType 
               }).then((response)=> {
                 this.setState({Processing: false})
                 if(response.status==200){
                   if(this.props.Language=='AR'){
                   alert('تم تقديم الأعتراض')
                   this.setState({RID: null , Details:''})
                   }else{
                   alert('Submit objection done')
                   this.setState({RID: null , Details:''})
                   }
                 }
                }).catch((error)=> {
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
         }else{
            if(this.props.Language=='AR'){
               alert('أدخـل التفاصـيل أولا')
            }else{
               alert('Enter details first')
            }
         }
      }else{
         if(this.props.Language=='AR'){
            alert('أختار رقــم الطلب أولا')
         }else{
            alert('Choose order number first')
         }
      }
   }


    renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center' }]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')}>
                  <Icon name="home" style={{ color: '#fff', fontSize: 30 ,paddingHorizontal:20}} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>تقديم أعتراض</Text>
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Submit Objection</Text>              
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
               {this.props.Language=='AR'?'رقـم الطلـب':'Order number'}</Text>
            <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.shadow,styles.view1,{marginTop:10}]}>
                <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.props.Orders} // data
                   defaultValue={this.props.Language == "AR"?'رقـم الطلـب':'Order number'}
                   onSelect={(index, value) => { 
                     this.setState({ RID: value.ID , color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.ID)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20}]}
                  dropdownStyle={[styles.shadow,{ width: '40%', height:200,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.ID}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
               </View>

               <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'التفاصيـل':'Details'}</Text>
               <View style={{width:'90%',alignItems:'center',justifyContent:'center',marginTop:10}}>
                <TextInput  
                  underlineColorAndroid="transparent"
                  defaultValue={this.state.Details}
                  onChangeText={(Details) => this.setState({ Details  }) } 
                  style={[this.props.Language=='AR'? styles.right : styles.left,styles.shadow,{width:'100%',height:120,borderRadius: 8,color:'#000',fontSize:16,fontFamily:'segoe',backgroundColor:'#fff',textAlignVertical:'top',paddingHorizontal:15}]}>
                  </TextInput>
              </View>
              
              <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', position:'absolute',bottom:25 }]}>
                  <TouchableOpacity onPress={() =>  this.AddObjection() } style={[styles.shadow,{width:width*0.8,alignItems:'center',justifyContent:'center',backgroundColor:'#4B4B4B',borderRadius:10,height:55}]} >
                     <Text style={{ color: '#FFFFFF', fontSize: 20,fontFamily:'segoe_bold', }}>
                        {this.props.Language == "AR" ? 'تقديـم أعتراض' : 'Submit the objection'}
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
      Orders: state.AuthReducer.Orders
   }
}
// redux
export default connect(mapStateToProps, { SetLoading , GetOrders })(SubmitObjection)

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