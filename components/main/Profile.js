import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image, FlatList, Button, Platform,TouchableOpacity, Dimensions, } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'


import firebase from 'firebase'
require('firebase/firestore')
import { connect } from 'react-redux'
import Colors from '../Constants'


const dimensions = Dimensions.get("window")
const [windowHeight , windowWidth] =[ dimensions.height , dimensions.width];

function Profile(props) {
    const [userPosts, setUserPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false)
    const [followinglenth,setFollowinglength] = useState ();
    const [ postlength , setpostlength] = useState(0)
    const userCheck = props.route.params.uid !== firebase.auth().currentUser.uid;
    const userid = props.route.params.uid

    useEffect(() => {
        const { currentUser, posts , following} = props;
        
        if (props.route.params.uid === firebase.auth().currentUser.uid) {
            setUser(currentUser)
            setUserPosts(posts)
            setpostlength(posts.length)
            setFollowinglength(following.length)

        }
        else {
            firebase.firestore()
                .collection("users")
                .doc(props.route.params.uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser(snapshot.data());
                    }
                    else {
                        console.log('does not exist')
                    }
            })
            firebase.firestore()
                .collection("posts")
                .doc(props.route.params.uid)
                .collection("userPosts")
                .orderBy("creation", "asc")
                .get()
                .then((snapshot) => {
                    let posts = snapshot.docs.map(doc => {
                        const data = doc.data();
                        const id = doc.id;
                        return { id, ...data }
                    })
                    setUserPosts(posts)
                })
        }

        if (props.following.indexOf(props.route.params.uid) > -1) {
            setFollowing(true);
        } else {
            setFollowing(false);
        }
    }, [props.route.params.uid, props.following])

    const onFollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            // .collection("user")
            // .doc(props.route.params.user)
            .set({})

    }
    const onUnfollow = () => {
        firebase.firestore()
            .collection("following")
            .doc(firebase.auth().currentUser.uid)
            .collection("userFollowing")
            .doc(props.route.params.uid)
            .delete()
    }

    const onLogout = () => {
        firebase.auth().signOut();
    }

    if (user === null) {
        return <View />
    }
  console.log(props);
    return (
        
          <View style={styles.container}>
            {/* header */}
             <View style={styles.header}> 
                <Text style={{fontSize:24,fontWeight:'bold',letterSpacing:1}}>{user.displayName}</Text>
             </View>
            {/* end of header */}
            {/* user information */}
            <View style={styles.containerInfo}>
                <View style={{ flexDirection:'row',justifyContent:'center'}}>
                    {/* image section */}
                    <View style={styles.profilecontainer}>
                        <TouchableOpacity 
                        onPress={() => {
                            userCheck ? null:
                            props.navigation.navigate("EditProfile",{user}) 
                        
                        }}
                        >
                            {/* user image */}
                            <Image
                             source={{uri:user.photoURL}}
                             style={styles.profileimage}/>
                            {
                               userCheck ? null :   
                            
                                <View 
                                    style={{
                                            justifyContent:'center',flexDirection:'row',position:'absolute',
                                            right:windowHeight > 360 ? 13: 10,
                                            bottom:windowHeight > 360 ? 13: 10, 
                                        }}
                                >
                                    <View style={{backgroundColor:Colors.button,width:36,height:36,borderRadius:18}}></View>
                                    <MaterialCommunityIcons name="pencil" size={24} color={Colors.white} 
                                    style={{position:'absolute',textAlignVertical:'center',top:windowHeight > 360 ? 7 : 5}}
                                    />
                                </View>
                            }
                            

                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{alignItems:'center',paddingBottom:'2%'}}>
                     <Text style={styles.username}>{user.displayName}</Text>
                     {/* <Text style={styles.userbio}>userBio</Text> */}
               
                </View>
                
                <View 
                 style={{ 
                    flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',
                    borderTopWidth:StyleSheet.hairlineWidth,borderBottomWidth:StyleSheet.hairlineWidth,
                    borderTopColor:'lightgray',borderBottomColor:'lightgray',marginBottom:'2%',
                    paddingVertical:'1%'
                    }}>
                        <View>
                            <Text style={styles.infotext1}> Posts </Text>
                           <Text style={[styles.infotext1,{textAlign:'center'}]}>{postlength}</Text>
                        </View>
                        <TouchableOpacity 
                        onPress={() => props.navigation.navigate("Followerlist",{userids:props.following,presentid:userid})}
                        >
                            <Text style={styles.infotext1}>Following</Text>
                            <Text style={[styles.infotext1,{textAlign:'center'}]}>{followinglenth}</Text>
                        </TouchableOpacity>
                </View>

               
                {/* <Text >{user.email}</Text> */}

                {/* for other user  */}
                { userCheck ? (
                    <View>
                        {following ? (
                            <TouchableOpacity
                                onPress={() => onUnfollow()}
                                style={ styles.followingButton }
                            >
                                <Text style={styles.followingText}> Following</Text>
                            </TouchableOpacity>
                        ) :
                            (
                                <TouchableOpacity 
                                     onPress={() => onFollow()}
                                     style={ styles.followButton}
                                >
                                    <Text style={styles.followingText}> Follow </Text>
                                </TouchableOpacity>    
                            )}
                    </View>
                ) :
                // if user id matches
                <View style={{ flexDirection:'row',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',flexGrow:1}}>
                    <TouchableOpacity
                    style={styles.Editprofile}
                    onPress={() => props.navigation.navigate("EditProfile",{user})} 
                    >
                        <Text style={{color:Colors.white,textAlign:'center',fontSize:15,fontWeight:"bold",}}> Edit profile</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => onLogout()}
                        style={styles.logoutButton}
                    
                    >   
                        <Text style={styles.logoutButtonText}>Logout</Text>
                    </TouchableOpacity>
                        

                
                </View>
                }
                </View>

            <View style={styles.containerGallery}>
                <FlatList
                    numColumns={3}
                    horizontal={false}
                    data={userPosts}
                    renderItem={({ item }) => (
                        <View
                            style={styles.containerImage}>

                            <Image
                                style={styles.image}
                                source={{ uri: item.downloadURL }}
                            />
                            {/* <Text>{postlength}</Text> */}
                        </View>

                    )}

                />
            </View>
        </View>


    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#fff',
        
    },
    containerInfo: {
        borderTopWidth:StyleSheet.hairlineWidth,
        borderTopColor:'lightgray',
       paddingVertical:10,
       paddingHorizontal:20,

    },
    containerGallery: {
        flex: 1,
    },
    containerImage: {
        flex: 1 / 3,

    },
    Editprofile:{
        width:'46%',
        backgroundColor:Colors.welcomebg,
        paddingVertical:'2%',
        borderRadius:10,
        elevation:10,
        marginVertical:'2%'
    },
    followButton:{
        width:'100%',
        backgroundColor:Colors.button,
        paddingVertical:'2%',
        borderRadius:5,
        elevation:10,
    },
    followingText:{
        textAlign:'center',
        color:Colors.white,
        fontSize:16,
        fontWeight:'bold',
        letterSpacing:0.5
    },
    followingButton:{
        width:'100%',
        backgroundColor:Colors.buttoncolor2,
        paddingVertical:'2%',
        borderRadius:5,
        elevation:10,
    },
    header:{
        backgroundColor:'#fff',
        width:'100%',
        paddingTop:Platform.OS === 'android' ? '10%' : '10%',
        paddingLeft:'5%',
        paddingBottom:'2%'
    },
    logoutButton:{
        width:'46%',
        backgroundColor:Colors.white,
        paddingVertical:'2%',
        borderRadius:10,
        marginVertical:'2%',
        borderColor:'lightgray',
        borderWidth:StyleSheet.hairlineWidth
    },
    logoutButtonText: {
        color:Colors.black,
        textAlign:'center',
        fontSize:15,
        fontWeight:"bold",
    },
    image: {
        flex: 1,
        aspectRatio: 1 / 1,
        marginHorizontal:1,
        marginVertical:1,

    },
    infotext1:{
        fontWeight:'bold',
        fontSize:14
    },
    profilecontainer:{
        // width:'100%',
        elevation:20,
        marginBottom:dimensions.width < 360 ? 5 : 10 ,
    },
    profileimage:{
        width: dimensions.width < 360  ? 90   :  200,
        height: dimensions.width < 360  ? 90   :  200,
        borderRadius: dimensions.width < 360 ? 45 : 100,
        // elevation:20,
    },
    userbio:{
        fontSize:14,
        color:Colors.gray,
        fontWeight:'bold'
    },
    username:{
        fontSize:16,
        fontWeight:'bold',
        letterSpacing:1,
    },

})
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser,
    posts: store.userState.posts,
    following: store.userState.following
})
export default connect(mapStateToProps, null)(Profile);
