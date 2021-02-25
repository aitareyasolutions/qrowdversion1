import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, Button, TextInput,Image, StyleSheet, TouchableOpacity } from 'react-native'


import firebase from 'firebase'
require('firebase/firestore')

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUsersData } from '../../redux/actions/index'
// import { Colors } from 'react-native/Libraries/NewAppScreen'
import Colors from '../Constants'

function Comment(props) {
    const [comments, setComments] = useState([])
    const [postId, setPostId] = useState("")
    const [text, setText] = useState("")


    console.log("comment props",props);

    useEffect(() => {

        function matchUserToComment(comments) {
            for (let i = 0; i < comments.length; i++) {
                if (comments[i].hasOwnProperty('user')) {
                    continue;
                }

                const user = props.users.find(x => x.uid === comments[i].creator)
                if (user == undefined) {
                    props.fetchUsersData(comments[i].creator, false)
                } else {
                    comments[i].user = user
                }
            }
            setComments(comments)
        }


        if (props.route.params.postId !== postId) {
            firebase.firestore()
                .collection('posts')
                .doc(props.route.params.uid)
                .collection('userPosts')
                .doc(props.route.params.postId)
                .collection('comments')
                .get()
                .then((snapshot) => {
                    let comments = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    matchUserToComment(comments)
                })
            setPostId(props.route.params.postId)
        } else {
            matchUserToComment(comments)
        }
    }, [props.route.params.postId, props.users])


    const onCommentSend = () => {
        firebase.firestore()
            .collection('posts')
            .doc(props.route.params.uid)
            .collection('userPosts')
            .doc(props.route.params.postId)
            .collection('comments')
            .add({
                creator: firebase.auth().currentUser.uid,
                text
            })
    }

    return (
        <View style={{flex:1,marginHorizontal:"2%"}}>
            <FlatList
                numColumns={1}
                horizontal={false}
                data={comments}
                renderItem={({ item }) => (
                    <View style={{borderBottomWidth:1,borderBottomColor:'lightgray'}}>
                        {item.user !== undefined ?
                        <>
                        <View style={{flexDirection:'row',marginTop:"2%",}}>
                            <Image source = {{uri : item.user.photoURL}} style={{width:40,height:40,borderRadius:30,borderWidth:1}}/>
                         
                            <Text style={{marginLeft:'2%',fontWeight:'bold'}}>
                                {item.user.displayName}
                            </Text>
                        </View>
                          
                        </>
                      : null}
                        <Text>{item.text}</Text>
                          
                </View>
                )}
            />

            <View style={{flexDirection:'row',marginBottom:'5%',width:'100%',justifyContent:'space-around'}}>
                <TextInput
                    placeholder='comment...'
                    onChangeText={(text) => setText(text)} 
                    style={{borderWidth:StyleSheet.hairlineWidth,borderColor:'#a9a9a9',width:'75%',height:45,borderRadius:10,paddingLeft:10}}
                    />
                <TouchableOpacity 
                style={{backgroundColor:Colors.button,width:'20%',borderRadius:10}}
                  onPress={() => onCommentSend()}
                >
                    <Text style={{color:Colors.white,textAlignVertical:'center',textAlign:"center",marginTop:'10%'}}>Post</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}


const mapStateToProps = (store) => ({
    users: store.usersState.users
})
const mapDispatchProps = (dispatch) => bindActionCreators({ fetchUsersData }, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Comment);
