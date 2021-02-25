// import React, { Component } from 'react'
// import { View, Button, TextInput,Dimensions } from 'react-native'

// import firebase from 'firebase'
// const WindowHeight = Dimensions.get("window") ;

// export class Login extends Component {
//     constructor(props) {
//         super(props);

//         this.state = {
//             email: '',
//             password: '',
//         }

        // this.onSignUp = this.onSignUp.bind(this)
//     }

   
//     toggleSwitch() {
//         this.setState({ showPassword: !this.state.showPassword });
//     }

     
//     render() {
//         return (
//             <View>
//                 <TextInput
//                     placeholder="email"
//                     onChangeText={(email) => this.setState({ email })}
//                 />
//                 <TextInput
//                     placeholder="password"
//                     secureTextEntry={true}
//                     onChangeText={(password) => this.setState({ password })}
//                 />

//                 <Button
//                     onPress={() => this.onSignUp()}
//                     title="Sign In"
//                 />
//             </View>
//         )
//     }
// }

// export default Login


import React, { Component } from 'react'
import { View, Dimensions, TextInput,TouchableOpacity,Text,StyleSheet,} from 'react-native'
import { Feather } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { AntDesign } from '@expo/vector-icons';
import  color from '../Constants'

// import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from 'react-native/Libraries/NewAppScreen';


const WindowHeight = Dimensions.get("window") ;

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
            showPassword:true,
            errormessage:'',
        }
        
        this.onSignUp = this.onSignUp.bind(this)
    }


    onSignUp() {
        const { email, password } = this.state;
        if(email.length !==0 && password.length > 6){
            try{
                alert("please wait we are logging you in")
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then((result) => {
                    console.log(result)
                })
            }catch{
                this.setState({errormessage:"*** please check your details ***"})
            }
        }else{
            this.setState({errormessage:"*** please check your details ***"})
        }
    }

    toggleSwitch() {
        this.setState({ showPassword: !this.state.showPassword });
    }

      
     
    

    render() {
        return (
          
       

            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={true}
                onPress={()=>{
                    Keyboard.dismiss();
                }}
            >
           
            <View style={styles.container}>

           <View>
                     <Text style={styles.title}>Welcome back to
                     </Text>
                     <Text style={styles.title}>
                      Qrowd.fit</Text>
                </View>
                {/* social login */}
            
                  {/* form */}
                  
                     <View>

                        {/* <Text style={styles.subtext}>OR</Text> */}

                        <Text style={styles.subtext}>Sign in manually</Text>
                        {/* <Text style={styles.errormessage}>{this.state.errormessage}</Text> */}
                        {
                            this.state.errormessage === '' ? null : 
                            <Text style={{color:color.button,textAlign:'center',fontWeight:"bold"}}>{this.state.errormessage}</Text>
                        }
                        <View style={styles.inputcontainer}>
                            <AntDesign name="mail" size={24} color="black"  
                            />
                            <TextInput 
                                placeholder="enter your email"
                                // keyboardAppearance="light"
                                autoCompleteType="email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={styles.input}
                                onChangeText={(email) => this.setState({ email })}xx

                            />
                            
                    </View>
                    <View style={styles.inputcontainer}>
                    <Feather name={this.state.showPassword ?'eye-off' : 'eye'} size={20} color="black"
                        onPress={()=>{
                            this.toggleSwitch()
                        }}
                    />
                        <TextInput 
                            placeholder="enter your Password"
                           
                            style={styles.input}
                            secureTextEntry={this.state.showPassword}
                             onChangeText={(password) => this.setState({ password })}
                        />
                        
                    </View>

                        {/* butonto sign up */}
                        <View>
                            <TouchableOpacity onPress={() =>{this.props.navigation.navigate("ForgotPassword")}}>
                                <Text style={styles.subtext1}>Forgotpassword</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity
                            style={styles.registerButton}
                            onPress={() => this.onSignUp()}
                        >
                            <Text style={styles.registerText}>Sign in</Text>
                        </TouchableOpacity>

                        </View>
                        {/* end of form */}

                                                
           
           
            <TouchableOpacity 
              onPress={() =>{this.props.navigation.navigate("Register")}}
                        // for navigating to other page i have used the props 
                style={{}}>
                <Text style={{textAlign:'center',fontSize:16,fontWeight:'500'}}>Don't have an account ? 
                <Text style={{ color:color.welcomebg,fontSize:16,fontWeight:'700',textDecorationLine:'underline'}}> Sign up</Text></Text>
            </TouchableOpacity>

            </View>
        </KeyboardAwareScrollView>       
       
           
        
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        justifyContent:'space-between',
        
    },
    facebookButton:{
        backgroundColor:color.welcomebgcolor,
        marginHorizontal:'5%',
        padding:10,
        borderRadius:30, 
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center' 
    },
    forgotpassword:{
        alignItems:'flex-end',
        marginHorizontal:'10%',
        marginVertical:'2%'
    },
    googleButton:{
        backgroundColor:color.buttoncolor2,
        marginHorizontal:'5%',
        padding:10,
        borderRadius:30,  
        marginVertical:'2%',
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
    },
    inputcontainer:{
        
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:'#000',
        borderRadius:30,
        marginVertical:'3%',
        marginHorizontal:'5%',
    },
    input:{
        width:'93%',
        paddingVertical:10,
        paddingHorizontal:10,
    },
    registerButton:{
        backgroundColor:color.button,
        padding:10,
        marginVertical:'5%',
        marginHorizontal:'5%',
        borderRadius:10,
        elevation:10,
    },
    registerText:{
        color:'#fff',
        fontSize:19,
        fontWeight:'bold',
        textAlign:'center'
    },
    subtext:{
        textAlign:'center',
        fontSize:17,
        fontWeight:'600',
        marginBottom:'2%'
    },
    subtext1:{
        fontSize:16,
        fontWeight:'800',
        color:color.welcomebgcolor,
        textAlign:'right',
        paddingRight:'10%',
        // textDecorationStyle:
    },
    title:{
        fontSize:WindowHeight.height < 600 ? 34  : 40,
        fontWeight:'bold',
        marginVertical:"2%",
        textAlign:'center'
    },
});
export default Login
