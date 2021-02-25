import React,{useEffect, useState} from 'react'
import { View, Text, FlatList } from 'react-native'
import firebase from 'firebase'
require('firebase/firestore')


const Followerlist = (props) => {
    const [userList, setUserList] = useState([]);
    const [user , setUser] = useState([])
  
    const userlist = props.route.params.userids
    useEffect(() => {
        setUserList(userlist)

        userlist.map((u) => {
            return(
                firebase.firestore()
                .collection("users")
                .doc(u)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
            })
            )
        })
    },[userlist])

    return (
        <>
        {console.log(user)}       
        </>
    )
}

export default Followerlist
