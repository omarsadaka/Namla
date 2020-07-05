const initialState = {
    Processing: false,
    Message: null,
    User: null,
    UserData :null,
    Countries:[],
    Cities:[],
    CarTypes:[],
    Materials:[],
    Orders:[]
}
 

export default (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_ATTEMP':
            return {
                ...state,
                Message: null,
                Processing: true
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                Processing: false,
                User: {
                    ID: action.payload.ID ,
                    fullname: action.payload.fullname,
                    brunchID: action.payload.brunchID ,
                    userType: action.payload.userType,
                },
                Message: "Login Done",
            }
        case 'LOGIN_FAILED':
            return {
                ...state,
                Processing: false,
                Message: action.payload
            }

        case 'LOGOUT_ATTEMP':
            return { ...state, Processing: true, Message: null, }
        case 'LOGOUT_SUCCESS':
            return { ...state, Processing: false, User: null, Message: null, }
        case 'LOGOUT_FAILED':
            return { ...state, Processing: false, Message: action.payload }

        case 'REGISTER_ATTEMP':
            return {
                ...state,
                Message: null,
                Processing: true,
            }
        case 'REGISTER_SUCCESS':
            return {
                ...state,
                Processing: false,
                Message: "Register Done",
            }
        case 'REGISTER_FAILED':
            return { ...state, Processing: false, Message: action.payload }
        case 'LOADING_USER':
            return {
                ...state,
                Message: null,
                Processing: action.payload,
            }
        case 'UPDATEUSER_ATTEMP':
             return { ...state, Processing: true, Message: null, }
        case 'UPDATEUSER_SUCCESS':
             return { ...state, Processing: false, Message: 'Update User Done'}
        case 'UPDATEUSER_FAILED':
             return { ...state, Processing: false, Message: action.payload }
        case 'FORGETPWD_ATTEMP':
             return { ...state, Processing: true, Message: null, }
        case 'FORGETPWD_SUCCESS':
             return { ...state, Processing: false, Message: 'Forget Pwd Done'}
        case 'FORGETPWD_FAILED':
             return { ...state, Processing: false, Message: action.payload }
        case 'USERPROFILE_ATTEMP':
            return { ...state, Processing: true, Message: null, }
        case 'USERPROFILE_SUCCESS':
            return { ...state, 
                Processing: false,
                UserData: {
                    id: action.payload.id ,
                    first_name: action.payload.first_name,
                    last_name: action.payload.last_name,
                    email: action.payload.email,
                    photo: action.payload.photo,
                    phone: action.payload.phone,
                    points: action.payload.points,
                    city: action.payload.city,
                    lon: action.payload.lon,
                    lat: action.payload.lat,
                    user_type: action.payload.user_type,
                },
                 Message: 'Get Profile Done'}
        case 'USERPROFILE_FAILED':
            return { ...state, Processing: false, Message: action.payload }  
        case 'COUNTRIES_ATTEMP':
            return { ...state ,Message: null}
        case 'COUNTRIES_SUCCESS':
            return { ...state, Processing: false, Countries: action.payload}
        case 'COUNTRIES_FAILED':
            return { ...state, Message: action.payload }       
        case 'CITIES_ATTEMP':
            return { ...state ,Message: null}
        case 'CITIES_SUCCESS':
            return { ...state, Processing: false, Cities: action.payload}
        case 'CITIES_FAILED':
            return { ...state, Message: action.payload }
        case 'CARTYPE_ATTEMP':
            return { ...state ,Message: null}
        case 'CARTYPE_SUCCESS':
            return { ...state, Processing: false, CarTypes: action.payload}
        case 'CARTYPE_FAILED':
            return { ...state, Message: action.payload }
        case 'GETMATERIALS_ATTEMP':
            return { ...state ,Message: null}
        case 'GETMATERIALS_SUCCESS':
            return { ...state, Processing: false, Materials: action.payload}
        case 'GETMATERIALS_FAILED':
            return { ...state, Message: action.payload }
        case 'ADDREQUEST_ATTEMP':
             return { ...state, Processing: true, Message: null, }
        case 'ADDREQUEST_SUCCESS':
            return { ...state, Processing: false, Message: 'Add Request Done'}
        case 'ADDREQUEST_FAILED':
            return { ...state, Processing: false, Message: action.payload }
        case 'GETORDERS_ATTEMP':
            return { ...state , Message: null}
        case 'GETORDERS_SUCCESS':
            return { ...state, Orders: action.payload}
        case 'GETORDERS_FAILED':
            return { ...state, Message: action.payload }
        default:
            return state
    }
};