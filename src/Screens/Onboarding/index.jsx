import {View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const index = () => {
  const navigation = useNavigation();

  const generateUsername = () => {
    const randomNum = Math.floor(1 + Math.random() * 90);
    return `${randomNum}`;
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View
        style={{
          gap: 10,
        }}>
        <Text style={{color: 'black'}}>Join Live Trivia Game</Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('MainScreen', {username: generateUsername()})
          }
          style={{
            backgroundColor: 'black',
            paddingHorizontal: 25,
            paddingVertical: 10,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>Join</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default index;
