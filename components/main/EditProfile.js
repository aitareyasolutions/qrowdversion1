

import React, { Component } from 'react'
import { StyleSheet, Text, View,TextInput, KeyboardAvoidingView, Button, Keyboard, TouchableOpacity, Image, Modal, Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import color from '../Constants';
import Bottommodal from './Bottommodal';
import * as ImagePicker from 'expo-image-picker';

firebase
import firebase from 'firebase'
require('firebase/firestore')


export default class EditProfile extends Component {
//in the props im getting the displayName and email and other user info
    constructor(props){
        super(props);
        this.state={
           displayName:this.props.route.params.user.displayName,
           email:this.props.route.params.user.email,
           phonenumber:this.props.route.params.user.phonenumber,
           bio:this.props.route.params.user.bio,
           photoURL:this.props.route.params.user.photoURL,
           modalshow:true,
        //    user:'',
        }
        
        this.handleDisplayName = this.handleDisplayName.bind(this);
        this.handleemail = this.handleemail.bind(this);
        this.handlephoneNumber = this.handlephoneNumber.bind(this);
        this.handleBio = this.handleBio.bind(this);
        this.onHandleChanges = this.onHandleChanges.bind(this)

        
    }
  handleDisplayName(event) {
    this.setState({displayName:event.nativeEvent.text});
  }
  handleemail(event) {
    this.setState({email:event.nativeEvent.text});
    // console.log(event);
  }
  handlephoneNumber(event) {
    this.setState({phonenumber:event.nativeEvent.text});
    // console.log(event);
  }
  handleBio(event) {
    this.setState({bio:event.nativeEvent.text});
    // console.log(event);
  }

  onHandleChanges (){
    const {email,displayName,bio,phonenumber,photoURL} = this.state
    if(displayName === '' && email === '' && phonenumber === '' && bio === ''  ) {
        alert("fill the input fileds")
    } 
    else if(displayName.length > 5 && phonenumber.length >= 10 && bio.length > 5 ) {
        var user = firebase.auth().currentUser;
        user.updateProfile({
            displayName:this.state.displayName,
            email:this.state.email
    }).then((result) => {
        firebase.firestore().collection("users")
        .doc(user.uid)
        .set({
            displayName,
            email,
            bio,
            phonenumber,
            photoURL

        })
        alert({result})
    })
    .catch((e) => {
        alert("fill the blanks")
    })

    }
    



  }

    render() {
        // const namelength = this.state.displayName
        // console.log(namelength.length);
        console.log(this.props);
//   console.log('currentuser',this.state.user);
        // const {displayName,email} = this.state.user

        let popupRef = React.createRef() 

        const onshowpopup = () => {
            popupRef.modalOpen()
        }
        
        const onClosePopup = () => {
            popupRef.modalClose() 
         }

       const takephoto = () => {
        return (
            <View>
                
           </View>
        )
        }

        const pickImage = async () => {
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              aspect: [1, 1],
              quality: 0.1,
            });
            console.log(result);
        
            if (!result.cancelled) {
                this.setState({photoURL:result.uri})
                
            //   setImage(result.uri);
              // navigation.navigate('Save', {image})
            }
          };

        return (

        <>
            

            <KeyboardAvoidingView 
          
          behavior={Platform.OS == "ios" ? "padding" : null} 
          keyboardVerticalOffset={Platform.select({ ios: 60, android: 78 })}
          onPress={
            () =>{
                Keyboard.dismiss()
            }
          }
          // this makes the input to be focused when the keyboard pops up 
          style={{ flex: 1,marginHorizontal:'5%' }}
          
          >
            <ScrollView 
            showsVerticalScrollIndicator={false} // to hide the scrollbar visible
            >              
              {/* user profile picture with upload options */}
            {/* <Text>{this.state.displayName}</Text> */}
              
              <Text style={{fontSize:16,fontWeight:'600',marginVertical:'3%'}}>Edit your profile picture that helps 
                       your friends to know you easily</Text>

              <View >
                    <Image 
                      style={styles.profileimage}
                      source={{uri:this.state.photoURL}}
                    />
                    <TouchableOpacity 
                    onPress={ onshowpopup }
                    >
                        <Text style={{color:color.welcomebgcolor,fontWeight:'bold',fontSize:16,textAlign:'center',marginVertical:'2%',textDecorationLine:'underline',textDecorationColor:color.welcomebgcolor}}>Change profile photo</Text>
                    
                    </TouchableOpacity>
                    <Bottommodal
                        ref={(target) => popupRef = target}
                        onTouchOutSide = {onClosePopup}
                        onCancel = {onClosePopup}
                        onTakephoto = {takephoto}
                        pickImage = {pickImage}

                    />
   
              </View>
                {/* user View detials  */}
                <View style={{}}>
                    <Text style={{fontWeight:'600',fontSize:20,textAlign:'center',marginVertical:'2%'}}>Tell about yourself</Text>
                    <TextInput 
                        placeholder="Full name"
                        name="fullname"
                        onChange={this.handleDisplayName} 
                        style={styles.input}
                        // value={user.name}
                        value={this.state.displayName} 
                    />
                    {/* <Text>{this.state.displayName}</Text> */}
                    <View  style={[styles.input , {flexDirection:"row",justifyContent:"space-between",alignItems:'center'}]} >
                        <TextInput 
                            placeholder="Email -id"
                            // value={state.userEmail}
                            onChange={this.handleemail} 
                            keyboardType="email-address"
                            value={this.state.email}
                           
                        />
                        <Text style={{color:'#5e2410'}}>Verify</Text>
                    </View>
                    
                    <View  style={[styles.input , {flexDirection:"row",justifyContent:"space-between",alignItems:'center'}]} >
                        <TextInput 
                            placeholder="Phone number"
                            onChange={this.handlephoneNumber} 
                            keyboardType="phone-pad"
                           value={this.state.phonenumber}
                        />
                        <Text style={{color:'#5e2410'}}>Verify</Text>
                    </View>
                    <TextInput 
                        placeholder="Tell about yourself"
                        onChange={this.handleBio} 
                        value={this.state.bio}
                        multiline={true}
                        style={styles.input} 
                        // maxLength={50}
                    />
                        
                <TouchableOpacity 
                style={{backgroundColor:'#EE5859',paddingVertical:'4%',borderRadius:20,marginTop:'2%'}}
                onPress={() => {
                  this.onHandleChanges()
                }}
                >
                     <Text 
                     style={{color:'#fff',fontWeight:'600',textAlign:'center'}}>Update Profile</Text>
                </TouchableOpacity>
                </View>
                {/* submit button */}
                {/* <Button title="log" onPress={()=> takephoto()}/> */}
            </ScrollView>
          </KeyboardAvoidingView>
        </>
        )
    }
}
const styles =StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:'5%',
        justifyContent:'flex-end'
    },
    input:{
        padding:'4%',
        borderColor:color.welcomebgcolor,
        borderWidth:StyleSheet.hairlineWidth,
        marginVertical:'2%',
        borderRadius:20,
    },
    profileimage:{
        width:120,
        height:120,
        borderRadius:10,
        alignSelf:'center',
        borderWidth:3,
        borderColor:'gray'
    },
})
