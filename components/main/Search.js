import React, { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity,StyleSheet } from 'react-native'

import color from '../Constants'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


import firebase from 'firebase';
require('firebase/firestore');

export default function Search(props) {
    const [users, setUsers] = useState([])

    const fetchUsers = (search) => {
        firebase.firestore()
            .collection('users')
            .where('displayName', '>=', search)
            .get()
            .then((snapshot) => {
                let users = snapshot.docs.map(doc => {
                    const data = doc.data();
                    const id = doc.id;
                    return { id, ...data }
                });
                setUsers(users);
            })
    }
    return (
        <View>
            
            <View style={styles.inputcontainer}>
                
                        
                <MaterialCommunityIcons name="magnify" size={28} color="black" />
                    <TextInput
                       placeholder="Type Here..."
                       onChangeText={(search) => fetchUsers(search)}    
                       style={styles.input}
                       keyboardType="default"
                       autoCompleteType="off"
                    />
            </View>
            
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={{backgroundColor:'#fff',marginHorizontal:10,marginVertical:5,paddingHorizontal:10,paddingVertical:15,borderRadius:10}}
                        onPress={() => props.navigation.navigate("Profile", {uid: item.id})}>
                        <Text style={{fontSize:16,}}>{item.displayName}</Text>
                    </TouchableOpacity>

                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    inputcontainer:{
        flexDirection:'row',
        // width:'100%',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingHorizontal:20,
        paddingVertical:'2%',
        // margin: 20,
        marginHorizontal:'3%',
        marginVertical:'1%',
        borderRadius:30,
        borderWidth:1,
        borderColor:'gray',
        backgroundColor:color.cardcolor
    },
    input:{
        width:'100%',
        paddingLeft:'5%'
        
    }
})