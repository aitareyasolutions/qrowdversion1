import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { View, Text, ActivityIndicator } from 'react-native'
import * as firebase from 'firebase'


import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'
const store = createStore(rootReducer, applyMiddleware(thunk))

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB2cJODtRvmXmt6jwoq-cdSSDfpqRZ2ISg",
  authDomain: "qrowd1-6ac8f.firebaseapp.com",
  projectId: "qrowd1-6ac8f",
  storageBucket: "qrowd1-6ac8f.appspot.com",
  messagingSenderId: "1009922320769",
  appId: "1:1009922320769:web:861ac232a9066dae396080",
  measurementId: "G-ZTCP1TPYS3"
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig)
}

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import LandingScreen from './components/auth/Landing'
import RegisterScreen from './components/auth/Register'
import LoginScreen from './components/auth/Login'
import Main from './components/Main';
import ForgotPassword from './components/auth/ForgotPassword';
import AddScreen from './components/main/Add';
import SaveScreen  from './components/main/Save';
import Savevideo  from './components/main/Savevideo';
import CommentScreen from './components/main/Comment';
import EditProfile from './components/main/EditProfile'
import Search from './components/main/Search';
import Followerlist from './components/main/Followerlist';




const Stack = createStackNavigator();


export class App extends Component {
  constructor(props) {
    super()
    this.state = {
      loaded: false,
    }
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true,
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true,
        })
      }
    })
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center',alignItems:'center' }}>
          <ActivityIndicator 
            size='large'
          />
        </View>
      )
    }

    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Landing">
            <Stack.Screen name="Landing" component={LandingScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword}/>
           
          </Stack.Navigator>
        </NavigationContainer>
      );
    }

    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Main" component={Main}  options={{headerShown:false}}/>
            <Stack.Screen name="Add" component={AddScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Save" component={SaveScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Savevideo" component={Savevideo} navigation={this.props.navigation}/>
            <Stack.Screen name="Comment" component={CommentScreen} navigation={this.props.navigation}/>
            <Stack.Screen name="Search"component={Search} navigation={this.props.navigation} />
            <Stack.Screen name="EditProfile"component={EditProfile} navigation = {this.props.navigation} />
            <Stack.Screen name="Followerlist" component={Followerlist} navigation = {this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
     </Provider>
    )
  }
}

export default App




