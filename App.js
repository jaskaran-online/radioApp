import React,{ useState } from 'react';
// eslint-disable-next-line prettier/prettier
import { StyleSheet, Text, SafeAreaView, View, Image, ToastAndroid, Pressable } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

var readioMirchi = {
  id: '1', // Must be a string, required
  url: 'https://radioindia.net/radio/mirchi98/icecast.audio', // Load media from the network

  title: 'Radio Mirchi',
  artist: '98.3',
  album: 'Radio Mirchi',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  // Load artwork from the network
  artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFcNFNc0KvDR99vzYCJMSMyYRf9DNDDqZPQ&usqp=CAU',
};

var bigFm = {
  id: '2', // Must be a string, required
  url: 'https://radioindia.net/radio/sc-bb/icecast.audio', // Load media from the network

  title: 'Big Fm',
  artist: '92.7',
  album: 'Big Fm',
  genre: 'Progressive House, Electro House',
  date: '2014-05-20T07:00:00+00:00', // RFC 3339
  // Load artwork from the network
  artwork: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTR6Qlqftasp7LaIJJIWmSwu0IJI-dWSpfxw&usqp=CAU',
};

TrackPlayer.add([readioMirchi, bigFm]).then(function () {
  // The tracks were added 
   console.log('Tracks Added');
});

const App = () => {

  const [title, setTitle] = useState(readioMirchi.title);
  const [artWork, setArtWork] = useState(readioMirchi.artwork);
  const [artist, setArtist] = useState(readioMirchi.artist);
  
  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '5%' }}>

            <FontAwesome size={35} name="list-alt" color="white" />
            <Pressable onPress={() => {
              showToast("Radio Stop");
              TrackPlayer.stop();
            }}>
              <FontAwesome size={35} name="stop-circle" color="white" />
            </Pressable>
          </View>

          <Text style={{ alignSelf: 'center', marginTop: 15, fontSize: 40, color: 'white', fontWeight: 'bold' }}>Radio App</Text>
          <Text style={{ alignSelf: 'center', marginTop: 5, fontSize: 10, color: 'white' }}>Developed by J@s</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 200, width: 200, overflow: 'hidden', borderRadius: 100 }}>
              <Image
                source={{
                  height: 200,
                  width: 200,
                  uri: artWork ,
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>{ title }</Text>
              <Text style={{ color: 'white', fontSize: 20, }}>{artist} FM</Text>
              <Text style={{ color: 'white', fontSize: 15, }}>Playing Now</Text>
            </View>
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>

          <Pressable onPress={ async () => {
            showToast('Play Previeus Raio');
            TrackPlayer.skipToPrevious();

            let trackId = await TrackPlayer.getCurrentTrack();
            let currentTrack = await TrackPlayer.getTrack(trackId);

            setArtWork(currentTrack.artwork);
            setTitle(currentTrack.title);
            setArtist(currentTrack.artist);

          }}>
            <FontAwesome size={35} name="backward" color="white" />
          </Pressable>

          <Pressable onPress={async () => {
            let state = await TrackPlayer.getState();
            showToast('Start Playing Radio');
            TrackPlayer.play();

            console.log(state);

            let trackId = await TrackPlayer.getCurrentTrack();
            let currentTrack = await TrackPlayer.getTrack(trackId);

            setArtWork(currentTrack.artwork);
            setTitle(currentTrack.title);
            setArtist(currentTrack.artist);
          }}>

            <FontAwesome size={60} name="pause-circle" color="white" />
          </Pressable>
          <Pressable onPress={ async () => {
            showToast('Playing Next Radio');
            TrackPlayer.skipToNext();

            let trackId = await TrackPlayer.getCurrentTrack();
            let currentTrack = await TrackPlayer.getTrack(trackId);

            setArtWork(currentTrack.artwork);
            setTitle(currentTrack.title);
            setArtist(currentTrack.artist);

          }}>
            <FontAwesome size={35} name="forward" color="white" />
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: '#4b014b',
  },
  header: {
    width: '100%',
    height: '25%',
    backgroundColor: '#e1e1e12e',
    padding: 20,
    borderBottomLeftRadius: 80,
    borderBottomRightRadius: 80,
  },
  body: {
    height: '50%',
    padding: 20,
  },
  footer: {
    flexDirection: 'row',
    height: '25%',
    backgroundColor: '#e1e1e12e',
    padding: '18%',
    borderTopLeftRadius: 80,
    borderTopRightRadius: 80,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
