import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, SafeAreaView, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import { connect } from 'react-redux' // redux
import { SetLoading , UserLogin } from './../Actions' //redux

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            password: null
        };
    }

    componentWillMount(){
    }
    
   
    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
        if (nextProps.Message=='Login Done') {
            this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'HomeRoutes' })
                ],
            }))
        }else{
            alert(nextProps.Message)
        }
    }
    }
   

    goHome() {
        this.props.navigation.dispatch(StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'HomeRoutes' })
            ],
        }))
    }

    Login() {
        const { username, password , userKey } = this.state
        if(username && password ){
            this.props.UserLogin(username, password )
        }else{
            if(this.props.Language=='AR'){
                alert('أكمل البيانات المطلوبة')
            }else{
                alert('Complete your data')
            }
            
        }
    }

    goRegister() {
        this.props.navigation.navigate('Register')
    }

    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: height*0.1, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#444444', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Sign In</Text>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <FontAwesome name="caret-right" style={{ color: '#ffffff', fontSize: 30,padding:7 }} />
                    </TouchableOpacity>
                </View>
            )
        } else {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: height*0.1, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#444444', paddingHorizontal: 18 }]} >
                    
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} >
                        <FontAwesome name="caret-left" style={{ color: '#ffffff', fontSize: 30,padding:7 }} />
                    </TouchableOpacity>
                    <Text style={{ color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>تسجيل الدخول</Text>
                    <View></View>
                </View>
            )
        }
    } 

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor='#3FC1CF' barStyle="light-content" />
                <Spinner
                    visible={this.props.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#FFF' }}
                />
                 {this.renderHeader(this.props.Language)}

                <KeyboardAvoidingView
                    enabled
                    behavior="height"
                    style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 18 }} >
                   
                       <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                            <Image source={require('./../../image/logo.png')} style={[styles.image, { marginTop: 20 }]} />
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',marginTop:height*0.04}]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'أسـم المستخدم' : 'User name'}
                                    style={{ color: '#000',fontFamily:'segoe',fontSize:20 }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ username: text })}
                                />
                            </Item>
                        </View>
                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'كلمه المرور' : 'Password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontFamily:'segoe',fontSize:20 }} textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password: text })} />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: 30 }]}>
                          <TouchableOpacity onPress={() => { this.Login() }} style={[styles.shadow,{width:width*0.87,alignItems:'center',justifyContent:'center',backgroundColor:'#3FC1CF',borderRadius:10,height:60}]} >
                                <Text style={{ color: '#343434', fontSize: 20,fontFamily:'segoe_bold', }}>
                                    {this.props.Language == "AR" ? 'تسجيل الدخول' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',marginTop:10 }]} >
                            <TouchableOpacity
                            onPress={()=>{this.setState({isVisible:true})}}>
                            <Text style={{ fontSize: 18, color: '#343434',fontFamily:'segoe' }} >
                                {this.props.Language == "AR" ? 'فقدت كلمه المرور؟' : 'Forgot Password'}
                            </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]}>
                            <TouchableOpacity onPress={() => this.goRegister()} style={[styles.Button, styles.shadow, { backgroundColor: '#444444', marginTop: height*0.08 }]} >
                                <Text style={{ color: '#FFFFFF', fontSize: 20, fontFamily:'segoe_bold', }}>
                                    {this.props.Language == "AR" ? 'أنشاء حساب' : 'Create an Account'}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.05,marginBottom:20 }]} >
                            <Text onPress={() => this.goHome()} style={{ fontSize: 20, color: '#343434',fontFamily:'segoe' }} >
                                {this.props.Language == "AR" ? 'تخطى التسجيل' : 'Skip Login'}
                            </Text>
                        </View>

            <Modal
             isVisible={this.state.isVisible}
             onBackdropPress={() => this.setState({ isVisible: false })}
             swipeDirection="left"
             >
          <View style={styles.modal}>
             <View style={[this.props.Language == "AR" ? styles.row : styles.row_res,{width:'100%',alignItems:'center'}]}>
                <TouchableOpacity
                 onPress={()=>this.setState({isVisible:false})}>
               <Icon name="close" size={12} color="#000" style={{margin:7}} />
               </TouchableOpacity>
            </View>
            <Text style={{ width: '100%',textAlign:'center',alignItems:'center',color:'#000', fontSize:20,fontFamily:'segoe',}}>
            {this.props.Language == "AR" ? 'فقدت كلمة المرور؟' : 'Forget Password'}
            </Text>
            <Text style={{ width: '50%',textAlign:'center',alignItems:'center',color:'#343434', fontSize:16,fontFamily:'segoe',marginTop:10}}>
            {this.props.Language == "AR" ? 'الرجاء أدخال البريد الألكترونى لانشاء كلمة مرور جديدة' : 'Please Enter Your Email To Creat New Password'}
            </Text>
            <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                 <Item style={[styles.inputFields,{ marginTop: 12 }]}>
                    <Input
                    placeholderTextColor='#919191'
                    placeholder={this.props.Language == "AR" ? 'البريد الألكترونى' : 'Email'}
                    style={{ color: '#000',fontFamily:'segoe',fontSize:17,borderColor:'#E4E4E4',borderRadius:5,borderWidth:1 }} textAlign={'center'}
                    onChangeText={(text) => this.setState({ forgetEmail: text })} />
                 </Item>
            </View>
            <View style={[{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }]}>
                <TouchableOpacity 
                onPress={() => { alert('fff') }} 
                style={[styles.shadow,{width:width*0.6,alignItems:'center',justifyContent:'center',height:35,backgroundColor:'#3FC1CF',borderRadius:20,marginBottom:20} ]} >
                <Text style={{ color: '#FFF', fontSize: 14,fontFamily:'segoe_bold',fontWeight:'bold' }}>
                {this.props.Language == "AR" ? 'أنشاء كلمة مرور جديدة' : 'Create New Password'}
                </Text>
                </TouchableOpacity>
            </View>
           
         </View>
         
          </Modal>

                       
                      

                      

                        

                    </ScrollView>
                </KeyboardAvoidingView>

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
export default connect(mapStateToProps, { SetLoading ,UserLogin })(Login)

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    row: {
        flexDirection: 'row'
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
        elevation: 3,
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    inputFields: {
        width:'90%',
        height:60,
        backgroundColor:'#fff',borderRadius:6,
        borderBottomColor: '#F0F2F5',
    },
    Button: {
        width:width*0.87,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        height:60,
        marginBottom: 18,
    },
    image: {
        width: 200,
        height: 200
    },
    modal:{
        width:'100%',
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#fff',
        borderRadius:5,
      },
});