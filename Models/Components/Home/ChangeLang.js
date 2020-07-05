import React, { Component } from 'react';
import { View, StyleSheet, Image, StatusBar, Text, TouchableOpacity, Dimensions, AsyncStorage, YellowBox ,ActivityIndicator} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation'
const { width, height } = Dimensions.get('window')
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux' // redux
import { SetLanguage, SaveUser } from '../../Actions' //redux

YellowBox.ignoreWarnings(['Warning: Async Storage has been extracted from react-native core']);

class ChangeLang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Processing: false
        };
    }

    UNSAFE_componentWillMount() {
        
    }

    setAppLanguage = async (lang) => {
        this.setState({ Processing: true })
        try {
            await AsyncStorage.setItem('Lang', lang).then((value) => {
                AsyncStorage.getItem('Lang')
                    .then((val) => {
                        this.setState({ Processing: false })
                        this.props.SetLanguage(val)
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'HomeRoutes' })
                            ],
                        }))
                    })
            })

        } catch (error) {
            alert("error")
        }
    };
  
    render() {
        return (
            <View style={styles.container} >
                <StatusBar backgroundColor='#383B43' barStyle="light-content" />

                <Spinner
                    color='#28B5AF'
                    visible={this.state.Processing}
                    textContent={'Loading...'}
                    textStyle={{ color: '#28B5AF' }}
                />
                <Image source={require('./../../../image/logo.png')} style={styles.image} />
                <View style={[styles.row, { justifyContent: 'center', alignItems: 'center',marginTop:20 }]} >
                    <Text style={{ fontSize: 23,  color: '#343434', marginVertical: 21,fontFamily:'segoe' }} >{"أختر لغه التطبيق"}</Text>
                </View>
                  <View style={[styles.row,{ width:'85%',alignItems:'center',justifyContent:'center',marginTop:20}]} >

                         <TouchableOpacity onPress={() => this.setAppLanguage("EN")} style={[styles.Button, styles.shadow, { backgroundColor: '#3FC1CF'}]} >
                            <Text style={{ color: '#343434', fontSize: 16, fontFamily:'segoe', }}>English</Text>
                        </TouchableOpacity>
                    
                        <TouchableOpacity onPress={() => this.setAppLanguage("AR")} style={[styles.Button, styles.shadow, { backgroundColor: '#444444'}]} >
                            <Text style={{ color: '#FFFFFF', fontSize: 16, fontFamily:'segoe', }}>العربيه</Text>
                        </TouchableOpacity>

                </View>              
            </View>
        );
    }
}

//redux
const mapStateToProps = state => {
    return {
        Language: state.LanguageReducer.Language,
    }
}
// redux
export default connect(mapStateToProps, { SetLanguage, SaveUser })(ChangeLang)

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
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 3,
    },
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#FFF',
    },
    Button: {
        flex:1,margin:10,
        height:60,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 18,
        borderRadius:60,
    },
    text:{
        width:140,height:40,
        borderColor:'#fff',
        borderWidth:1, 
        fontSize: 15,fontFamily:'nexa_bold',
        textAlign:'center',
        textAlignVertical:'center'
    },
    image: {
        width: 250,
        height: 250,
    },
});