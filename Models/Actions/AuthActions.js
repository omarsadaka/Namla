import axios from 'axios'
import { AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { StackActions, NavigationActions } from 'react-navigation'



export const UserLogin = (username, password) => {
    return async (dispatch) => {
        dispatch({ type: 'LOGIN_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/GetUserLogin', {
                params:{
                    username,
                    password
                }
            }).then((response)=> {
                if(response.data){
                    const usr = {
                        ID: response.data.ID ,
                        fullname: response.data.fullname,
                        brunchID: response.data.brunchID ,
                        userType: response.data.userType,

                    }
                    AsyncStorage.setItem('User', JSON.stringify(usr))
                    dispatch({ type: 'LOGIN_SUCCESS', payload: usr })
                }
                   
            }).catch((error)=> {
                if (error.response.data.Message) {
                    dispatch({ type: 'LOGIN_FAILED', payload: error.response.data.Message })
                }else {
                    dispatch({ type: 'LOGIN_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'LOGIN_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'LOGIN_FAILED', payload: "No internet connection" })
       }
     });
    }
}

export const SaveUser = (usr) => {
    return (dispatch) => {
        dispatch({ type: 'LOGIN_SUCCESS', payload: usr })
    }
}

export const addIndividualCustomer = (fullname, email, mobile, countryID, cityID , password ,username ) => {
    return async (dispatch) => {
        dispatch({ type: 'REGISTER_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://elnamla.ants.sa/api/Client/addIndividualCustomer', {
            fullname, email, mobile, countryID, cityID , password , username ,
            date: '', bankID:'' ,accountNum:'',payBal:'',
            CommercialNum:'',clientCode:'',clientNameEn:'',addressEn:''
            }).then((response)=> {
                if(response.data){
                    dispatch({ type: 'REGISTER_SUCCESS' })
                }
               
               
            }).catch( (error)=> {
                // dispatch({ type: 'REGISTER_FAILED', payload: error.message })
                    if (error.response.data.Message) {
                        dispatch({ type: 'REGISTER_FAILED', payload: error.response.data.Message })
                    }else {
                        dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
                    }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'REGISTER_FAILED', payload: "No internet connection" })
       }
     });
    }
}

export const addFoundationCustomer = (fullname, email, mobile, fax , companyType, countryID, cityID , password ,username) => {
    return async (dispatch) => {
        dispatch({ type: 'REGISTER_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://elnamla.ants.sa/api/Client/addFoundationCustomer', {
            fullname, email, mobile, fax , companyType, countryID, cityID , password ,username ,
            date: '', bankID:'' ,accountNum:'',payBal:'',phone:'',
            CommercialNum:'',clientCode:'',clientNameEn:'',addressEn:''
            }).then((response)=> {
                if(response.data){
                    dispatch({ type: 'REGISTER_SUCCESS' })
                }
               
               
            }).catch( (error)=> {
                // dispatch({ type: 'REGISTER_FAILED', payload: error.message })
                    if (error.response.data.Message) {
                        dispatch({ type: 'REGISTER_FAILED', payload: error.response.data.Message })
                    }else {
                        dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
                    }
                
               
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'REGISTER_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'REGISTER_FAILED', payload: "No internet connection" })
       }
     });
    }
}

export const UpdateUser = (usr , token) => {
    return (dispatch) => {
        dispatch({ type: 'UPDATEUSER_ATTEMP' })
        try {
            axios.put('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile/'+ token , {
                first_name: usr.first_name,
                last_name: usr.last_name,
                phone: usr.phone, 
                email: usr.email, 
                photo: usr.photo,
            }).then(function (response) {
                   if(response.data){
                    dispatch({ type: 'UPDATEUSER_SUCCESS'})
                   }
            }).catch(function (error) {
                dispatch({ type: 'UPDATEUSER_FAILED', payload: error.message })
                if (error.response.data.detail) {
                    dispatch({ type: 'UPDATEUSER_FAILED', payload: error.response.data.detail })
                } else {
                    dispatch({ type: 'UPDATEUSER_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'UPDATEUSER_FAILED', payload: "Something went wrong" })
        }
    }
}

export const SetLoading = ( bool ) => {
    return (dispatch) => {
        dispatch({ type: 'LOADING_USER', payload: bool })
    }
}

export const ForgetPwd = (email) => {
    return async (dispatch) => {
        dispatch({ type: 'FORGETPWD_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.post('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/forget_password/', {
                email 
            }).then((response)=> {
                if(response.data.detail=='reset code sent successfully.'){
                    dispatch({ type: 'FORGETPWD_SUCCESS' })
                }
                   
            }).catch((error)=> {
                dispatch({ type: 'FORGETPWD_FAILED', payload: error.message })
                if (error.response.data.error) {
                    dispatch({ type: 'FORGETPWD_FAILED', payload: error.response.data.error })
                } else {
                    dispatch({ type: 'FORGETPWD_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'FORGETPWD_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'FORGETPWD_FAILED', payload: "No internet connection" })
       }
     });
    }
} 
export const getUserProfile = (Token ) => {
    return async (dispatch) => {
        dispatch({ type: 'USERPROFILE_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://ec2-3-19-72-49.us-east-2.compute.amazonaws.com/accounts/profile', {
                headers: {
                    'Authorization': 'Token '+Token,
                  }
            }).then((response)=> {
                if(response.data.profile){
                    const userData = {
                        id: response.data.profile.id ,
                        first_name: response.data.profile.first_name,
                        last_name: response.data.profile.last_name,
                        email: response.data.profile.email,
                        photo: response.data.profile.photo,
                        phone: response.data.profile.phone,
                        points: response.data.profile.points,
                        city: response.data.profile.city,
                        lon: response.data.profile.lon,
                        lat: response.data.profile.lat,
                        user_type: response.data.profile.user_type,
                    }
                    dispatch({ type: 'USERPROFILE_SUCCESS', payload: userData })
                }
                   
            }).catch((error)=> {
                dispatch({ type: 'USERPROFILE_FAILED', payload: error.message })
                if (error.response.data.detail) {
                    dispatch({ type: 'USERPROFILE_FAILED', payload: error.response.data.detail })
                } else {
                    dispatch({ type: 'USERPROFILE_FAILED', payload: "Something went wrong" })
                }
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'USERPROFILE_FAILED', payload: "Something went wrong" })
        }
    } else {
        dispatch({ type: 'USERPROFILE_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const GetAllCountries = () => {
    return async (dispatch) => {
        dispatch({ type: 'COUNTRIES_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/GetAllCountries',{
               params:{
                   id:1
               }
            }).then(function (response) {
                const Data = response.data;
                 const countries = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    id:Data[index].ID,
                    title:Data[index].title,
                }
                countries.push(obj)
            }
            dispatch({ type: 'COUNTRIES_SUCCESS', payload: countries })
            }).catch(function (error) {
                    dispatch({ type: 'COUNTRIES_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'COUNTRIES_FAILED', payload: "Something went wrong" })
        }
       } else {
        dispatch({ type: 'COUNTRIES_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const GetAllCities = (ID) => {
    return async (dispatch) => {
        dispatch({ type: 'CITIES_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/GetCitiesAR',{
               params:{
                   id:1,
                   countryID: ID
               }
            }).then(function (response) {
                const Data = response.data;
                 const cities = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    id:Data[index].ID,
                    title:Data[index].title,
                }
                cities.push(obj)
            }
            dispatch({ type: 'CITIES_SUCCESS', payload: cities })
            }).catch(function (error) {
                    dispatch({ type: 'CITIES_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'CITIES_FAILED', payload: "Something went wrong" })
        }
       } else {
        dispatch({ type: 'CITIES_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const GetAllCarType = () => {
    return async (dispatch) => {
        dispatch({ type: 'CARTYPE_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/GetCarTypes',{
               params:{
                   id:1
               }
            }).then(function (response) {
                const Data = response.data;
                 const carTypes = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    id:Data[index].ID,
                    title:Data[index].title,
                }
                carTypes.push(obj)
            }
            dispatch({ type: 'CARTYPE_SUCCESS', payload: carTypes })
            }).catch(function (error) {
                    dispatch({ type: 'CARTYPE_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'CARTYPE_FAILED', payload: "Something went wrong" })
        }
       } else {
        dispatch({ type: 'CARTYPE_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const GetAllMaterials = () => {
    return async (dispatch) => {
        dispatch({ type: 'GETMATERIALS_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/GetMaterials',{
               params:{
                   id:1
               }
            }).then(function (response) {
                const Data = response.data;
                 const materials = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    id:Data[index].ID,
                    title:Data[index].title,
                }
                materials.push(obj)
            }
            dispatch({ type: 'GETMATERIALS_SUCCESS', payload: materials })
            }).catch(function (error) {
                    dispatch({ type: 'GETMATERIALS_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'GETMATERIALS_FAILED', payload: "Something went wrong" })
        }
       } else {
        dispatch({ type: 'GETMATERIALS_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const AddRequest = (obj) => {
    return async (dispatch) => {
        dispatch({ type: 'ADDREQUEST_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/AddReques',{
                date: obj.date,
                time: obj.time,
                createdBy: obj.createdBy,
                carTypeID: obj.carTypeID,
                comment: obj.comment,
                CountryIDFrom: obj.CountryIDFrom,
                CityIDFrom: obj.CityIDFrom,
                maturalID: obj.maturalID,
                addeddate: obj.addeddate,
                CountryIDTo: obj.CountryIDTo,
                CityIDTo: obj.CityIDTo,
                CID: obj.CID,
                brunchID: obj.brunchID

            }).then((response)=> {
                if(response.data){
                    dispatch({ type: 'ADDREQUEST_SUCCESS'})
                }
            }).catch((error)=> {
                    dispatch({ type: 'ADDREQUEST_FAILED', payload: error.message })
                    dispatch({ type: 'ADDREQUEST_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'ADDREQUEST_FAILED', payload: "Something went wrong" })
        }
       } else {
        dispatch({ type: 'ADDREQUEST_FAILED', payload: "No internet connection" })
       }
     });
    }
}
export const GetOrders = (id) => {
    return async (dispatch) => {
        dispatch({ type: 'GETORDERS_ATTEMP' })
        NetInfo.fetch().then(state =>{
            if (state.isConnected){
        try {
            axios.get('http://elnamla.ants.sa/api/Client/GetClientRequests',{
               params:{
                   id
               }
            }).then(function (response) {
                const Data = response.data;
                 const orders = []
            for (let index = 0; index < Data.length; index++) {
                var obj = {
                    ID:Data[index].ID,
                    date:Data[index].date,
                    carType:Data[index].carType,
                    comment:Data[index].comment,
                    CountryFrom:Data[index].CountryFrom,
                    CityFrom:Data[index].CityFrom,
                    material:Data[index].material,
                    status:Data[index].status,
                    cost:Data[index].cost,
                    addeddate:Data[index].addeddate,
                    CountryTo:Data[index].CountryTo,
                    cityTO:Data[index].cityTO,
                }
                orders.push(obj)
            }
            dispatch({ type: 'GETORDERS_SUCCESS', payload: orders })
            }).catch(function (error) {
                    dispatch({ type: 'GETORDERS_FAILED', payload: error.response.data.message })
            }).finally(function () {
                // always executed
            });
        } catch (error) {
            dispatch({ type: 'GETORDERS_FAILED', payload: "Something went wrong" })
        }
       } else {
        dispatch({ type: 'GETORDERS_FAILED', payload: "No internet connection" })
       }
     });
    }
}

