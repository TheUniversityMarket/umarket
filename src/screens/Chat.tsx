import { useEffect, useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, FlatList, Dimensions, useWindowDimensions, Pressable, TouchableOpacity, ActivityIndicator } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { TextInput } from 'react-native-gesture-handler';
import SearchBar from "../components/SearchBar";
import MainHeader from "../components/MainHeader";
import { useAuth } from '../context/AuthContext';
import { db } from '../firebase/firebaseConfig';
import { Timestamp, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, setDoc, where, QuerySnapshot, updateDoc, arrayUnion } from 'firebase/firestore';

function Chat() {
  const route = useRoute();

  const { currentUser } = useAuth();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState("");

  var ChatRoomsTemp = [];
  const [ChatRooms, setChatRooms] = useState([]);

  const [chatRoom, setChatRoom] = useState({});

  var ChatIds = [];

  const [chatId, setChatId] = useState(currentUser?.uid + currentUser?.uid);

  useEffect(()=> {
    async function getChatIds() {
      var query1 = query(collection(db, "chats"), where("user1_id", "==", currentUser?.uid));
      var query2 = query(collection(db, "chats"), where("user2_id", "==", currentUser?.uid));

      const query1SnapShot = await getDocs(query1);
      const query2SnapShot = await getDocs(query2);

      query1SnapShot.forEach((doc) => {
        // console.log("working?");
        //console.log(doc);
        // console.log(doc.data().id);
        ChatIds.push(doc.data().id);
        ChatRoomsTemp.push(doc.data());
        setChatRooms(ChatRoomsTemp);
        setChatRoom(ChatRooms[0]);
      })

      query2SnapShot.forEach((doc) => {
        // console.log("working?");
        //console.log(doc);
        // console.log(doc.data().id);
        ChatIds.push(doc.data().id);
        ChatRoomsTemp.push(doc.data());
        setChatRooms(ChatRoomsTemp);
        setChatRoom(ChatRooms[0]);
      })

      // console.log("THIS DOWN BELOW");
      // console.log(ChatIds[0]);
      // console.log(ChatRooms);
      setChatId(ChatIds[0]);
      setChatRoom(ChatRooms[0]);
    }

    getChatIds();
  }, []);
  
  useEffect(() => {
    const fetchMessages = async (chatId) => {
      try {
        // console.log("NO WAY");
        // console.log(chatId);
        const chatDocRef = doc(db, 'chats', chatId);
        const chatDoc = await getDoc(chatDocRef);

        // console.log("GOOD");

        if (chatDoc.exists()) {
          const chatData = chatDoc.data();
          setMessages(chatData.messages || []);
        } else {
          console.error('No such document!');
        }
      } catch (error) {
        console.error('Error fetching chat messages: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages(chatId);
  }, [chatId, inputText]);

  useEffect(() => {
    const q = query(collection(db, 'chats/' + chatId + '/messages'), orderBy('timestamp'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push({ ...doc.data(), id: doc.id });
      });
      setMessages(msgs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const renderMessage = ({ item }) => {
    return (
      <View style={[styles.messageContainer, item.sender_id != currentUser?.uid && {alignSelf: "flex-end", backgroundColor: "#c3c3c3", marginRight: 10}]}>
        <Text style={[styles.messageText, item.sender_id != currentUser?.uid && {color: "black"}]}>{item.message}</Text>
      </View>
    );
  };

  async function sendMessage() {
    if (inputText.trim() === '') return;

    const newMessage = {message: inputText, id: Math.random().toString(36).substring(7), sender_id: currentUser?.uid, receiver_id: currentUser?.uid, timestamp: new Date()};

    try {
      const chatDocRef = doc(db, 'chats', chatId);
      await updateDoc(chatDocRef, {
        messages: arrayUnion(newMessage)
      });
      setInputText('');
    } catch (error) {
      console.error('Error adding message: ', error);
    } finally {
      console.log(chatId);
    }
  };

  function ChatItem({ item }) {
    // console.log("I AM WORKING> PLEAASEEEEEEEEEEEE");
    return (
    <Pressable onPress={() => setChatId(item.id)}>
      <View style={[styles.item, chatId == item.id && { backgroundColor: "rgb(34 197 94)" }]}>
        <Text style={[styles.otherUser, chatId == item.id && { color: "white" }]}>{item.users[1]}</Text>
        <Text style={[styles.lastMessage, chatId == item.id && { color: "white" }]}>{item.messages[item.messages.length - 1].message}</Text>
        <Text style={[styles.time, chatId == item.id && { color: "white" }]}>{item.messages[item.messages.length - 1].timestamp.toString()}</Text>
      </View>
    </Pressable>
    )
  };

  // console.log(ChatRooms);
  // console.log("^^^^^^^")

  return (
    <SafeAreaView style={styles.safeContainer}>
      {loading ? (
        <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color="rgb(34 197 94)" />
        </View>
      ) :
      (
        <View style={styles.container}>
          <MainHeader onInput={null} isListing={false}></MainHeader>
          <View style={{flex: 1, flexDirection: "row"}}>
            <View style={{flex: 3, borderRightWidth: 1, borderRightColor: "#cccccc"}}>
                <FlatList
                  key={ChatRooms}
                  data={ChatRooms}
                  extraData={ChatRooms.length}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={ChatItem}
                />
            </View>
            <View style={{flex: 12, backgroundColor: "white"}}>
                <FlatList
                  contentContainerStyle={{justifyContent: 'flex-end', flex: 1}}
                  key={messages.length}
                  data={messages}
                  renderItem={renderMessage}
                  keyExtractor={(item, index) => index.toString()}
                />
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholderTextColor={"#B3B3B3"}
                    style={styles.input}
                    placeholder="Type a message..."
                    value={inputText}
                    onChangeText={setInputText}
                    onSubmitEditing={sendMessage}
                  />
                  <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                  </TouchableOpacity>
                </View>
            </View>
          </View>
        </View>
      )
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: "white",
    overflow: "scroll"
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
    focusColor: "rgb(34 197 94)",
    outlineColor: "rgb(34 197 94)",
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //alignItems: 'center',
    //justifyContent: 'center',
  },
})

export default Chat