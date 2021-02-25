import React, { Component } from 'react'
import { Text, View,Modal, TouchableWithoutFeedback,TouchableNativeFeedback,TouchableOpacity} from 'react-native'
// import { TouchableNativeFeedback } from 'react-native-gesture-handler';
import Colors from '../Constants'


class Bottommodal extends Component {
    constructor(props){
        super(props);
        this.state={
            show:false
        }
    }

    modalOpen = () => {
        this.setState({show:true})
    }

    modalClose = () => {
        this.setState({show:false})
    }
    renderoutsideTouch(onTouch){
       const view = <View style={{flex:1, width:'100%'}} />
       
       if(!onTouch) return view

       return(
           <TouchableWithoutFeedback 
           onPress={onTouch} style={{flex:1,width:'100%'}}
           >
            {view}
           </TouchableWithoutFeedback>
       )
    }

    render() {
        const {show} = this.state;
        const {onTouchOutSide} = this.props;

        return (
            <Modal
            animationType={'fade'}
            transparent={true}
            visible={show}
            onRequestClose={this.props.onCancel}
            >
            
            <View style={{flex:1,backgroundColor:"#000000aa",justifyContent:'flex-end'}}>
                {this.renderoutsideTouch(onTouchOutSide)}
            </View>


            <View style={{backgroundColor:Colors.white,padding:20,borderTopLeftRadius:10,borderTopRightRadius:10}}>
                <View style={{borderBottomWidth:1,borderBottomColor:Colors.black}}>
                    <Text style={{fontSize:14,fontWeight:'bold'}}>
                        Change of Profile picture
                    </Text>
                </View>
                {/* <TouchableOpacity
                style={{margin:10}}
                onPress={this.props.onTakephoto}
                >
                    <Text style={{fontSize:18}}>
                        Take picture from Camera
                    </Text>
                </TouchableOpacity> */}
                <TouchableOpacity
                style={{margin:10}}
                onPress={this.props.pickImage}>
                    <Text style={{fontSize:18}}>
                        Choose from Gallery
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                style={{margin:10}}
                onPress = {this.props.onCancel}
                >
                    <Text style={{fontSize:18}}>
                        Cancel
                    </Text>
                </TouchableOpacity>

            </View>
            </Modal>
        )
    }
}

export default Bottommodal