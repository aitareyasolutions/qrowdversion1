import React,{useState,useEffect}from 'react'
import { Text, View, TouchableOpacity,StyleSheet, Image,Dimensions, Platform } from 'react-native';


import color from '../Constants'



const WindowHeight = Dimensions.get("window") 


console.log(WindowHeight.height);

export default function Landing({ navigation }) {
    
  const [dimensions, setDimensions] = useState({ window });

  const onChange = ({ window}) => {
    setDimensions({ window});
  };

  useEffect(() => {
    Dimensions.addEventListener('change', onChange);
    
    return () => {
      Dimensions.removeEventListener('change', onChange);
     
    };
  });
    return (
        

       
            <View style={styles.container}>
                <View  style={styles.imageContain}>
                    <Image
                    source = {require('../../assets/welcome.png')}
                    style={styles.image}
                    />
                </View>
                
                <View>
                    <Text style={styles.text}>The simplest </Text>
                    <Text style={styles.text}>way to share </Text>
                    <Text style={styles.text}>your moment ! </Text>
                   
                    
                </View>

                
            <View style={styles.buttons}>
                <TouchableOpacity
                    style={styles.registerButton1}
                        onPress={() => navigation.navigate("Register")} >
                            <Text style={styles.textColor}> Register</Text>
                </TouchableOpacity>

                <TouchableOpacity
                        style={styles.loginbutton}
                        onPress={() => navigation.navigate("Login")}>
                        <Text style={styles.textColor} > Login</Text>
                </TouchableOpacity>
            </View>
                

               
            </View>
           
     
    )
}

const styles = StyleSheet.create({
    buttons:{
        marginBottom:'10%',
    },
    container:{
        flex: 1,
        justifyContent:'space-between',
        paddingHorizontal:'10%',
        backgroundColor:color.welcomebg,
        paddingTop : Platform.OS === 'android'?  40 : 20 ,
     
    },
    // imageContain:{
    //    height: 300,
       

    // },
    image:{
        width:'100%',
        resizeMode:'contain',
        height:WindowHeight.height < 600 ? 280  : 350 ,
    
    },
    loginbutton:{
        backgroundColor:color.button,
        padding: 15,
        borderRadius:20,
       
    },
    registerButton1:{
        backgroundColor:color.buttoncolor2,
        padding: 15,
        borderRadius:20,
        marginVertical:'5%',
    },
    text:{
        fontSize: WindowHeight.height < 600 ? 20 : 30,
        color:color.white,
        fontWeight:'700',
    },
    textColor:{
       color:color.white,
       textAlign:'center',
        fontSize:17,
        fontWeight:'bold'
    }
    

})









