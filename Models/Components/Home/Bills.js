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
import NavigationServices from './../../NavigationServices';

import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class Bills extends Component {
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>الفواتير</Text>
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
                <TouchableOpacity onPress={() => this.props.navigation.navigate('AppRoutes')} >
                  <Icon name="home" style={{ color: '#fff', fontSize: 25 ,paddingHorizontal:20}} />
               </TouchableOpacity>

            </View>
         )
      }
   }

  

  
   renderItem(index) {
      return (
         <TouchableOpacity activeOpacity={1}
         onPress={()=> this.props.navigation.navigate('BillDetail')}
         key={index.toString()} 
         style={[styles.shadow,{width: '98%', height:height*0.15,backgroundColor:'#FBFAF9',alignItems:'center',margin:4}]}>
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{ width: '100%',height:'100%',alignItems:'center',justifyContent:'center' }]}>
                  <View style={{width:'20%',height:'100%',alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:12,textAlign:'center',color:'#707070',fontFamily:'segoe_bold',position:'absolute',top:'7%'}}>23-6-2020</Text>
                  <Text style={{fontSize:12,textAlign:'center',color:'#707070',fontFamily:'segoe',position:'absolute',bottom:'25%'}}>5050</Text>
                  <Text style={{fontSize:11,textAlign:'center',color:'#707070',fontFamily:'segoe',position:'absolute',bottom:'13%'}}>
                     {this.props.Language=='AR'?'ريال سعودى':'SAR'}</Text>
                  </View>
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <Text style={{fontSize:17,textAlign:'center',color:'#707070',fontFamily:'segoe',}}>
                     {this.props.Language=='AR'?'حالـة الدفــع':'Payment state'}</Text>
                  <Text style={{fontSize:15,textAlign:'center',color:'#969696',fontFamily:'segoe',marginTop:10}}>
                  {this.props.Language=='AR'?'لم تســدد':'Not payed'}</Text>
                  </View>
                  <View style={[styles.shadow,{width:90,height:90,borderRadius:90/2,backgroundColor:'#fff',alignItems:'center',justifyContent:'center',margin:10}]}>
                  <Text style={{fontSize:14,textAlign:'center',color:'#707070',fontFamily:'segoe'}}>
                   {this.props.Language=='AR'?'رقـم الفاتورة':'Bill number'} </Text>
                  <Text style={{fontSize:16,textAlign:'center',color:'#3FC1CF',fontFamily:'segoe_bold'}}>
                    15 </Text>
                  </View>
               </View>
         </TouchableOpacity>
      )
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
            <View style={[styles.shadow,this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'90%',alignItems:'center',height:50,backgroundColor:'#F8F8F8',borderRadius:8,marginTop:5}]}>
                <Icon name="search" style={{ color: '#707070', fontSize: 20 ,paddingHorizontal:15}} />
                <TextInput  
                  placeholder={this.props.Language=='AR'?'البحـث':'Search'}
                  placeholderTextColor='#969696'
                  underlineColorAndroid="transparent"
                  defaultValue={this.state.search}
                  onChangeText={(search) => this.setState({ search  }) } 
                  style={[this.props.Language=='AR'? styles.right : styles.left,{flex:1,height:'100%',color:'#000',fontSize:16,fontFamily:'segoe',paddingHorizontal:7}]}>
                  </TextInput>
               </View>

               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width: '90%', height:50,alignItems: 'center', justifyContent: 'center', marginTop: 10 }]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.view2,styles.shadow,{ }]}>
              <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                <View style={[{ flex:1 }]}  >
                <ModalDropdown
                   options={this.state.cities}// data
                   defaultValue={this.props.Language=='AR'?' الحالـة':'State'}
                   onSelect={(index, value) => { 
                     this.setState({ cityID: value.id,color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:10 }]}
                   dropdownStyle={{ width: 150, alignSelf: 'center', height: 200, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 40, borderBottomWidth: 0.5, borderBottomColor: "#D7D7D7", }]}>
                     <Text style={[{ fontSize: 16, color: '#000', textAlign: 'center' }, highlighted && { color: '#000' }]}>
                      {rowData.title}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                </View>
              </View>
              <View style={{width:'3%'}}></View>
              <View style={[this.props.Language=='AR'?styles.row:styles.row_res,styles.view2,styles.shadow,{ }]}>
              <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                <View style={[{flex:1 }]} >
                <ModalDropdown
                   options={this.state.countries} // data
                   defaultValue={this.props.Language=='AR'?'ترتيـب':'Sort'}
                   onSelect={(index, value) => { 
                     this.setState({ countryID: value.id,color:'#000' }) 
                     this.getCity(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{ fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:10}]}
                    dropdownStyle={{ width: 150, alignSelf: 'center', height: 200, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 40, borderBottomWidth: 0.5, borderBottomColor: "#D7D7D7", }]}>
                     <Text style={[{ fontSize: 16, color: '#000', textAlign: 'center' }, highlighted && { color: '#000' }]}>
                      {/* {this.state.lang==='ar'?rowData.titleAr:rowData.titleEN} */}
                      {rowData.title}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                </View>
               </View>
              </View>
               
              <FlatList style={{ width:'100%',marginTop:15,marginBottom:5}}
               data={list}
               showsVerticalScrollIndicator={false}
               renderItem={({ item }) => this.renderItem(item)}
               keyExtractor={(item, index) => index.toString()}
             />
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
export default connect(mapStateToProps, { SetLoading  })(Bills)

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
   view2:{
      flex:1,
      alignItems:'center',
      backgroundColor:'#F8F8F8',
      borderRadius:8,
      height:55
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
  
});