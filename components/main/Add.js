import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image,TouchableOpacity } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons, MaterialCommunityIcons,Entypo  } from '@expo/vector-icons';
import Colors from '../Constants'

export default function Add({ navigation }) {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(null);
  const[mediatype , setMeddiaType] = useState(null)
  const[video,setVideo] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash,setFlash] = useState(Camera.Constants.FlashMode.off);
  const [focus,setFocus] = useState(Camera.Constants.AutoFocus.on);
  const [whBalance ,setWhBalance] = useState('');

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');

      const galleryStatus = await ImagePicker.requestCameraRollPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');


    })();
  }, []);

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync({
        // ratio:{4:3},
        quality:0.1,
        allowsEditing:true,
      });
      setImage(data.uri);
      // console.log(image)
    
    }
      // navigation.navigate('Save', { image })
  }

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.1,
      type: 'image',
    });
    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setMeddiaType("image")
      // navigation.navigate('Save', {image})
    }
    console.log(image,mediatype);
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      aspect: [1, 1],
      quality: 0.1,
      type: 'video',
    });
    // console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setMeddiaType('video')
    //  await navigation.navigate('Savevideo', {video})
      console.log(image,mediatype);
    }
  };

   const recordVideo = async () => {
     alert(" recording ...")
   }





  if (hasCameraPermission === null || hasGalleryPermission === false) {
    return <View />;
  }
  if (hasCameraPermission === false || hasGalleryPermission === false) {
    return <Text>No access to camera</Text>;
  }
  
console.log(image);
  return (
    <>
      {
        image === null  ?
        // if image is not set or not taken or not chosen this code should work  
          <>
              <View style={{backgroundColor:'#fff',flexDirection:'row',justifyContent:'space-between',paddingVertical:'5%',alignItems:'center',paddingHorizontal:'10%'}}>
      <View>
          <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}> 
                <MaterialCommunityIcons name="rotate-3d-variant" size={30} color='#000' />
          </TouchableOpacity>
        </View>
        <View>
             <TouchableOpacity 
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.off 
                  ? Camera.Constants.FlashMode.on 
                  : Camera.Constants.FlashMode.off     
                )
                }}>
              <MaterialCommunityIcons name={ flash === Camera.Constants.FlashMode.off ? 'flash-off' : 'flash'} size={30} color="#000" />

            </TouchableOpacity>
        </View>
      </View>
     
      <View style={styles.cameraContainer}>
             <Camera
              ref={ref => setCamera(ref)}
              style={styles.fixedRatio}
              type={type}
              ratio={'1:1'}
              flashMode = {flash}
              whiteBalance={Camera.Constants.WhiteBalance.shadow}
              // zoom={camera.Constants.zoom}
              />
      </View>
      
      <View style={{flexDirection:'row',justifyContent:'space-around',alignItems:'center', marginBottom:'2%',paddingTop:'1.5%'}}>
          <View> 
            <TouchableOpacity
            onPress={() => pickImage()}
            >
              <Entypo name="folder-images" size={30} color="#212121f0" />
                {/* <Text> </Text> */}
            </TouchableOpacity>
          </View>
          <View >        
                <TouchableOpacity 
                onLongPress = {() => recordVideo()}
                onPress={() => takePicture()} >
                  <Ionicons name="ios-aperture" size={46} color="black"/>
                </TouchableOpacity>
          </View>
          <View >        
                <TouchableOpacity onPress={ () => pickVideo()}>
                    <MaterialCommunityIcons name="video" size={30} color="black" />
                </TouchableOpacity>
          </View>
      </View>
      
          </>
         : 
         <>
            {/* if the image is taken or choosen these code will work  */}
              <Image source={{ uri: image }} style={{ flex: 1,width:'98%',alignSelf:'center',resizeMode:"contain" }} /> 
              <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                style={{borderColor:Colors.button,padding:10,margin:10,borderWidth:StyleSheet.hairlineWidth,width:"40%"}}
                onPress={() => {
                  setImage(null)
                }}>
                   <Text style={{textAlign:'center',color:Colors.button}}> cancel </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{backgroundColor:Colors.welcomebg,margin:10,padding:10,width:'40%'}}
                    onPress= {() =>  navigation.navigate('Save', {image})}
                  >
                    <Text style={{color:Colors.white,textAlign:'center'}}> Next </Text>
                </TouchableOpacity>
              </View>            
         </> 
        
      }
      
    
  </>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    // paddingTop:'10%',
    flex: 1,
    // flexDirection: 'row'
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
    // height:'80%'
  }

})