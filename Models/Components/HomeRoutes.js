import React, { Component } from 'react';
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { SafeAreaView, ScrollView, Text, View, Image, StatusBar, TouchableOpacity,StyleSheet,Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window')

import AppRoutes from './Home/AppRoutes'
import Home from './Home/Home'
import ExcelSheet from './Home/ExcelSheet'
import OrdersList from './Home/OrdersList'
import SubmitObjection from './Home/SubmitObjection'
import Payments from './Home/Payments'
import Bills from './Home/Bills'
import TotalMovement from './Home/TotalMovement'
import ContactUs from './Home/ContactUs'
import AboutUs from './Home/AboutUs'
import LogOut from './Home/LogOut'
import NavigationServices from './../NavigationServices';


import FontAwesome from 'react-native-vector-icons/FontAwesome'
import axios from 'axios'
import NetInfo from '@react-native-community/netinfo';

import { connect } from 'react-redux' // redux
import {  } from './../Actions' //redux


class HomeRoutes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image:'',
            first_name:'',
            last_name:'',
            city:'',

        };
    }

    UNSAFE_componentWillMount(){
     }

    

    renderHeader() {
            return (
                <View style={{ width:'100%' , height:height*0.22,alignItems:'center',justifyContent:'center',backgroundColor:'#3FC1CF',marginBottom:20}}>
                   <View style={{alignItems:'center',justifyContent:'center'}}>
                    <Image source={require('./../../image/user.png')} style={{ width:100 , height:100 }} resizeMode='cover' />
                    <Text style={{color:'#FFFFFF' , fontSize:18 , fontFamily:'segoe',textAlign:'center',marginTop:5}}>
                        {this.props.Language=='AR'?'أسم المستخدم':'User name'}
                    </Text>
                   </View>
                   <TouchableOpacity 
                    onPress={()=>  NavigationServices.reset('ChangeLang')}
                   style={[this.props.Language=='AR'?styles.posRight:styles.posLeft,{width:50 , height:35 , backgroundColor:'#444444', borderRadius:8,alignItems:'center',
                   justifyContent:'center',position:'absolute' ,top:'20%'}]}>
                    <Text style={{color:'#FFFFFF' , fontSize:16 , fontFamily:'segoe_bold',textAlign:'center'}}>
                        {this.props.Language=='AR'?'AR':'EN'}
                    </Text>
                   </TouchableOpacity>
                </View>
            )
    }




    render() {
        CustomDrawerContentComponent = (props) => (
            <SafeAreaView style={{ flex: 1,backgroundColor:'#FFFFFF',justifyContent:'center',alignItems:'center'}} forceInset={{ top: 'always', horizontal: 'never' }}>
                <StatusBar backgroundColor='#383B43' barStyle="light-content" />
                <ScrollView style={{width:'100%'}}>
                    {this.renderHeader()}
                    <DrawerItems {...props} />
                </ScrollView>
            </SafeAreaView>
        );

        Routes = createDrawerNavigator(
            {
                AppRoutes: {
                    screen: AppRoutes,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe',}}>{this.props.Language == "AR" ? 'الرئيسية' : 'Home'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <FontAwesome name="home" style={{ color: '#ffffff', fontSize: 23, }} />
                            </View>
                            
                        ),
                    }),
                },
                ExcelSheet: {
                    screen: ExcelSheet,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'ورقة اكسل' : 'Excel sheet'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/excel.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                OrdersList: {
                    screen: OrdersList,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'قائمة الطلبات' : 'Order list'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/orders.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                SubmitObjection: {
                    screen: SubmitObjection,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'تقديم أعتراض' : 'Submit objection'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                             <Image source={require('./../../image/objec.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                Payments: {
                    screen: Payments,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'المدفوعات' : 'Payments'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/paym.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                Bills: {
                    screen: Bills,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'الفواتير' : 'Bills'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/bills.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                TotalMovement: {
                    screen: TotalMovement,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'أجمالى الحركة' : 'Total Movement'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/total.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                ContactUs: {
                    screen: ContactUs,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'أتصل بنا' : 'Contact us'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/call.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                AboutUs: {
                    screen: AboutUs,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#4B4B4B',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'عن الشركة' : 'About company'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                               <Image source={require('./../../image/info.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
                LogOut: {
                    screen: LogOut,
                    navigationOptions: ({ navigation }) => ({
                        header: null,
                        drawerLabel: ()=>(
                        <Text style={{color:'#D53943',paddingHorizontal:15,fontSize:18 , fontFamily:'segoe'}}>{this.props.Language == "AR" ? 'تسجيل خروج' : 'Log out'}</Text>
                        ),
                        drawerIcon: ({ tintColor }) => (
                            <View style={{width:35,height:35,borderRadius:35/2,backgroundColor:'#23CCDE',alignItems:'center',justifyContent:'center'}}>
                              <Image source={require('./../../image/logout.png')} style={{width:23,height:23}} />
                            </View>
                            
                        ),
                    }),
                },
               
               
              
            },
            {
                contentComponent: CustomDrawerContentComponent,
                initialRouteName: "AppRoutes",
                drawerPosition: this.props.Language == "AR" ? 'right' : 'left',
                unmountInactiveRoutes:true, 
                contentOptions: {
                    activeTintColor: '#fff',
                    itemStyle: {width:'100%',flexDirection: this.props.Language == "AR" ? 'row-reverse' : 'row',marginTop:12},
                }
            },
        );


     

        AppContainer = createAppContainer(Routes);
        return (
            <AppContainer />
        );
    }

}

//redux
const mapStateToProps = state => {
    return {
        Language: state.LanguageReducer.Language,
        User: state.AuthReducer.User,
        Processing: state.AuthReducer.Processing,
        Message: state.AuthReducer.Message,
    }
}
// redux
export default connect(mapStateToProps, {  })(HomeRoutes)

// export default HomeRoutes
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
       justifyContent: 'flex-start',
       alignItems: 'center',
       backgroundColor: '#FFF',
    },
    right:{
        textAlign:'right'
    },
    left:{
        textAlign:'left'
    },
    posRight:{
        right:15
    },
    posLeft:{
        left:15
    }
 });