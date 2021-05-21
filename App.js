import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  ToastAndroid,
  Pressable,
  Animated,
  Easing,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {readioMirchi, bigFm} from './app/RadioChannels';

TrackPlayer.add([readioMirchi, bigFm]).then(function () {
  // The tracks were added
  console.log('Tracks Added');
});

const App = () => {
  // States
  const [title, setTitle] = useState(readioMirchi.title);
  const [artWork, setArtWork] = useState(readioMirchi.artwork);
  const [artist, setArtist] = useState(readioMirchi.artist);
  const [isSongPlay, setStatus] = useState(false);

  const showToast = (message) => {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  };

  const updateCurrentChanelDetails = async () => {
    let trackId = await TrackPlayer.getCurrentTrack();
    let currentTrack = await TrackPlayer.getTrack(trackId);

    setArtWork(currentTrack.artwork);
    setTitle(currentTrack.title);
    setArtist(currentTrack.artist);
  };

  const playNext = () => {
    TrackPlayer.skipToNext();
    updateCurrentChanelDetails();
  };

  const playPrevius = () => {
    updateCurrentChanelDetails();
    TrackPlayer.skipToPrevious();
  };

  const playPauseChanel = () => {
    isSongPlay ? TrackPlayer.play() : TrackPlayer.pause();
    updateCurrentChanelDetails();
    setStatus(!isSongPlay);
  };

  let rotateValueHolder = new Animated.Value(0);

  const startImageRotateFunction = () => {
    rotateValueHolder.setValue(0);
    Animated.timing(rotateValueHolder, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => startImageRotateFunction());
  };

  const rotateData = rotateValueHolder.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  !isSongPlay ? startImageRotateFunction() : '';

  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: '5%',
            }}>
            <FontAwesome size={35} name="list-alt" color="white" />
            <Pressable
              onPress={() => {
                TrackPlayer.stop();
                setStatus(false);
              }}>
              <FontAwesome size={35} name="stop-circle" color="white" />
            </Pressable>
          </View>

          <Text style={styles.AppTitle}>Radio App</Text>
          <Text
            style={{
              alignSelf: 'center',
              marginTop: 5,
              fontSize: 10,
              color: 'white',
            }}>
            Developed by Jaskaran Singh
          </Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={styles.bodyContainer}>
            <View style={styles.chanelDetailSection}>
              <Animated.Image
                style={{
                  width: 200,
                  height: 200,
                  transform: [{rotate: rotateData}],
                }}
                source={{
                  height: 200,
                  width: 200,
                  uri: artWork,
                }}
              />
            </View>
            <View style={{alignItems: 'center'}}>
              <Text style={styles.ChanelTitle}>{title}</Text>
              <Text style={styles.chanelNumber}>{artist} FM</Text>
              <Text style={{color: 'white', fontSize: 15}}>
                {isSongPlay ? 'Paused' : 'Playing Now'}
              </Text>
            </View>
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Pressable onPress={playPrevius}>
            <FontAwesome size={35} name="backward" color="white" />
          </Pressable>

          <Pressable onPress={playPauseChanel}>
            <FontAwesome
              size={60}
              name={isSongPlay ? 'play-circle' : 'pause-circle'}
              color="white"
            />
          </Pressable>
          <Pressable onPress={playNext}>
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
  ChanelTitle: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
  },
  chanelNumber: {color: 'white', fontSize: 20},
  bodyContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  chanelDetailSection: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    width: 200,
    overflow: 'hidden',
    borderRadius: 100,
  },
  AppTitle: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
});
