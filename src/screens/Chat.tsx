import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import SearchBar from "../components/SearchBar";
import MainHeader from "../components/MainHeader";
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { Timestamp, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where } from 'firebase/firestore';


// TODO: firebase does not support multiple array-contains queries... so dumb.
// do just one, and then filter the result to find the one we are looking for


const { width, height } = Dimensions.get('window');
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

//Default guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350;
const guidelineBaseHeight = 680;

function scale(size: number) {
    return shortDimension / guidelineBaseWidth * size;
}
function verticalScale(size: number) {
    return longDimension / guidelineBaseHeight * size;
}
function moderateScale(size: number, factor = 0.5) {
    return size + (scale(size) - size) * factor;
}
function moderateVerticalScale(size: number, factor = 0.5) {
    return size + (verticalScale(size) - size) * factor;
}

//const width = Dimensions.get('window').width
const numberOfColumns = Math.round(width/215
)



function Chat() {

  const {height, width, scale, fontScale} = useWindowDimensions();
  const [shortDimension, longDimension] = width < height ? [width, height] : [height, width];

  //Default guideline sizes are based on standard ~5" screen mobile device
  const guidelineBaseWidth = 350;
  const guidelineBaseHeight = 680;

  function scaleIt(size: number) {
      return shortDimension / guidelineBaseWidth * size;
  }
  function verticalScale(size: number) {
      return longDimension / guidelineBaseHeight * size;
  }
  function moderateScale(size: number, factor = 0.5) {
      return size + (scaleIt(size) - size) * factor;
  }
  function moderateVerticalScale(size: number, factor = 0.5) {
      return size + (verticalScale(size) - size) * factor;
  }

  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  // const sellerId = listingItemData.userId;

  const route = useRoute();
  

  const { currentUser, loading } = useAuth();
  const [currentUserId,setCurrentUserId] = useState("");
  const [otherUserIds, setOtherUserIds] = useState([]);

  // {otherUserId: [{message1},{message2},...]}
  const [chats,setChats] = useState({});

  useEffect(()=>{
    setCurrentUserId(currentUser?.uid);
  },[currentUser])

  const [activeChatId, setActiveChatId] = useState("");

  useEffect(()=>{
    const clickedSellerId = route.params?.item?.userId;
    if(clickedSellerId){
      // if the "message" button was clicked, focus the ui on the corresponding chat or
      // create a new empty chat between the current user and the clicked user
      
      setActiveChatId(clickedSellerId);
    }
  },[])

   // user doc info realtime. listen on changes to the otherUserIds list. update the sidebar based on that
  useEffect(() => {
    let unsubscribe = () => {};
    if (currentUserId) {
      unsubscribe = onSnapshot(doc(db, "users", currentUserId), (doc) => {
        if (doc.exists() && doc.data().otherUserIds) {
          setOtherUserIds(doc.data().otherUserIds);
        } else {
          console.log("No such document!");
        }
      });
    }
    

    // Cleanup function to remove the listener when the component unmounts
    return () => unsubscribe();
  }, [currentUserId]);

  const [listenerUnsubList, setListenerUnsubList] = useState([]);

  function filterNewChats(serverSideChatsWithCurrentUser) {
    /**
      const chats = {
      userId1: { firstName: 'John', lastName: 'Doe', messages: ['Hello', 'Hi'] },
      userId2: { firstName: 'Jane', lastName: 'Smith', messages: ['Hey', 'What’s up?'] }
      };

      const otherUserIds = ['userId1', 'userId3', 'userId4'];

      we want to return the ones that are in otherUserIds but not in chats
     */
    
    return serverSideChatsWithCurrentUser.filter(id => !chats.hasOwnProperty(id));
    }

  useEffect(() => {
    (async ()=>{
      const chatsRef = collection(db,"chats");
      // set up listeners on chats that don't have listeners yet
      // the filter function gives us the id-s that don't have listeners
      const filteredOtherUserIds = filterNewChats(otherUserIds);

      for (const otherUserId of filteredOtherUserIds) {
        const q = query(chatsRef, where("users", "array-contains", currentUser?.uid), where("users", "array-contains", otherUserId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (doc) => {
          const chatId = doc.id;
          const messagesRef = collection(db,"chats",chatId,"messages");
          // users == [this user's id, another user's id]
          const users = doc.data().users;

          const {firstName, lastName} = (await getDoc(db,"users",otherUserId)).data();

          // listen on messages collection. order them by date
          const unsub = onSnapshot(query(messagesRef,orderBy("date")), (querySnapshot) => {
            const messages: any[] = [];
            querySnapshot.forEach((message) => {
                const {userId, text, date} = message.data();
                messages.push({userId,text,date});
            });
            // possible race condition?
            setChats({...chats,otherUserId:{firstName,lastName,messages}});
          });

          setListenerUnsubList([...listenerUnsubList, unsub]);

        });
      }

      // when component unmounts, unsub from everything
      return () => {
        listenerUnsubList.forEach((unsub) => {
          unsub();
        })
      }
    })();
  }, [JSON.stringify(otherUserIds)])


  // TODO: create an "activeChatId". Have all chats on the left correspond to an id.
  // Clicking changes the active id
  // render messages depending on which id is active
  // on load, select the chat with clickedSellerId
  

 

  
  // if it does not exist, create it by adding clickedSellerId to the userDoc, adding uiserId to clicked seller doc, and creating
  // a chat (would normally be done in a cloud function transaction with proper security, but whatever)

  // create a listener for every chat that contains current user id in the users array, listen on messages


  const chatsObjectToArray = () => {

    /**
     
    Turn the following:

    const chats = {
      userId1: { firstName: 'John', lastName: 'Doe', messages: ['Hello', 'Hi'] },
      userId2: { firstName: 'Jane', lastName: 'Smith', messages: ['Hey', 'What’s up?'] }
      };

    Into: [{userId1 : {...}},{userId2: {...}, ... }]

    */

    return Object.entries(chats).map(([userId, data]) => ({ [userId]: data }));

  }


  const renderMessages = () => {
    if(activeChatId) {
      const name = chats[activeChatId].firstName + " " + chats[activeChatId].lastName;
      const messages = chats[activeChatId].messages;
  
      return messages.map((message, index) => {
        <Text key={index}>{message.userId == currentUserId ? "You" : name}: {message.text} ------ {message.date}</Text>;
      });
    }
  }

  function ChatItem(chat) {
    const thisChatUserId = getUserIdFromMessage(chat);
    const {firstName,lastName,messages} = chat;

    const lastMessage = messages[messages.length - 1];
    const name = firstName + " " + lastName;
    
    return (
      <Pressable onPress={() => setActiveChatId(item.id)}>
        <View style={[styles.item, activeChatId == thisChatUserId && { backgroundColor: "rgb(34 197 94)" }]}>
          <Text style={[styles.otherUser, activeChatId == thisChatUserId && { color: "white" }]}>{name}</Text>
          <Text style={[styles.lastMessage, activeChatId == thisChatUserId && { color: "white" }]}>{lastMessage.text}</Text>
          <Text style={[styles.time, activeChatId == thisChatUserId && { color: "white" }]}>{lastMessage.date}</Text>
        </View>
      </Pressable>

    // return (
    // <Pressable onPress={() => setActiveChatId(item.id)}>
    //   <View style={[styles.item, currentIndex == item.id && { backgroundColor: "rgb(34 197 94)" }]}>
    //     <Text style={[styles.otherUser, currentIndex == item.id && { color: "white" }]}>{item.otherUser}</Text>
    //     <Text style={[styles.lastMessage, currentIndex == item.id && { color: "white" }]}>{item.lastMessage}</Text>
    //     <Text style={[styles.time, currentIndex == item.id && { color: "white" }]}>{item.time}</Text>
    //   </View>
    // </Pressable>
    )
  };

  const sendMessage = async () => {
    // TODO: send the message to corresponding "messages" doc

    // this can be optimized, just store the document id along with the chat
    const chatsRef = collection(db,"chats");
    const q = query(chatsRef, where("users", "array-contains", currentUser?.uid), where("users", "array-contains", otherUserId));
    const querySnapshot = await getDocs(q);
    const chatId = querySnapshot.docs[0].id;
    const messagesRef = collection(db,"chats",chatId,"messages");
    if (inputText.trim() !== '') {
      const newMessage = {userId: currentUserId,date: Timestamp.fromDate(new Date()),id: messages.length.toString(), text: inputText };
      const newMessageRef = doc(messagesRef);
      await setDoc(newMessageRef,newMessage,{merge: true});
      setInputText('')
    }
  };

  const renderMessage = ({ item }) => {
    return (
      <View style={styles.messageContainer}>
        <Text style={styles.messageText}>{item.text}</Text>
      </View>
    );
  };

  const getUserIdFromMessage = (message) => {
    return Object.keys(message)[0]
  }



    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
              <MainHeader onInput={null} isListing={false}></MainHeader>
                <View style={{flex: 1, flexDirection: "row"}}>
                    
                    <View style={{flex: 3, borderRightWidth: 1, borderRightColor: "#cccccc"}}>
                      {/* <FlatList
                        data={CHATS}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <ChatItem item={item} />}
                      /> */}
                      <FlatList
                        // date= needs to be passed an array
                        data={chatsObjectToArray()}
                        keyExtractor={chat => getUserIdFromMessage(chat)}
                        renderItem={(chat) => <ChatItem item={chat} />}
                      />
                    </View>
                  
                    <View style={{flex: 12, backgroundColor: "white"}}>
                      <FlatList
                          contentContainerStyle={{justifyContent: 'flex-end', flex: 1}}
                          data={messages}
                          renderItem={renderMessage}
                          keyExtractor={(item) => item.id.toString()}
                      />

                      {renderMessages()}

                      <View style={styles.inputContainer}>
                          <TextInput
                          placeholderTextColor={"#B3B3B3"}
                          style={styles.input}
                          placeholder="Type a message..."
                          value={inputText}
                          onChangeText={setInputText}
                          />
                          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                            <Text style={styles.sendButtonText}>Send</Text>
                          </TouchableOpacity>
                      </View>
                    </View>

                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
    overflow: "scroll"
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
  header: {
    //justifyContent: "center",
    //paddingTop: 30,
    alignItems: "center",
    paddingBottom: 20, 
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#d3d3d3",
    //bottom: 15,
  },
  logo: {
    width: 40,
    height: 60,
    marginLeft: 40,
    marginTop: 17,
  },
  compName: {
    fontSize: scale(17) < 20 ? 20 : scale(17),
    color: "rgb(34 197 94)",
    fontWeight: "bold",
    //width: "20%",
    marginTop: 15,
    paddingTop: 0,
  },
  search: {
    //width: scale(130),
    // borderWidth: 10,
    borderWidth: 1,
    borderColor: "#A9A9A9",
    backgroundColor: "#fbfbfb",
    borderRadius: 5,
    flexDirection: "row",
    padding: 10,
    marginTop: 15,
    height: 50,
    alignItems: "center",
    justifyContent: "flex-start",
    marginRight: 20,
    marginLeft: 50,
    flex: 4,
  },
  shoppingCart: {
    //backgroundColor: "black",
    padding: 10,
    //borderRadius: 13,
    //overflow: "hidden",
  },
  products: {
    // flex: 1,
    // flexDirection: "row",
    //padding: 10,
    width: (width/2),
    //backgroundColor: "rgb(17 24 39)",
    //borderWidth: 1,
    //borderColor: "red",    
  },
  productsText: {
    //height: 50,
    width: (width/2),
    //fontWeight: "bold",
    padding: 0,
    backgroundColor: "#e5e7eb",
    color: "black",
    fontSize: 23,
    //overflow: "hidden",
    // borderRadius: 20,
  },
  page: {
    flex: 1,
    alignContent: "center",
    alignItems: "center",
    //borderWidth: 1,
    // borderColor: "red",
    //flexDirection: "row",
    flexWrap: "wrap",
  },
  // item: {
  //   //borderWidth: 1,
  //   overflow: "hidden",
  //   padding: 0,
  //   marginVertical: 8,
  //   marginHorizontal: 10,
  //   //borderRadius: 25,
  //   //flexDirection: "row",
  //   //justifyContent: "space-around",
  //   textAlign: "center",
  //   fontFamily: 'Roboto',
  //   borderColor: "rgb(34 197 94)",
  //   //borderWidth: 1,
  // },
  resultsContainer: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  messageContainer: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "rgb(34 197 94)",
    //backgroundColor: '#e5e5e5',
    borderRadius: 10,
    marginVertical: 5,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
    color: "white",
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderTopWidth: 0,
    borderTopColor: '#ccc',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: 'rgb(34 197 94)',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  otherUser: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  lastMessage: {
    color: '#666666',
  },
  time: {
    color: '#666666',
    fontSize: 12,
    marginTop: 5,
  },
});

export default Chat