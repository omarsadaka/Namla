import React, { Component } from 'react';
import { View, Text, StatusBar, TouchableOpacity, SafeAreaView , StyleSheet, Dimensions, KeyboardAvoidingView,
     ScrollView ,Image, TextInput} from 'react-native';
import { Input, Item } from 'native-base'
const { width, height } = Dimensions.get('window')
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { CheckBox } from 'react-native-elements'
import Spinner from 'react-native-loading-spinner-overlay';
import { StackActions, NavigationActions } from 'react-navigation'
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';



import { connect } from 'react-redux' // redux
import { GetAllCountries , GetAllCities , SetLoading ,addIndividualCustomer ,addFoundationCustomer} from './../Actions' //redux

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name:'',
            fullname:'',
            password: '',
            mobile: '',
            email: '',
            countryID: null,
            cityID: null,
            fax:'',
            companyType:'',
            borderColor1:'#343434',
            borderColor2:'#3FC1CF',
            bg1:'#fff',
            bg2:'#3FC1CF',
            color1:'#D4D4D4',
            color2:'#D4D4D4',
            color3:'#D4D4D4',
            flag_type:1,
        };
    }

    componentWillMount(){
        this.props.SetLoading(false)
        this.props.GetAllCountries()
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.Message != null) {
            if(nextProps.Message=='Register Done'){
                this.props.navigation.dispatch(StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Login' })
                ],
               }))
            }else{
                alert(nextProps.Message)
            }
        }
    }

    emailIsValid(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    }

  
 

    renderHeader(lang) {
        if (lang == "EN") {
            return (
                <View style={[styles.flex, styles.row, styles.shadow, { width: width, height: height*0.1, alignItems: 'center', justifyContent: 'space-between', marginBottom: 15, backgroundColor: '#444444', paddingHorizontal: 18 }]} >
                    <View></View>
                    <Text style={{ color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>Create account</Text>
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
                    <Text style={{ color: '#FFFFFF', fontSize: 16,fontFamily:'segoe_bold' }}>أنشاء حسـاب</Text>
                    <View></View>
                </View>
            )
        }
    } 
    Register1() {
        const { fullname,name , email , mobile , countryID , cityID , password , confirmPassword}=this.state
        if(fullname.length>=2){
            if( name.length >= 1 && name.includes(' ') ){
                if( mobile.length >= 6 ){
                    if( this.emailIsValid(email)){
                        if( password.length >= 6 ){
                            if(password === confirmPassword){
                                if(countryID){
                                    if(cityID){
                                        this.props.addIndividualCustomer(fullname, email, mobile,countryID, cityID ,password , name)
                                    }else{
                                        if(this.props.Language=='AR'){
                                            alert("يجب أدخال المدينة")
                                         }else{
                                          alert("You must enter city")
                                        }
                                    }

                                }else{
                                    if(this.props.Language=='AR'){
                                        alert("يجب أدخال الدولة")
                                     }else{
                                      alert("You must enter country")
                                    }
                                }
                            }else{
                              if(this.props.Language=='AR'){
                               alert("الرقم السرى غير متطابق")
                            }else{
                             alert("You must enter match password")
                           }
                       }
                    }else{
                        if(this.props.Language=='AR'){
                        alert("الرقم السرى ضعيف ")
                      }else{
                        alert("password must be more than 8 letters or numbers")
                     }
                   }
                   }else{
                      if(this.props.Language=='AR'){
                        alert("البريد الألكتروني غير صالح")
                      }else{
                        alert("Email is not valid")
                    }
                   }
                  }else{
                    if(this.props.Language=='AR'){
                        alert("يجب ادخال رقم الموبايل")
                    }else{
                        alert("You must enter a mobile number")
                    }
                  }
               }else{
                   if(this.props.Language=='AR'){
                    alert("يجب أدخال أسم مستخدم صالح")
                 }else{
                    alert("You must enter valid username")
                }
            }
        }else{
            if(this.props.Language=='AR'){
                alert("يجب أدخال الأسم بالكامل  ")
             }else{
                alert("You must enter fullname")
            }
        }
       
    } 

    Register2() {
        const {fullname, name , email , mobile , fax , companyType ,countryID , cityID , password , confirmPassword}=this.state
        if(fullname.length>=2){
          if( name.length >=1 && name.includes(' ') ){
                    if( mobile.length >= 6 ){
                        if( this.emailIsValid(email)){
                            if( password.length >= 6 ){
                                if(password === confirmPassword){
                                    if(countryID){
                                        if(cityID){
                                            if(fax){
                                                if(companyType){
                                                    this.props.addFoundationCustomer(fullname, email, mobile, fax , companyType,countryID, cityID ,password , name)
                                                }else{
                                                    if(this.props.Language=='AR'){
                                                        alert("يجب أدخال  نوع الشركة")
                                                     }else{
                                                      alert("You must enter company type")
                                                    } 
                                                }
                                            }else{
                                                if(this.props.Language=='AR'){
                                                    alert("يجب أدخال رقم الفاكس")
                                                 }else{
                                                  alert("You must enter fax number")
                                                } 
                                            }
                                        }else{
                                            if(this.props.Language=='AR'){
                                                alert("يجب أدخال المدينة")
                                             }else{
                                              alert("You must enter city")
                                            }
                                        }

                                    }else{
                                        if(this.props.Language=='AR'){
                                            alert("يجب أدخال الدولة")
                                         }else{
                                          alert("You must enter country")
                                        }
                                    }
                                }else{
                                  if(this.props.Language=='AR'){
                                   alert("الرقم السرى غير متطابق")
                                }else{
                                 alert("You must enter match password")
                               }
                           }
                        }else{
                            if(this.props.Language=='AR'){
                            alert("الرقم السرى ضعيف ")
                          }else{
                            alert("password must be more than 8 letters or numbers")
                         }
                       }
                       }else{
                          if(this.props.Language=='AR'){
                            alert("البريد الألكتروني غير صالح")
                          }else{
                            alert("Email is not valid")
                        }
                       }
                      }else{
                        if(this.props.Language=='AR'){
                            alert("يجب ادخال رقم الموبايل")
                        }else{
                            alert("You must enter a mobile number")
                        }
                      }
                   }else{
                    if(this.props.Language=='AR'){
                        alert("يجب أدخال أسم مستخدم صالح")
                     }else{
                        alert("You must enter valid username")
                    }
                }
             }else{
                if(this.props.Language=='AR'){
                    alert("يجب أدخال الأسم بالكامل  ")
                 }else{
                    alert("You must enter fullname")
                }
            }
    } 

 

    render() {
        return (
            <SafeAreaView style={styles.container} >
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
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 12, paddingBottom: 18 }} >
                  
                    <View style={[this.props.Language == "AR"?styles.row:styles.row_res, {width: width*0.8 ,justifyContent: 'space-around', alignItems: 'center',marginTop:15}]} >
                        <TouchableOpacity 
                        onPress={()=> {
                            this.setState({borderColor1:'#3FC1CF' , borderColor2:'#343434' ,bg1:'#3FC1CF',bg2:'#fff'})
                            this.setState({flag_type: 2})
                        }}
                        style ={[this.props.Language == "AR"?styles.row:styles.row_res,styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',borderColor:this.state.borderColor1,backgroundColor:this.state.bg1 ,borderWidth:1,borderRadius:30,paddingVertical:10}]}>
                            <Text style={{ alignSelf: 'center', color: '#343434', fontSize: 16 ,fontFamily:'segoe',margin:7 }}>
                                {this.props.Language == "AR" ? 'عميـل منشـأة' : 'Facility customer'}</Text>
                        </TouchableOpacity>
                        <View style={{width:'4%'}}></View>
                        <TouchableOpacity 
                        onPress={()=> {
                            this.setState({borderColor2:'#3FC1CF' , borderColor1:'#343434' ,bg2:'#3FC1CF',bg1:'#fff'})
                            this.setState({flag_type: 1})
                        }}
                        style ={[this.props.Language == "AR"?styles.row:styles.row_res,styles.shadow,{flex:1,alignItems:'center',justifyContent:'center',borderColor:this.state.borderColor2,backgroundColor:this.state.bg2,borderWidth:1,borderRadius:30,paddingVertical:10}]}>
                            <Text style={{ alignSelf: 'center', color: '#343434', fontSize: 16 ,fontFamily:'segoe',margin:7 }}>
                                {this.props.Language == "AR" ? 'عميـل فـرد' : 'Individual customer'}</Text>
                        </TouchableOpacity>   
                    </View>

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: height*0.08 }]}>
                                <Input
                                    placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'الأسـم بالكامل' : 'full name'}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ fullname: text })}
                                />
                            </Item>
                        </View>

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12}]}>
                                <Input
                                    placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'أسـم المستخدم ' : 'User name'}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ name: text })}
                                />
                            </Item>
                        </View>
                <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                <View style={[this.props.Language=='AR'?styles.row:styles.row_res,styles.shadow,{ width: '90%', height: 55,marginTop: 12, backgroundColor: '#FFF', justifyContent: 'center',borderRadius: 6,alignItems:'center',}]} >
                <View style={[{ width:'20%',height:'100%',alignItems:'center',backgroundColor:'#F7F7F7',borderRadius:6,flexDirection:'row'}]}>
                 <Icon name="angle-down" size={15} color="#707070" style={{marginHorizontal:10}} />
                <View style={[{flex:1,alignItems:'center'}]}>
                <ModalDropdown
                   options={this.state.con_codes} // data
                   defaultValue='000'
                   onSelect={(index, value) => { 
                     this.setState({ codeID: value.title,color1:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%', }} // abl ma t5tar
                   textStyle={{ fontSize: 12,  color: this.state.color1,}}
                    dropdownStyle={{ width: 70, alignSelf: 'center', height: 250, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
                   renderRow={function (rowData, rowID, highlighted) {
                    return (
                     <View style={[ { backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', height: 40, borderBottomWidth: 0.5, borderBottomColor: "#D7D7D7", }]}>
                     <Text style={[{ fontSize: 12, color: '#000', textAlign: 'center' }, highlighted && { color: '#000' }]}>
                      {rowData.title}
                       </Text>
                        </View>
                      );
                      }.bind(this)}
                      />
                  </View>
              </View>
                <TextInput
                  underlineColorAndroid='#fff'
                  keyboardType="numeric"
                  placeholderTextColor='#D4D4D4'
                  defaultValue={this.state.mobile}
                  onChangeText={(mobile) => this.setState({ mobile })}
                  placeholder={this.props.Language=='AR'? ' رقم الجوال ' : ' Mobile'}
                  style={[this.props.Language=='AR'?styles.left:style.right,{flex:1,height:'100%',color:'#000',fontSize: 17,fontFamily:"segoe" }]}
                />
              </View>
              </View>

                    <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'البريد الالكترونى' : 'Email address'}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ email: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'كلمه المرور' : 'Password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ password: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'تأكيد كلمة المرور' : 'Confirm password'}
                                    secureTextEntry={true}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ confirmPassword: text })}
                                />
                            </Item>
                        </View>

               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
              <View style={[this.props.Language=='AR'?styles.row:styles.row_res,{width: '90%', height:55,alignItems: 'center', justifyContent: 'center', marginTop: 12 }]}>
              <View style={[this.props.Language=='AR'?styles.row:styles.row_res,styles.viewRow,styles.shadow,{ }]}>
              <Icon name="caret-down" size={20} color="#707070" style={{margin:10}} />
                <View style={[{ flex:1 }]}  >
                <ModalDropdown
                   options={this.props.Cities}// data
                   defaultValue={this.props.Language=='AR'?'أختر المدينة':'City'}
                   onSelect={(index, value) => { 
                     this.setState({ cityID: value.id,color2:'#000' }) 
                    }}
                   renderButtonText={(rowData) => (rowData.title)}  // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={{ textAlign: 'center', fontSize: 16, color: this.state.color2,fontFamily:'segoe' }}
                   dropdownStyle={{ width: 170, alignSelf: 'center', height: 300, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
              <View style={[this.props.Language=='AR'?styles.row:styles.row_res,styles.viewRow,styles.shadow,{ }]}>
              <Icon name="caret-down" size={20} color="#707070" style={{margin:10}} />
                <View style={[{flex:1 }]} >
                <ModalDropdown
                   options={this.props.Countries} // data
                   defaultValue={this.props.Language=='AR'?'أختر الدولة':'Country'}
                   onSelect={(index, value) => { 
                     this.setState({ countryID: value.id,color3:'#000' }) 
                     this.props.GetAllCities(value.id)
                    }}
                   
                   renderButtonText={(rowData) => (rowData.title)} // ba3d ma t5tar
                   style={{ width:'100%' }} // abl ma t5tar
                   textStyle={{ textAlign: 'center', fontSize: 16, color: this.state.color3,fontFamily:'segoe' }}
                    dropdownStyle={{ width: 170, alignSelf: 'center', height: 300, borderColor: '#D7D7D7', borderWidth: 1, borderRadius: 3, }}
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
            </View>

                  {this.state.flag_type==1?
                   <View style={{display:'none'}}></View>
                  :
                  <View style={[ { justifyContent: 'center', alignItems: 'center' }]}>
                       <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'الفاكـس' : 'Fax'}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ fax: text })}
                                />
                            </Item>
                        </View>

                        <View style={[styles.row, { justifyContent: 'center', alignItems: 'center' }]} >
                            <Item style={[styles.inputFields, styles.shadow, { marginTop: 12 }]}>
                                <Input
                                    placeholderTextColor='#D4D4D4'
                                    placeholder={this.props.Language == "AR" ? 'نوع الشـركة' : 'Company type'}
                                    style={{ color: '#000',fontSize:17,fontFamily:'segoe' }}
                                    textAlign={'center'}
                                    onChangeText={(text) => this.setState({ companyType: text })}
                                />
                            </Item>
                        </View>
                  </View>
                  }
               <View style={[styles.row, { justifyContent: 'center', alignItems: 'center', marginTop: height*0.15 }]}>
                          <TouchableOpacity 
                          onPress={() => {
                                 if(this.state.flag_type==1){
                                    this.Register1()
                                 }else{
                                    this.Register2()
                                 }
                               }} 
                               style={[styles.shadow,{width:width*0.83,alignItems:'center',justifyContent:'center',backgroundColor:'#3FC1CF',borderRadius:10,height:60}]} >
                                <Text style={{ color: '#343434', fontSize: 20,fontFamily:'segoe_bold', }}>
                                    {this.props.Language == "AR" ? 'أنشاء الحسـاب' : 'Login'}
                                </Text>
                            </TouchableOpacity>
                        </View>
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
        Countries: state.AuthReducer.Countries,
        Cities: state.AuthReducer.Cities
    }
}
// redux
export default connect(mapStateToProps, { GetAllCountries , GetAllCities , addIndividualCustomer, addFoundationCustomer, SetLoading })(Register)

const styles = StyleSheet.create({
    flex: {
        flex: 0
    },
    row: {
        flexDirection: 'row'
    },
    row_res:{
        flexDirection:'row-reverse'
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
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 7,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
    },
   
  
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
    inputFields: {
        width:'90%',
        height:55,
        backgroundColor:'#fff',borderRadius:6,
        borderBottomColor: '#F0F2F5',
    },
    Button: {
        width: '35%',
        borderRadius: 60,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        marginBottom: 18,
        marginHorizontal: 36
    },
    image: {
        width: 190,
        height: height*0.12,
    },
    right:{
        textAlign:'right',
        paddingEnd:'22%'
      },
      left:{
        textAlign:'left',
        paddingStart:'22%'
      },
      viewRow:{
        flex:1, height: '100%', 
        alignItems: 'center', borderRadius: 6,
        shadowColor: '#000000',fontFamily:"segoe",
        backgroundColor: '#fff', 
      },
});