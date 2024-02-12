/*
StAuth10244: I Matheos Amanuel, 000848470 certify that this material is my original work. No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
*/
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View, ActivityIndicator, ScrollView, TouchableOpacity, Image, ImageBackground, TextInput, TouchableWithoutFeedback } from 'react-native';
import React, { useEffect, useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import bg1 from './assets/bg.png';
import bg2 from './assets/bg2.jpeg';
import bg3 from './assets/bg3.jpeg';
import char_BG from './assets/charecters_BG.webp';
import Wepon_BG from './assets/wepons_BG.avif';
import Account_BG from './assets/account_BG.jpeg';




// Home screen
function HomeScreen({navigation}){
  // return the home screen with other screens navigators
  return(
      //<ImageBackground source={bg3} style={styles.bg}>
        <View>
          <TouchableWithoutFeedback title='Charecters' onPress={() => navigation.navigate('CharacterLookup')}>
          <View style={styles.start}>
              <Image style={styles.btn1} source={char_BG} />
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback title='Wepons' onPress={() => navigation.navigate('WeaponSkins')}>
          <View style={styles.end}>
              <Image style={styles.btn2} source={Wepon_BG} />
          </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback title='Accounts' onPress={() => navigation.navigate('AccountLookUp')}>
            <View style={styles.center}>
              <Image style={styles.btn3} source={Account_BG} />
            </View>
          </TouchableWithoutFeedback> 
          <StatusBar style="auto" />
        </View>
      //</ImageBackground>
  );
}

//---------------------------------------------------------------------


// Charecters Info Screen
function CharecterScreen({navigation}){
  // consts to hold responce data
  const[isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  // api link
  const AgentsURL = 'https://valorant-api.com/v1/agents';

  // click handeler to anvigate to specific charecter info
  const handlePress = (uuid) => {
    new navigation.navigate('Details', {id: uuid});
  }

  // api caller and store results
  useEffect(() => {
    fetch(AgentsURL,{
      method: "GET",
      headers:{
        'isPlayableCharacter': 'true',
      }
    })
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(false);
        setData(result.data);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    )
  }, []);

  const Charecters = () => {
    if(isLoading){
      return <ActivityIndicator size="large"/>;
    }

    if(error){
      return <Text>{error}</Text>;
    }

    // return the page 
    return (<View style={styles.container}>
              
                {data.map((item, index) =>(
                  <TouchableOpacity key={index} onPress={() => handlePress(data[index].uuid)}>
                    <ImageBackground source={bg3} style ={styles}>
                      <View style={styles.charecters}>
                        <Image style={styles.logo} source={{ uri: item.displayIcon }} />
                        <Text style={styles.titleName} >{item.displayName}</Text>
                      </View>
                    </ImageBackground>
                  </TouchableOpacity>
                ))}
            </View>);
    
  }


  return(
    <ScrollView>
        {Charecters()}
    </ScrollView>
  );
}

//---------------------------------------------------------------------

// Wepons Skins Info screen
function WeponsScreenScreen(){
  // hold the responce data
  const[isLoading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState();
  // api link
  const WeponsSkinURL = 'https://valorant-api.com/v1/weapons/skins';

  // call the api link and store resault
  useEffect(() => {
    fetch(WeponsSkinURL,{
      method: "GET"
    })
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(false);
        setData(result.data);

      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    )
  }, []);

  const Skins = () => {
    if(isLoading){
      return <ActivityIndicator size="large"/>;
    }

    if(error){
      return <Text>{error}</Text>;
    }

    // return the page with all data
    return (
      <View style={styles.container}>
        {data? data.map((items, index) => (
        <ImageBackground source={bg3} style ={styles}>
          <View key={index} style={styles.charecters}>
              <Image style={styles.weponImg} source={{ uri: items.displayIcon}} />
              <Text style={styles.titleName } >{items.displayName}</Text>
          </View>
        </ImageBackground>
        )):null}
      </View>
      );
}  

  return(
    <ScrollView>
      {Skins()}
    </ScrollView>
  );
}

//---------------------------------------------------------------------

// Details Screen
function DetailsScreen({route}) {
  // captacher the rouute param whitch would hold the charecter id
  const {id} = route.params;
  // consts to hold responces
  const[isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  // fetching data from api using id param
  const AgentsURL = 'https://valorant-api.com/v1/agents/'+id;

  // call the api and store the resault
  useEffect(() => {
    fetch(AgentsURL,{
      method: "GET",
    })
    .then(res => res.json())
    .then(
      (result) => {
        setLoading(false);
        setData(result.data);
      },
      (error) => {
        setLoading(false);
        setError(error);
      }
    )
  }, []);

  // charecters caller
  const Charecters = () => {
    if(isLoading){
      return <ActivityIndicator size="large"/>;
    }

    if(error){
      return <Text>{error}</Text>;
    }

      // display the page
      return (
              <View style={styles.container}>
                <ImageBackground source={bg3} style={styles.bg}>
                  <View style={styles.imgContainer}>
                    <ImageBackground style={styles.img} source={{ uri: data.background}}  >
                    <Image style={styles.img} source={{ uri: data.fullPortrait }} />
                    </ImageBackground>
                    <Text style={styles.titleName }>{data.displayName}</Text>
                    <Text style={styles.creator}>Created By: {data.developerName}</Text>
                    <Text style={styles.mainDesc} >{data.description}</Text>
                  </View>
                </ImageBackground>
                <View style={styles.abilities}>
                  <Image style={styles.logosm} source={{ uri: data.role? data.role.displayIcon:null }} />
                  <Text style={styles.title} >{data.role ? data.role.displayName: null}</Text>
                  <Text style={styles.desc} >{data.role ? data.role.description:null}</Text>
                </View>

                  <Text style={styles.agentTitle}>Agent Abilities</Text>
                  {data.abilities? data.abilities.map((item, index) =>(
                    <View key={index} style={styles.abilitiesContainer}>
                        <Image style={styles.logosm} source={{ uri: item.displayIcon }} />
                        <Text style={styles.title}>{item.displayName}</Text>
                        <Text style={styles.desc} >{item.description}</Text>
                    </View>
                  )):null}
              </View>);
  }

  return(
    <ScrollView>
      {Charecters()}
    </ScrollView>
  )
}

//---------------------------------------------------------------------

// Account Lookup screen
function AccountlookUp(){

  //constants to save inputs and responces
  const[isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const [username, setUsername] = useState('');
  const [tagLine, setTagLine] = useState('');
  // api link
  const accountURL = 'https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/'+username+'/'+tagLine+'?api_key=RGAPI-407f5c4d-b78a-4621-9cf2-f1573b2716f8';

  // call the api and fetch responce into setData
  const handleSearch = () => {
      fetch(accountURL)
      .then(res => res.json())
      .then(
        (result) => {
          setLoading(false);
          setData(result);
          console.log(result);
        },
        (error) => {
          setLoading(false);
          setError(error);
        }
      )
    
    if(isLoading){
      return <ActivityIndicator size="large"/>;
    }

    if(error){
      return <Text>{error}</Text>;
    }

  }
  
  // filed check to make sure only ints are used
  const handleChange = (text) => { 
    // Allow only numbers 
    const numericValue = text.replace(/[^0-9]/g, ""); 
    setTagLine(numericValue); 
  }; 
  
  return(
    <ImageBackground source={bg1} style={styles.bg}>
      <View>
          {/* create the text fields */}
          <TextInput
            placeholder="Enter Player Username"
            value={username}
            onChangeText={text => setUsername(text)}
            style = {styles.textInput}
          />
          <TextInput
            placeholder="Enter Player TagLine"
            value={tagLine}
            onChangeText={handleChange}
            style = {styles.textInput}
          />

          {/* create the search button */}
          <TouchableWithoutFeedback onPress={handleSearch}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Search</Text>
            </View>
          </TouchableWithoutFeedback>

          {/* create output box */}
          <ScrollView> 
            <View style={styles.playerInfo}>
              <Text style={styles.title} >Player Name: {data.gameName}</Text>
              <Text style={styles.title}>Player TagLine: {data.tagLine}</Text>
              <Text style={styles.desc} >Player UUID: {data.puuid}</Text>
              <Text style={styles.desc} >Try to find my account! Username: Phrog | TagLine: 4189</Text>
            </View>
          </ScrollView>
          <View>
            <Text style={styles.error}>{data.status? data.status.message:null}</Text>
          </View>
      </View>
    </ImageBackground>
  );
};
//---------------------------------------------------------------------

const Stack = createNativeStackNavigator();

// calls all the screens
export default function App() {
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Home'}} />
          <Stack.Screen name="CharacterLookup" component={CharecterScreen} options={{title: 'Charecters'}} />
          <Stack.Screen name="WeaponSkins" component={WeponsScreenScreen} options={{title: 'Wepon Skins'}} />
          <Stack.Screen name="AccountLookUp" component={AccountlookUp} options={{title: 'Account Finder'}} />
          <Stack.Screen name="Details" component={DetailsScreen} options={{title: 'Details'}} />
        </Stack.Navigator>
        <StatusBar style="auto" />
      </NavigationContainer>
  );
}

// Elements styles
const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
  },

  charecters:{
    paddingHorizontal: 80,
    borderColor: 'white',
    borderRadius: 7,
    margin:20,

    borderWidth: 3,
  },

  abilitiesContainer: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor:"#d7d528",
    paddingTop: 20,
    borderBlockColor: 'black',
    borderRadius: 7,
    margin:10,
    borderWidth: 2,
  },

  abilities: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor:"#ee5f67",
    paddingTop: 20,
    borderBlockColor: 'black',
    borderRadius: 7,
    margin:10,
    borderWidth: 2,

  },

  logo: {
    paddingTop: 10,
    width: 175,
    height: 150,
  },

  logosm: {
    width: 125,
    height: 125,
  },

  img: {
    width:500,
    height:500,

  },

  desc: {
    marginHorizontal: 20,
    paddingVertical: 30, 
    textAlign: 'center'
  },
  mainDesc: {
    marginHorizontal: 100,
    paddingVertical: 30, 
    textAlign: 'center',
    color: 'white'
  },

  title: {
    fontSize: 28,
    paddingTop: 15,
    textAlign: 'center',
  },

  titleName: {
    fontSize: 28,
    paddingTop: 15,
    textAlign: 'center',
    color: 'white'
  },

  agentTitle: {
    fontSize: 28,
    paddingTop: 15,
    textAlign: 'center',
    paddingBottom: 5,
  },

  creator: {
    textAlign: 'center',
    color: 'white'
  },

  weponImg: {
    width:360,
    height:200,
    resizeMode:'contain'
  },

  imgContainer: {
    paddingVertical:30,
    borderBottomColor: 'black',
    borderBottomWidth: 3,
  },

  playerInfo: {
    flex: 1,
    justifyContent: "center", 
    alignItems: "center",
    backgroundColor:"#f3bc59",
    paddingTop: 20,
    borderBlockColor: 'black',
    borderRadius: 7,
    margin:10,
    borderWidth: 2,
  },

  error:{
    textAlign: 'center',
    color: 'red',
  },

  textInput: {
    borderWidth: 2,
    borderColor: "black",
    paddingVertical: 10,
    textAlign: 'center',
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#e9e9ec',
  },

  bg: {
    resizeMode: 'cover',
    flex: 1
  },

  btn: {
    paddingHorizontal:20,
    paddingVertical:10,
    backgroundColor:'#db3731',
    borderRadius:10,
    elevation:5
  },

  btn1: {
    position:"absolute",
    marginTop:25,
    width:190,
    height:405,
    resizeMode:'cover',
    display: 'flex'
  },


  btn2: {
    position:"absolute",
    marginTop:25,
    width:175,
    height:405,
    display: 'flex'
    
  },

  btn3: {
    marginTop:440,
    width:380,
    height:250,
    resizeMode:'cover',

  },

  btnText: {
    fontSize:20,
    color:'white',
    textAlign:'center'
  },

  center: {
    alignItems: 'center'
  },

  start: {
    alignItems: 'flex-start',
    marginLeft:7
  },
  end: {
    alignItems: 'flex-end',
    marginRight: 7
  },
});

