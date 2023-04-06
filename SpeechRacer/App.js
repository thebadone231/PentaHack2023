import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import Calculator from './Scorecalculator.js';
import { useEffect } from 'react';


export default function App() {
  const [history, setHistory] =  useState([]);
  function updateScore(score) {
    setHistory(prevHistory => [...prevHistory, score]);
  }
  const displayhistory = history.map((value) => {
      return(<Text>{value}</Text>)
    })
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{Calculator("Hello I am Pipo mopo","Hollo me wa mopo pipo")}%</Text>
      <View>
        {history.map((item, index) => (
          <Text key={index}>{item}</Text>
        ))}
      </View>
      <Button
        title="Press me"
        onPress={()=>updateScore(3)}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
