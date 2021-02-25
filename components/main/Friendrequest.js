import React from 'react'
import { View, Text } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
// import FriendrequestCard from '../../components/Friendrequestcard'


const Friendrequest = () => {
    return (
        <ScrollView>
            <View style={{marginBottom:20}}>  
               {/* <FriendrequestCard/> */}
               <Text>requests</Text>
            </View>
        </ScrollView>
    )
}

export default Friendrequest
