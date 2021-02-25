import React, { useState } from 'react'
import { View, TextInput, Image, Button, ActivityIndicator, Modal,Text, TouchableOpacity } from 'react-native'

import firebase from 'firebase'
// import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/firebase-storage")
import Colors from '../Constants'

export default function Save(props) {
    const [caption, setCaption] = useState("")
    const [progress , setProgress] = useState('');

    const uploadImage = async () => {
        const uri = props.route.params.image;
        console.log(uri);
        const childPath = `post/${firebase.auth().currentUser.uid}}`;
        console.log("child path",childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = firebase
            .storage()
            .ref()
            .child(childPath)
            .put(blob);

        const taskProgress = snapshot => {
            var progres = ((snapshot.bytesTransferred/snapshot.totalBytes) *100).toFixed(0);
            // console.log(`transferred: ${snapshot.bytesTransferred}`)
            setProgress(progres)
            console.log("progress",progres);
            console.log('progressfrom usestate', progress);
           
        }

        // console.log(progress);

        const taskCompleted = () => {
            task.snapshot.ref.getDownloadURL().then((snapshot) => {
                savePostData(snapshot);
                console.log("only snap",snapshot)
            })
        }

        const taskError = snapshot => {
            console.log(snapshot)
        }

        task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    const savePostData = (downloadURL) => {
        console.log("url", downloadURL);
        firebase.firestore()
            .collection('posts')
            .doc(firebase.auth().currentUser.uid)
            .collection("userPosts")
            .add({
                downloadURL,
                caption,
                likesCount: 0,
                creation: firebase.firestore.FieldValue.serverTimestamp()
            }).then((function () {
                props.navigation.popToTop()
            }))
    }
    // console.log(props);
    return (
        <View style={{ flex: 1,margin:'3%' }}>
            <View style={{flexDirection:'row-reverse',justifyContent:"space-between",alignItems:'flex-end'}}>
            <Image source={{ uri: props.route.params.image}} style={{width:100,height:100}}/>

                <TextInput
                    style={{borderBottomColor:'gray',borderBottomWidth:1,width:'65%'}}
                    placeholder="Write a Caption . . ."
                    onChangeText={(caption) => setCaption(caption)}
                />
            </View>
            

            <TouchableOpacity 
            style={{backgroundColor:Colors.button,padding:'3%',marginTop:'3%',borderRadius:10,}}
            onPress={() => uploadImage()}>
                <Text style={{textAlign:'center',color:Colors.white,fontWeight:'800'}}> Upload </Text>
            </TouchableOpacity>
        </View>
    )
}