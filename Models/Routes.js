import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import SplashScreen from './Components/SplashScreen';
import ChooseLanguage from './Components/ChooseLanguage';
import Login from './Components/Login';
import Register from './Components/Register';
import HomeRoutes from './Components/HomeRoutes';
import ChangeLang from './Components/Home/ChangeLang'




const Routes = createStackNavigator(
   {
      SplashScreen: {
         screen: SplashScreen,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      ChooseLanguage: {
         screen: ChooseLanguage,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      Login: {
         screen: Login,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      Register: {
         screen: Register,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
     
      HomeRoutes: {
         screen: HomeRoutes,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
      ChangeLang: {
         screen: ChangeLang,
         navigationOptions: ({ navigation }) => ({
            header: null,
         }),
      },
     
     
   },
   {
      initialRouteName: "SplashScreen"
   }
);

const AppContainer = createAppContainer(Routes);

export default AppContainer;