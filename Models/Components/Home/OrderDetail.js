import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Dimensions, StyleSheet, SafeAreaView , StatusBar, TextInput,Image, ScrollView,ImageBackground,FlatList } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo'
const { width, height } = Dimensions.get('window')
import { DrawerActions } from 'react-navigation-drawer'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import NavigationServices from './../../NavigationServices';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import DatePicker from 'react-native-datepicker'
import ModalDropdown from 'react-native-modal-dropdown';
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading ,GetAllCountries , GetAllCities} from './../../Actions' //redux


class OrderDetail extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         data:{},
         color1:'#969696',
         color2:'#969696',
         color3:'#969696',
         color4:'#969696',
         ID: null,
         date: '',
         countryIDFrom: null,
         cityIDFrom: null,
         countryIDTo: null,
         cityIDTo: null,
         status: '',
         cost: null,
         shipmentNum: null,
         statementNum: null
      };
   }

    UNSAFE_componentWillMount(){
      this.props.GetAllCountries()
       this.GetOrderDetails()
    }
    
     GetOrderDetails = () => {
      const { navigation } = this.props;
      const id = navigation.getParam('ID', 'NO-ID');
          NetInfo.fetch().then(state =>{
              if (state.isConnected){
          try {
             this.setState({Processing: true})
              axios.get('http://elnamla.ants.sa/api/Client/GetRequestByID',{
                 params:{
                     id
                 }
              }).then((response)=>{
               this.setState({Processing: false})
                  const Data = response.data;
                   this.setState({data: Data})
                   this.setState({ID: Data.ID})
                   this.setState({date: Data.date})
                   this.setState({countryIDFrom: Data.CountryFrom})
                   this.setState({countryIDTo: Data.CountryTo})
                   this.setState({cityIDFrom: Data.CityFrom})
                   this.setState({cityIDTo: Data.CityTo})
                   this.setState({status: Data.status})
                   this.setState({cost: Data.cost})
                   this.setState({statementNum: Data.statementNum})
                   this.setState({shipmentNum: Data.shipmentNum})
            
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
  }


  UpdateOrder=()=>{
   const {countryIDFrom,cityIDFrom,countryIDTo,cityIDTo,date}=this.state
      if(countryIDFrom){
         if(cityIDFrom){
            if(countryIDTo){
               if(cityIDTo){
                     if(date){
                           NetInfo.fetch().then(state =>{
                              if (state.isConnected){
                          try {
                               this.setState({Processing: true})
                              axios.post('http://elnamla.ants.sa/api/Client/UpdateRequest',{
                                  date: date,
                                  time: this.state.data.time,
                                  ID: this.state.ID,
                                  carTypeID: this.state.data.carTypeID,
                                  comment: this.state.data.comment,
                                  CountryIDFrom: countryIDFrom,
                                  CityIDFrom: cityIDFrom,
                                  maturalID: this.state.data.materialID,
                                  CountryIDTo: countryIDTo,
                                  CityIDTo: cityIDTo,
                                  cost: this.state.cost,
                                  shipmentID: this.state.data.shipmentID,
                                  loaderID: this.state.data.loaderID
                              }).then((response)=> {
                                 this.setState({Processing: false})
                                  if(response.status==200){
                                    if(this.props.Language=='AR'){
                                       alert('تــم تعديل الطلب')
                                    }else{
                                       alert('Edit order done')
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
                           alert('أختار التاريخ أولا')
                        }else{
                           alert('Choose date first')
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
}

  
   DeleteOrder=()=>{
      NetInfo.fetch().then(state =>{
     if (state.isConnected){
      try {
      this.setState({Processing: true})
      axios.post('http://elnamla.ants.sa/api/Client/addCancelOrder',{
         des: this.state.data.comment,
         CID: this.props.User.ID,
         RID: this.state.ID,
         userType: this.props.User.userType
       }).then((response)=> {
       this.setState({Processing: false})
       if(response.status==200){
         if(this.props.Language=='AR'){
           alert('تــم ألغــاء الطلب')
        }else{
             alert('Order deleted')
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
   
   }

    renderHeader(lang) {
      if (lang == "AR") {
         return (
            <View style={[this.props.Language=='AR'? styles.row:styles.rowReversed,styles.shadow,{width:width,height:60,backgroundColor: '#383B43',alignItems:'center' }]}>
               <TouchableOpacity onPress={() => this.props.navigation.navigate('OrdersList')}>
               <Icon name="caret-left" style={{ color: '#ffffff', fontSize: 30, paddingHorizontal:20}} />
               </TouchableOpacity>
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>قائمـة الطلبات</Text>
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Order list</Text>              
                <TouchableOpacity onPress={() => this.props.navigation.navigate('OrdersList')} >
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
            <View style={[styles.shadow,{width:width*0.95 ,height:height*0.85,marginTop:20,margin:5,alignItems:'center',backgroundColor:'#F8F8F8',borderRadius:8}]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'50%',alignItems:'center',justifyContent:'center',marginTop:20}]}>
                  <Text style={{flex:1,height:40,color:'#FFFFFF',textAlign:'center',textAlignVertical:'center',fontSize:16,fontFamily:'segoe',backgroundColor:'#3FC1CF',borderRadius:8,}}>
                   {this.state.ID}</Text>
                   <Text style={{flex:1,color:'#707070',fontSize:16,fontFamily:'segoe_bold',}}>
                   {this.props.Language=='AR'?'رقـم الطلـب':'Order number'}</Text>
              </View>

              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
              <View style={[styles.view1,{justifyContent:'center'}]} >
                 <DatePicker
                   style={{
                     width:'100%',}}
                     date={this.state.date.split('T')[0]}
                     placeholder={this.props.Language=='AR' ?'التاريــخ' :'Date'}
                     mode="date"
                     format="YYYY-MM-DD"
                     minDate={new Date()}
                     // maxDate="2016-06-01"
                     confirmBtnText="Confirm"
                     cancelBtnText="Cancel"
                     customStyles={{
                       dateIcon: {
                         right: 0,
                         display:'none',
                         top: 0,
                         width:30,
                         height:30
                       },
                     dateInput: {
                      
                       borderWidth: 0,borderColor: '#707070',fontSize:16
                     }
                     // ... You can check the source to find the other keys.
                     }}
                     onDateChange={(date) => {this.setState({date})}}/>
                 </View>
              <Text style={styles.text}>
                   {this.props.Language=='AR'?'التاريـــخ':'Date'}</Text>
              </View>

              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
              <View style={[styles.view2,{ }]}>
                <ModalDropdown
                   options={this.props.Cities}// data
                   defaultValue={this.state.cityIDFrom}
                   onSelect={(index, value) => { 
                     this.setState({ cityIDFrom: value.id,color2:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[{fontSize: 16, textAlign:'center',color: this.state.color2,fontFamily:'segoe',marginHorizontal:20 }]}
                   dropdownStyle={{ width: '35%', alignSelf: 'center', height: height*0.35, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
              <View style={{width:'3%'}}></View>
              <View style={[styles.view2,{ }]}>
                <ModalDropdown
                   options={this.props.Countries} // data
                   defaultValue={this.state.countryIDFrom}
                   onSelect={(index, value) => { 
                     this.setState({ countryIDFrom: value.id,color1:'#000' }) 
                     this.props.GetAllCities(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[{ fontSize: 16, textAlign:'center',color: this.state.color1,fontFamily:'segoe',marginHorizontal:20}]}
                    dropdownStyle={{ width: '35%', alignSelf: 'center', height: height*0.35, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
              <Text style={styles.text}>
                   {this.props.Language=='AR'?'نقطــة الانـطـلاق':'Start point'}</Text>
              </View>

              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
              <View style={[styles.view2,{ }]}>
                <ModalDropdown
                   options={this.props.Cities}// data
                   defaultValue={this.state.cityIDTo}
                   onSelect={(index, value) => { 
                     this.setState({ cityIDTo: value.id,color4:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[{fontSize: 16, textAlign:'center',color: this.state.color4,fontFamily:'segoe',marginHorizontal:20 }]}
                   dropdownStyle={{ width: '35%', alignSelf: 'center', height: height*0.35, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
              <View style={{width:'3%'}}></View>
              <View style={[styles.view2,{ }]}>
                <ModalDropdown
                   options={this.props.Countries} // data
                   defaultValue={this.state.countryIDTo}
                   onSelect={(index, value) => { 
                     this.setState({ countryIDTo: value.id,color3:'#000' }) 
                     this.props.GetAllCities(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[{ fontSize: 16, textAlign:'center',color: this.state.color3,fontFamily:'segoe',marginHorizontal:20}]}
                    dropdownStyle={{ width: '35%', alignSelf: 'center', height: height*0.35, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
              <Text style={styles.text}>
                   {this.props.Language=='AR'?'نقطــة الوصــول':'End point'}</Text>
              </View>
   
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>{this.state.shipmentNum}</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'رقــم الشـحنـة':'Delivery number'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                     <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>{this.state.statementNum}</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'رقــم الكــرتونـة':'Carton number'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>{this.state.status}</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'الحــالــة':'State'}</Text>
              </View>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'93%',alignItems:'center',marginTop:15}]}>
                 <View style={[styles.view1,{justifyContent:'center'}]} >
                 <Text style={{width:'100%',textAlign:'center',color:'#969696',fontSize:16,fontFamily:'segoe'}}>{this.state.cost}</Text>
                 </View>
              <Text style={styles.text}>{this.props.Language=='AR'?'التــكلــفة':'Coast'}</Text>
              </View>


              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width:'90%',alignItems:'center',marginTop:height*0.1}]}>
                 <TouchableOpacity
                 onPress={()=> this.DeleteOrder()}
                  style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#D53943',borderRadius:8,margin:5}}>
                  <Icon name="times-circle" style={{ color: '#ffffff', fontSize: 25, paddingHorizontal:20}} />
                 <Text style={{flex:1,textAlign:'center',color:'#FFFFFF',fontSize:17,fontFamily:'segoe'}}>
                     {this.props.Language=='AR'?'ألفــاء':'Cancel'}</Text>
                 </TouchableOpacity>

                 <TouchableOpacity 
                 onPress={()=> this.UpdateOrder()}
                  style={{flex:1,height:45,flexDirection:'row',alignItems:'center',justifyContent:'center',backgroundColor:'#3FC1CF',borderRadius:8,margin:5}}>
                   <Icon name="edit" style={{ color: '#ffffff', fontSize: 25, paddingHorizontal:20}} />
                  <Text style={{flex:1,textAlign:'center',color:'#444444',fontSize:17,fontFamily:'segoe'}}>
                     {this.props.Language=='AR'?'تعــديل':'Edit'}</Text>
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
   }
}
// redux
export default connect(mapStateToProps, { SetLoading ,GetAllCountries , GetAllCities })(OrderDetail)

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