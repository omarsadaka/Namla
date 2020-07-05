import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView , StatusBar, TextInput,Image, ScrollView,ImageBackground,FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/FontAwesome'
const { width, height } = Dimensions.get('window')
import { DrawerActions } from 'react-navigation-drawer'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import ModalDropdown from 'react-native-modal-dropdown';
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading , GetAllCountries ,GetAllCities ,GetAllCarType , GetAllMaterials , AddRequest} from './../../Actions' //redux


class Home extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         data:[],
         flag_search:1,
         flag_filter:1,
         radioSelected: null,
         itemID:null,
         color1:'#969696',
         color2:'#969696',
         color3:'#969696',
         color4:'#969696',
         color5:'#969696',
         color6:'#969696',
         carTypeID: null,
         countryIDFrom: null,
         cityIDFrom: null,
         countryIDTo: null,
         cityIDTo: null,
         materialID: null,
         time:'',
         date:'',
         info:''
      };
   }

    componentWillMount(){
       this.props.GetAllCountries()
       this.props.GetAllCarType()
       this.props.GetAllMaterials()
    }

//     componentWillReceiveProps(nextProps) {
//       if (nextProps.Message != null) {
//           if(nextProps.Message=='Add Request Done'){
//              if(this.props.Language=='AR'){
//                 alert('تم تقديم الطلب')
//              }else{
//                 alert('Submit order done')
//              }
//           }else{
//               alert(nextProps.Message)
//           }
//       }
//   }

   AddRequest=()=>{
      const {carTypeID,countryIDFrom,cityIDFrom,countryIDTo,cityIDTo,materialID,date,time,info}=this.state
      if(carTypeID){
         if(countryIDFrom){
            if(cityIDFrom){
               if(countryIDTo){
                  if(cityIDTo){
                     if(materialID){
                        if(date){
                           if(time){
                           //   const obj={
                           //      date: date,
                           //      time: time,
                           //      createdBy: this.props.User.ID,
                           //      carTypeID: carTypeID,
                           //      comment: info,
                           //      CountryIDFrom: countryIDFrom,
                           //      CityIDFrom: cityIDFrom,
                           //      maturalID: materialID,
                           //      addeddate: new Date(),
                           //      CountryIDTo: countryIDTo,
                           //      CityIDTo: cityIDTo,
                           //      CID: this.props.User.ID,
                           //      brunchID: this.props.User.brunchID
                           //     }
                              //  this.props.AddRequest(obj)
                              NetInfo.fetch().then(state =>{
                                 if (state.isConnected){
                             try {
                                  this.setState({Processing: true})
                                 axios.post('http://elnamla.ants.sa/api/Client/AddReques',{
                                     date: date,
                                     time: time,
                                     createdBy: this.props.User.ID,
                                     carTypeID: carTypeID,
                                     comment: info,
                                     CountryIDFrom: countryIDFrom,
                                     CityIDFrom: cityIDFrom,
                                     maturalID: materialID,
                                     addeddate: new Date(),
                                     CountryIDTo: countryIDTo,
                                     CityIDTo: cityIDTo,
                                     CID: this.props.User.ID,
                                    //  brunchID: this.props.User.brunchID
                     
                                 }).then((response)=> {
                                    this.setState({Processing: false})
                                     if(response.data){
                                       if(this.props.Language=='AR'){
                                          alert('تم تقديم الطلب')
                                       }else{
                                          alert('Submit order done')
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
                                 alert('أختار الوقــت أولا')
                              }else{
                                 alert('Choose time first')
                              }
                           }
                        }else{
                           if(this.props.Language=='AR'){
                              alert('أختار التاريخ أولا')
                           }else{
                              alert('Choose date first')
                           }
                        }
                     }else{
                        if(this.props.Language=='AR'){
                           alert('أختار المواد المنقولة أولا')
                        }else{
                           alert('Choose Material transferred first')
                        }
                     }
                  }else{
                     if(this.props.Language=='AR'){
                        alert('أختار بلــد الوصول أولا')
                     }else{
                        alert('Choose end city first')
                     }
                  }
               }else{
                  if(this.props.Language=='AR'){
                     alert('أختار مدينة الوصول أولا')
                  }else{
                     alert('Choose end country first')
                  }
               }
            }else{
               if(this.props.Language=='AR'){
                  alert('أختار مدينة الأنطلاق أولا')
               }else{
                  alert('Choose start city first')
               }
            }
         }else{
            if(this.props.Language=='AR'){
               alert('أختار بلــد الأنطلاق أولا')
            }else{
               alert('Choose start country first')
            }
         }
      }else{
         if(this.props.Language=='AR'){
            alert('أختار نوع السيارة أولا')
         }else{
            alert('Choose car type first')
         }
      }
   }

   renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center', justifyContent:'center'}]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')}>
               <Image source={require('./../../../image/noti.png')} style={{ width:35 , height:35,marginHorizontal:20 }} resizeMode='contain' />
                <Text style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{width:20,height:20,borderRadius:20/2,backgroundColor:'#D53943',fontSize:12,textAlign:'center',
                textAlignVertical:'center',color:'#fff',position:'absolute',}]}>2</Text>
               </TouchableOpacity>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('./../../../image/title.png')} style={{ width:130 , height:50 }} resizeMode='cover' />
               </View>
               <TouchableOpacity onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
                <Entypo name="navicon" style={{ color: '#fff', fontSize: 30,marginHorizontal:20 }} />
               </TouchableOpacity>
            </View>
         )
      } else {
         return (
            <View style={[this.props.Language=='AR'? styles.rowReversed:styles.row,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center', justifyContent:'center'}]}>
               <TouchableOpacity 
               onPress={() => this.props.navigation.dispatch(DrawerActions.openDrawer())} >
               <Entypo name="navicon" style={{ color: '#fff', fontSize: 30,marginHorizontal:20 }} />
               </TouchableOpacity>
               <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                <Image source={require('./../../../image/title.png')} style={{ width:130 , height:50 }} resizeMode='cover' />
               </View>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('Cart')} >
               <Image source={require('./../../../image/noti.png')} style={{ width:35 , height:35,marginHorizontal:20 }} resizeMode='contain' />
               <Text style={[this.props.Language=='AR'?styles.posLeft:styles.posRight,{width:20,height:20,borderRadius:20/2,backgroundColor:'#D53943',fontSize:12,textAlign:'center',
                textAlignVertical:'center',color:'#fff',position:'absolute',}]}>2</Text>
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
            <View style={[styles.shadow,{width:width*0.9 ,margin:5,alignItems:'center',backgroundColor:'#F8F8F8',borderRadius:10,marginTop:20}]}>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'نوع السيارة':'Car type'}</Text>
            <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.shadow,styles.view1,{marginTop:10}]}>
                <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.props.CarTypes} // data
                   defaultValue={this.props.Language == "AR"?'أختر نوع السيارة':'Choose car type'}
                   onSelect={(index, value) => { 
                     this.setState({ carTypeID: value.id , color1:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 16, color: this.state.color1,fontFamily:'segoe',marginHorizontal:20}]}
                  dropdownStyle={[styles.shadow,{ width: '50%', height:200,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.title}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
               </View>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'نقطـة الانطلاق':'The starting point'}</Text>
              
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width: '90%', height:55,alignItems: 'center', justifyContent: 'center', marginTop: 10 }]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.view2,styles.shadow,{ }]}>
              <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                <View style={[{ flex:1 }]}  >
                <ModalDropdown
                   options={this.props.Cities}// data
                   defaultValue={this.props.Language=='AR'?' المدينة':'City'}
                   onSelect={(index, value) => { 
                     this.setState({ cityIDFrom: value.id,color3:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color3,fontFamily:'segoe',marginHorizontal:20 }]}
                   dropdownStyle={{ width: '50%', alignSelf: 'center', height: 230, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
                   options={this.props.Countries} // data
                   defaultValue={this.props.Language=='AR'?'البلــد':'Country'}
                   onSelect={(index, value) => { 
                     this.setState({ countryIDFrom: value.id,color2:'#000' }) 
                     this.props.GetAllCities(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{ fontSize: 16, color: this.state.color2,fontFamily:'segoe',marginHorizontal:20}]}
                    dropdownStyle={{ width: '50%', alignSelf: 'center', height: 230, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'نقطـة الوصول':'The ending point'}</Text>
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width: '90%', height:55,alignItems: 'center', justifyContent: 'center', marginTop: 10 }]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.view2,styles.shadow,{ }]}>
              <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                <View style={[{ flex:1 }]}  >
                <ModalDropdown
                   options={this.props.Cities}// data
                   defaultValue={this.props.Language=='AR'?' المدينة':'City'}
                   onSelect={(index, value) => { 
                     this.setState({ cityIDTo: value.id,color5:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color5,fontFamily:'segoe',marginHorizontal:20 }]}
                   dropdownStyle={{ width: '50%', alignSelf: 'center', height: 230, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
                   options={this.props.Countries} // data
                   defaultValue={this.props.Language=='AR'?'البلــد':'Country'}
                   onSelect={(index, value) => { 
                     this.setState({ countryIDTo: value.id,color4:'#000' }) 
                     this.props.GetAllCities(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{ fontSize: 16, color: this.state.color4,fontFamily:'segoe',marginHorizontal:20}]}
                    dropdownStyle={{ width: '50%', alignSelf: 'center', height: 230, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'المواد المنقـولة':'Material transferred'}</Text>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.shadow,styles.view1,{marginTop:10}]}>
                <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.props.Materials} // data
                   defaultValue={this.props.Language == "AR"?'أختر المواد المنقولـة':'Choose material transferred'}
                   onSelect={(index, value) => { 
                     this.setState({ materialID: value.id , color6:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 16, color: this.state.color6,fontFamily:'segoe',marginHorizontal:20}]}
                  dropdownStyle={[styles.shadow,{ width: '60%', height:140,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.title}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
               </View>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'التاريـخ/الوقــت':'Date/time'}</Text>
             
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{ width: '90%',height: 55,alignItems:'center',justifyContent:'center',marginTop:10}]}>
                  <View  style={[styles.shadow,styles.view2,{justifyContent:'center'}]}>
                   <DatePicker
                   style={{
                     width:'100%',}}
                     date={this.state.time}
                     placeholder={this.props.Language=='AR' ?' الوقت' :'Time'}
                     mode="time"
                     format="h:mm A"
                     // minDate="2016-05-01"
                     // maxDate="2016-06-01"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     iconSource={require('../../../image/time.png')}
                     customStyles={{
                       dateIcon: {
                         right: 0,
                         top: 0,
                         width:30,
                         height:30
                       },
                       dateInput: {
                        
                         borderWidth: 0,borderColor: '#707070',fontSize:16
                       }
                       // ... You can check the source to find the other keys.
                       }}
                     onDateChange={(time) => {
                       this.setState({time})
                     }}
                 />
                                    
                  </View>
                  <View style={{width:'2%'}}></View>
                  <View style={[styles.shadow,styles.view2,{justifyContent:'center'}]} >
                 <DatePicker
                   style={{
                     width:'100%',}}
                     date={this.state.date}
                     placeholder={this.props.Language=='AR' ?'التاريخ' :'Date'}
                     mode="date"
                     format="YYYY-MM-DD"
                     minDate={new Date()}
                     // maxDate="2016-06-01"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     iconSource={require('../../../image/date.png')}
                     customStyles={{
                       dateIcon: {
                         right: 0,
                         top: 0,
                         width:30,
                         height:30
                       },
                     dateInput: {
                      
                       borderWidth: 0,borderColor: '#707070',fontSize:16
                     }
                     // ... You can check the source to find the other keys.
                     }}
                     onDateChange={(date) => {this.setState({date})}}
                 />
                 </View>
                
                 </View>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'معلومات أضافيـة':'Addition information'}</Text>
               <View style={{width:'90%',alignItems:'center',justifyContent:'center',marginTop:10}}>
                <TextInput  
                  underlineColorAndroid="transparent"
                  defaultValue={this.state.info}
                  onChangeText={(info) => this.setState({ info  }) } 
                  style={[this.props.Language=='AR'? styles.right : styles.left,styles.shadow,{width:'100%',height:110,borderRadius: 8,color:'#000',fontSize:16,fontFamily:'segoe',backgroundColor:'#fff',textAlignVertical:'top',paddingHorizontal:15}]}>
                  </TextInput>
              </View>
              <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.1 ,marginBottom:20 }]}>
                  <TouchableOpacity onPress={() => this.AddRequest()} style={[styles.shadow,{width:width*0.83,alignItems:'center',justifyContent:'center',backgroundColor:'#4B4B4B',borderRadius:10,height:50}]} >
                     <Text style={{ color: '#FFFFFF', fontSize: 20,fontFamily:'segoe_bold', }}>
                        {this.props.Language == "AR" ? 'تقديـم الطلــب' : 'Submit the order'}
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
      Countries: state.AuthReducer.Countries,
      Cities: state.AuthReducer.Cities,
      CarTypes: state.AuthReducer.CarTypes,
      Materials: state.AuthReducer.Materials
   }
}
// redux
export default connect(mapStateToProps, { SetLoading ,GetAllCountries ,GetAllCities ,GetAllCarType , GetAllMaterials ,AddRequest})(Home)

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
view1:{
   width:'90%',
   alignItems:'center',
   backgroundColor:'#fff',
   borderRadius:8,
   height:55
},
view2:{
   flex:1,
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
posRight:{
   right:'30%'
},
posLeft:{
   left:'30%'
}
});