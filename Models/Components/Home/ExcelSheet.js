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
import DatePicker from 'react-native-datepicker'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

const list = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }]

import { connect } from 'react-redux' // redux
import { SetLoading } from './../../Actions' //redux


class ExcelSheet extends Component {
   constructor(props) {
      super(props);
      this.state = {
         Processing:false,
         data:[],
         flag_search:1,
         flag_filter:1,
         radioSelected: null,
         itemID:null,
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>ورقة أكسل</Text>
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
                <Text style={{ flex:1,textAlign:'center',color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Excel Sheet</Text>              
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
            <View style={[styles.shadow,{width:width*0.9 ,margin:5,alignItems:'center',backgroundColor:'#F8F8F8',borderRadius:10,marginTop:20}]}>
            <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'نوع السيارة':'Car type'}</Text>
            <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.shadow,styles.view1,{marginTop:10}]}>
                <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.state.types} // data
                   defaultValue={this.props.Language == "AR"?'أختر نوع السيارة':'Choose car type'}
                   onSelect={(index, value) => { 
                     this.setState({ specializationId: value.value , color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20}]}
                  dropdownStyle={[styles.shadow,{ width: '60%', height:140,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
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
                   options={this.state.cities}// data
                   defaultValue={this.props.Language=='AR'?' المدينة':'City'}
                   onSelect={(index, value) => { 
                     this.setState({ cityID: value.id,color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20 }]}
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
                   defaultValue={this.props.Language=='AR'?'البلــد':'Country'}
                   onSelect={(index, value) => { 
                     this.setState({ countryID: value.id,color:'#000' }) 
                     this.getCity(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{ fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20}]}
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
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'نقطـة الوصول':'The ending point'}</Text>
               <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,{width: '90%', height:55,alignItems: 'center', justifyContent: 'center', marginTop: 10 }]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.view2,styles.shadow,{ }]}>
              <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                <View style={[{ flex:1 }]}  >
                <ModalDropdown
                   options={this.state.cities}// data
                   defaultValue={this.props.Language=='AR'?' المدينة':'City'}
                   onSelect={(index, value) => { 
                     this.setState({ cityID: value.id,color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20 }]}
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
                   defaultValue={this.props.Language=='AR'?'البلــد':'Country'}
                   onSelect={(index, value) => { 
                     this.setState({ countryID: value.id,color:'#000' }) 
                     this.getCity(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={[this.props.Language=='AR'?styles.right:styles.left,{ fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20}]}
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
              <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'عدد السيارات':'Cars numbers'}</Text>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.shadow,styles.view1,{marginTop:10}]}>
                <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.state.types} // data
                   defaultValue={this.props.Language == "AR"?'أختر عدد السيارات ':'Choose cars number'}
                   onSelect={(index, value) => { 
                     this.setState({ specializationId: value.value , color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20}]}
                  dropdownStyle={[styles.shadow,{ width: '60%', height:140,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
               </View>  
               </View>
               <Text style={[this.props.Language=='AR'?styles.right:styles.left,styles.text,{marginTop:15}]}>
               {this.props.Language=='AR'?'المواد المنقـولة':'Material transferred'}</Text>
              <View style={[this.props.Language=='AR'?styles.row:styles.rowReversed,styles.shadow,styles.view1,{marginTop:10}]}>
                <Icon name="caret-down" size={25} color="#707070" style={{margin:15}} />
                  <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                  <ModalDropdown
                   options={this.state.types} // data
                   defaultValue={this.props.Language == "AR"?'أختر المواد المنقولـة':'Choose material transferred'}
                   onSelect={(index, value) => { 
                     this.setState({ specializationId: value.value , color:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.label)} // ba3d ma t5tar
                   style={{ width:'100%',}} // abl ma t5tar
                   textStyle={[this.props.Language == "AR"?styles.right:styles.left,{fontSize: 16, color: this.state.color,fontFamily:'segoe',marginHorizontal:20}]}
                  dropdownStyle={[styles.shadow,{ width: '60%', height:140,borderRadius: 8,backgroundColor:'#FAFAFA',}]}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ {width:'100%', backgroundColor: '#FCFCFC',justifyContent: 'center', alignItems: 'center', height: 35,}]}>
                     <Text style={[{ width:'100%',fontSize: 18, color: '#000', textAlign: 'center',fontFamily:'adobe',}, highlighted && { color: '#BDBDBD' }]}>
                      {rowData.label}
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
                  <TouchableOpacity onPress={() => { alert('hhh') }} style={[styles.shadow,{width:width*0.83,alignItems:'center',justifyContent:'center',backgroundColor:'#4B4B4B',borderRadius:10,height:50}]} >
                     <Text style={{ color: '#FFFFFF', fontSize: 20,fontFamily:'segoe_bold', }}>
                        {this.props.Language == "AR" ? 'تحميـل أكســل' : 'Excel download'}
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
export default connect(mapStateToProps, { SetLoading  })(ExcelSheet)

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