import React, { Component } from 'react'
import { View, Button,
     TextInput,Text,
      TouchableOpacity,
      StyleSheet,
    //    ScrollView,
       Dimensions,
        Keyboard,
         ScrollView,
         Platform,
         Alert,
         ActivityIndicator
        } from 'react-native'
import { Feather} from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase'
import Colors from  '../Constants'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
const WindowHeight = Dimensions.get("window") ;

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: true,
            displayName: '',
            errormessage:'',
            showPassword:true,
            photoURL:"",
            bio:'',
            phonenumber:''
        }

        this.onSignUp = this.onSignUp.bind(this)
    }
    
    onSignUp() {
    
        const { email,password,displayName,phonenumber,bio,photoURL} = this.state;
        console.log(password.length);
       try{ 
           if(password.length < 6) {
            this.setState({errormessage:'password is small'})
        }else{
            alert("we are setting up your profile")
            firebase.auth().createUserWithEmailAndPassword(
                email,
                password,             
                 )

                .then((result) => {
                    
                    firebase.firestore().collection("users")
                        .doc(firebase.auth().currentUser.uid)
                        .set({
                            displayName,
                            email, 
                            phonenumber,
                            bio,
                            photoURL:'https://i.stack.imgur.com/l60Hf.png',
    
                    })
                    alert(" your profile has been set")
                })
        }

       }

       catch{
           alert("sign up again")
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
                    style={styles.container}> 
                
                    
                        <View style={{flex:1}}>
                            <Text style={styles.title}>Qrowd.fit</Text>
                        </View>
                        <View style={{flex:1}}>
                            
                        <Text style={styles.subtext}>Sign up manually</Text>
                        
                            <Text style={{color:'red',fontWeight:'bold'}}>
                            {this.state.errormessage} 
                            </Text>
                        {/* user profile  */}

                            <View style={styles.inputcontainer}>
                            <AntDesign name="user" size={24} color="black" />
                                <TextInput 
                                    placeholder="enter your displayName"
                                    // keyboardAppearance="light"
                                    autoCompleteType="name"
                                    autoCapitalize="none"
                                    keyboardType="default"
                                    style={styles.input}
                                    onChangeText={(displayName) => this.setState({ displayName })}

                            />
                                
                        </View>
                        <View style={styles.inputcontainer}>
                        <AntDesign name="mail" size={24} color="black" />
                            <TextInput 
                                placeholder="enter your email"
                                // keyboardAppearance="light"
                                autoCompleteType="email"
                                autoCapitalize="none"
                                keyboardType="email-address"
                                style={styles.input}
                                onChangeText={(email) => this.setState({ email })}
                            />
                            
                        </View>
                            {/* <TextInput
                                placeholder="displayName"
                                onChangeText={(displayName) => this.setState({ displayName })}
                                
                            /> */}
                            {/* <TextInput
                                placeholder="email"
                            
                            /> */}

                        <View style={styles.inputcontainer}>
                        <Feather name={this.state.showPassword ?'eye-off' : 'eye'} size={20} color="black"
                            onPress={()=>{
                            this.toggleSwitch()
                             }}
                        />
                             <TextInput 
                                 placeholder="enter your Password"
                                 keyboardType="visible-password"
                                 style={styles.input}
                                 secureTextEntry={this.state.showPassword}
                                 onChangeText={(password) => this.setState({ password })}
                            />
                        
                    </View>

                            <TouchableOpacity
                                onPress={() => this.onSignUp()}
                                style={styles.registerButton}
                            >
                                <Text style={styles.registerButtonText}> Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    
                        <View style={{marginTop:20}}>
                            <TouchableOpacity 
                                onPress={() =>{this.props.navigation.navigate("Login")}}
                                    // for navigating to other page i have used the props 
                            >
                                <Text style={{textAlign:'center',fontSize:16,fontWeight:'500'}}>Already have an account ? 
                                <Text style={{ color:Colors.welcomebg,fontSize:16,fontWeight:'700',textDecorationLine:'underline'}}> Sign in</Text></Text>
                            </TouchableOpacity>
                        </View>
                    
                    </KeyboardAwareScrollView>
       
           
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:'5%',
        paddingVertical:"5%",
        // height:'100%',
    },
    inputcontainer:{
        
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        paddingHorizontal:10,
        borderWidth:1,
        borderColor:'#000',
        borderRadius:30,
        marginVertical:'3%'
    },
    input:{
        width:'93%',
        paddingVertical:10,
        paddingHorizontal:10,
    },
    registerButton:{
        marginVertical:'5%',
        backgroundColor:Colors.button,
        paddingVertical:'3%',
        borderRadius:10,
        elevation:10,
        shadowColor:Colors.button,
        shadowRadius:5,
        shadowOpacity:0.3,
        shadowOffset:{
            width:10,
            height:10,
        },

    },
    registerButtonText:{
        fontSize:15,
        color:Colors.white,
        fontWeight:'bold',
        textAlign:'center'
    },
    subtext:{
        textAlign:'center',
        fontSize:17,
        fontWeight:'600',

    },
    title:{
        fontSize:WindowHeight.height < 600 ? 34  : 40,
        fontWeight:'bold',
        marginVertical:"2%",
        textAlign:'center'
        // marginLeft:10,
    },

    }
)

export default Register