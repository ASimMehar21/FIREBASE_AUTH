import React,{useState} from 'react'
import { View, Text, StyleSheet,ImageBackground,Dimensions,TouchableHighlight,FlatList,ActivityIndicator, Button,TouchableOpacity,TextInput, ScrollView } from 'react-native'
import { connect } from 'react-redux'
import Firebase, {db} from '../config/firebase'
import { getUser, requestLogout } from './redux/actions/user'
import { bindActionCreators } from 'redux'
import { IconButton } from 'react-native-paper';
import {getMessages,handleSendfb} from './redux/actions/firebase'

import {
  GiftedChat,
  Bubble,
  Send,
  SystemMessage
} from 'react-native-gifted-chat';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {Ionicons,Entypo} from "react-native-vector-icons";


function chatting({user,navigation,route }) {


  const [messages, setMessages] = useState([]);
  const [fbimages, setFbimages] = useState("");
  const { thread } = route.params;
  const currentUser = user;

  async function handleSend(messages) {
    const text = messages[0].text;

    if(fbimages.length < 1 ){
      handleSendfb(thread)
      .add({
        text,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email
        }
      });
    }else{
      handleSendfb(thread)
      .add({
        text,
        image:fbimages,
        createdAt: new Date().getTime(),
        user: {
          _id: currentUser.uid,
          email: currentUser.email
        }
      });
    }
    setFbimages("")
   

    await db
      .collection('THREADS')
      .doc(thread._id)
      .set(
        {
          latestMessage: {
            text,
            createdAt: new Date().getTime()
          }
        },
        { merge: true }
      );

  }

  React.useEffect(() => {
    getMessages(thread)
      .onSnapshot(querySnapshot => {
        const messages = querySnapshot.docs.map(doc => {
          const firebaseData = doc.data();
          console.log(firebaseData);
          const data = {
            _id: doc.id,
            text: '',
            image:'',
            createdAt: new Date().getTime(),
            ...firebaseData
          };

          if (!firebaseData.system) {
            data.user = {
              ...firebaseData.user,
              name: firebaseData.user.email
            };
          }

          return data;
        });

        setMessages(messages);
      });

    // Stop listening for updates whenever the component unmounts
    // return () => messagesListener();
  }, []);

  function renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#6646ee'
          }
        }}
        textStyle={{
          right: {
            color: '#fff'
          }
        }}
      />
    );
  }

  function renderSend(props) {
    return (
      <Send {...props}>
        <View style={styles.sendingContainer}>
          <IconButton icon='send-circle' size={32} color='#6646ee' />
        </View>
      </Send>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon='chevron-double-down' size={36} color='#6646ee' />
      </View>
    );
  }

  function renderSystemMessage(props) {
    return (
      <SystemMessage
        {...props}
        wrapperStyle={styles.systemMessageWrapper}
        textStyle={styles.systemMessageText}
      />
    );
  }


  async function addImage () {
    console.log("calling");
    setFbimages("")
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      allowsEditing: true,
    })

    if (!pickerResult.cancelled) {

      console.log('***********************');

      const imageUri = pickerResult ? `data:image/jpg;base64,${pickerResult.base64}` : null
      imageUri && { uri: imageUri }
      // this.state.multipleUrl.push(imageUri)
      setTimeout(() => {
        // console.log(imageUri);
        setFbimages(imageUri)
        // setFbimages({...fbimages, imageUri})
        console.log("done");
      }, 3000);
    setTimeout(() => {
      console.log(fbimages);
    }, 5000);
    
    }
  }


  function _renderImages  () {
    console.log("calling render images");
    
      return(
        <ImageBackground  source={{ uri: fbimages }} style={{ width: 50, margin: 5, height: 50 }} imageStyle={{ borderRadius: 10 }} >
          <View style={{ alignSelf: 'flex-end', flex: 0.5 }}>
            {/* <TouchableOpacity onPress={() => this.remove_image(index)}> 
              <Entypo name="circle-with-cross" size={26} color="red" />
            </TouchableOpacity> */}
          </View>
        </ImageBackground>
        )
  }

  return (
    <View style={{flex:1}}>
      <Ionicons
        name="ios-camera"
        size={35}
        style={{
          top:10,
          right:25,
          position: "absolute",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.5,
          zIndex: 2,
          backgroundColor: "transparent"
      }}
      onPress={addImage}
    />
    
    <GiftedChat
      messages={messages}
      onSend={handleSend}
      user={{ _id: currentUser.uid }}
      placeholder='Type your message here...'
      alwaysShowSend
      showUserAvatar
      // scrollToBottom
      isAnimated
      renderBubble={renderBubble}
      // renderLoading={renderLoading}
      renderSend={renderSend}
      scrollToBottomComponent={scrollToBottomComponent}
      renderSystemMessage={renderSystemMessage}
      renderActions={() => {

        return (
            <>
            
            </>
          );
    }}
    />
    {fbimages.length < 1?
      <></>
      :
      <View style={{ height: 80,position:'absolute', alignItems: 'center', flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-start',left:10, bottom:50}}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          {_renderImages()}            
        </ScrollView>
      </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  sendingContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomComponentContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  systemMessageWrapper: {
    backgroundColor: '#6646ee',
    borderRadius: 4,
    padding: 5
  },
  systemMessageText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold'
  }
});


const mapDispatchToProps = dispatch => {
	return bindActionCreators({ requestLogout }, dispatch)
}

const mapStateToProps = state => {
	return {
		
		user: state.user
	}
}

export default connect(mapStateToProps,mapDispatchToProps)(chatting)