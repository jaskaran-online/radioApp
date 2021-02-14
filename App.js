import React from 'react';
// eslint-disable-next-line prettier/prettier
import { StyleSheet, Text, SafeAreaView, View, Image, Pressable } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const App = () => {
  return (
    <SafeAreaView>
      <View style={styles.mainView}>
        {/* Header Section */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: '5%' }}>
            <FontAwesome size={35} name="list-alt" color="white" />
            <FontAwesome size={35} name="pause-circle" color="white" />
          </View>

          <Text style={{ alignSelf: 'center', marginTop: 15, fontSize: 40, color: 'white', fontWeight: 'bold' }}>Radio App</Text>
        </View>

        {/* Body */}
        <View style={styles.body}>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
            <View style={{ alignItems: 'center', justifyContent: 'center', height: 200, width: 200, overflow: 'hidden', borderRadius: 100 }}>
              <Image
                source={{
                  height: 200,
                  width: 200,
                  uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTFcNFNc0KvDR99vzYCJMSMyYRf9DNDDqZPQ&usqp=CAU',
                }}
              />
            </View>
            <View style={{ alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold' }}>Radio Mirchi</Text>
              <Text style={{ color: 'white', fontSize: 20, }}>98.3 FM</Text>
              <Text style={{ color: 'white', fontSize: 15, }}>Playing Now</Text>
            </View>
          </View>
        </View>

        {/* footer */}
        <View style={styles.footer}>
          <Pressable onPress={() => console.log('welcome')}>
            <FontAwesome size={35} name="backward" color="white" />
          </Pressable>
          <FontAwesome size={60} name="pause-circle" color="white" />
          <FontAwesome size={35} name="forward" color="white" />
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
