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

// import { scale, verticalScale, moderateScale, moderateVerticalScale } from "/Users/jevontwitty/Documents/GitHub/UMarket/src/components/Scaling"
// import { FlatList } from 'react-native-gesture-handler';


const CHATS = [
  {id: "1", otherUser: "Jevon Twitty", lastMessage: "Hey, how are you?", time: "7:37 PM"},
  {id: "2", otherUser: "Nash Moore", lastMessage: "No", time: "10:41 PM"},
  {id: "3", otherUser: "Paul Evans", lastMessage: "lmaooo", time: "9:52 PM"},
  {id: "4", otherUser: "JD Suarez", lastMessage: "Alright, thanks", time: "12:00 PM"},
  {id: "5", otherUser: "Dylan Holley", lastMessage: "It means a lot you even agreed to sit down", time: "6:56 PM"},
  {id: "6", otherUser: "Enrique Iglesias", lastMessage: "Food?", time: "8:16 PM"},
  {id: "7", otherUser: "King Ladzekpo", lastMessage: "Lmk what you're thinking before you do anything", time: "3:43 PM"},
  {id: "8", otherUser: "Yubin Kim", lastMessage: "Thx bro", time: "10:33 AM"},
  {id: "9", otherUser: "Nicholas Stone", lastMessage: "Great Job", time: "5:35 PM"},
  {id: "10", otherUser: "David Adamashvili", lastMessage: "Working on it", time: "12:42 PM"},
]


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

  let chatIndex = 1;
  const [currentIndex, setCurrentindex] = useState(chatIndex);

  function ChatItem({ item }) {
    return (
    <Pressable onPress={() => setCurrentindex(item.id)}>
      <View style={[styles.item, currentIndex == item.id && { backgroundColor: "rgb(34 197 94)" }]}>
        <Text style={[styles.otherUser, currentIndex == item.id && { color: "white" }]}>{item.otherUser}</Text>
        <Text style={[styles.lastMessage, currentIndex == item.id && { color: "white" }]}>{item.lastMessage}</Text>
        <Text style={[styles.time, currentIndex == item.id && { color: "white" }]}>{item.time}</Text>
      </View>
    </Pressable>
    )
  };

  const sendMessage = () => {
    if (inputText.trim() !== '') {
      const newMessage = { id: messages.length.toString(), text: inputText }
      messages.push(newMessage)
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

  const [searchResults, setSearchResults] = useState<Object[]>([]);
  const [hasSearched, sethasSearched] = useState(false);
  const handleSearch = (query: any) => {
    if (!hasSearched) {
      sethasSearched(!hasSearched);
    }
    const filteredItems = DATA.filter(Item =>
      Item.title.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(filteredItems);
  };

  console.log(width)
  const navigation = useNavigation()
  function renderItem({item}) {
    return (
      <Pressable style={ ({ pressed }) => [
        {borderRadius: 10},
        pressed && {backgroundColor: "rgb(34 197 94)",}
        ]}
        onPress={() => navigation.navigate('ListingItem', { item })}>
        <Item id={item.id} title={item.title} image={item.image} description={item.description} price={item.price} tags={item.tags}/>
      </Pressable>
    )
  }

  let tags = [];

  // function listing(text: string, image: string) {
  //   return (
  //   //<ScrollView horizontal>
  //     <View style={styles.products}>
  //       <Image style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10}} source={{uri: image}}></Image>
  //       <Text style={styles.productsText}>
  //         {text}
  //       </Text>
  //     </View>
  //   //</ScrollView>
  //   )
  // }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
              <MainHeader onInput={null} isListing={false}></MainHeader>
                <View style={{flex: 1, flexDirection: "row"}}>
                    
                    <View style={{flex: 3, borderRightWidth: 1, borderRightColor: "#cccccc"}}>
                      <FlatList
                        data={CHATS}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => <ChatItem item={item} />}
                      />
                    </View>
                    
                    { width >= 700 ? <View style={{flex: 12, backgroundColor: "white"}}>
                    <FlatList
                        contentContainerStyle={{justifyContent: 'flex-end', flex: 1}}
                        data={messages}
                        renderItem={renderMessage}
                        keyExtractor={(item) => item.id.toString()}
                    />
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
                    </View> : null}

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