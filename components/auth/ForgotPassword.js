import React,{useState} from 'react'
import { View, Text,StyleSheet, Image, TextInput, Keyboard, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import color from '../Constants';
import * as firebase from 'firebase'

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



const ForgotPassword = () => {

  
    const [email, setEmail] = useState('');
    const [showLoading, setShowLoading] = useState(false);

    var auth = firebase.auth();
    var emailAddress = email;
    

const reset = (emailAddress) => {
        firebase.auth().sendPasswordResetEmail(emailAddress)
          .then(function () {
            alert('Please check your email id ...')
            // if sucess the it has to navigate to next page and there an  button saying go back to login after setting 
            // your password
          }).catch(function (e) {
            alert('enter valid email',e)
          })
      }

    return (
        <KeyboardAwareScrollView
       
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        onPress={()=>{
            Keyboard.dismiss();
        }}
      >  
        <View
        
        style={{flex:1,justifyContent:'space-between'}}>
           
            <Text style={styles.title}>Forgot Password</Text>
            <View style={{alignSelf:'center'}}>
                <Image 
                style={styles.image}
                source={require('../../assets/email1.png')} />
            </View>
            <Text style={{fontSize:18,letterSpacing:1,marginHorizontal:'5%'}}>Enter your registerded E-mail id to 
                    reset your password</Text>
            <View>
                <TextInput 
                placeholder="Email id"
                style={styles.input}
                onChangeText={text => setEmail(text)}
                value={email}
                />
                <TouchableOpacity 
                style={styles.registerButton}
                onPress={() =>{
                    reset(emailAddress)
                }}
                >
                    <Text style={{fontSize:16,fontWeight:'bold',color:color.white,textAlign:'center'}}>Submit</Text>
                </TouchableOpacity>
            </View>
      
        </View> 
        </KeyboardAwareScrollView>
    )
}
const styles = StyleSheet.create({
   
    input:{
        borderColor:'#252525',
        borderWidth:1,
        marginVertical:15,
        marginHorizontal:'5%',
        padding:10,
        borderBottomRightRadius:25,
        borderTopRightRadius:5,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5,
    },
    registerButton:{
        backgroundColor:color.buttoncolor2,
        padding:'4%',
        // marginVertical:'5%',
        marginHorizontal:'5%',
        borderRadius:50,
        elevation:10,
        marginBottom:'20%'
    },
    title:{
        marginTop:'2%',
        fontSize:24,
        fontWeight:'bold',
        textAlign:'center'
    }
})
export default ForgotPassword
