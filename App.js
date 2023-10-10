import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { requestUserPermission, NotificationListner } from './src/utils/pushNotification'


export default function App() {

  useEffect(() => {
    try{
      requestUserPermission();
      NotificationListner();
    }catch(error){
      console.log("Failed", error)
    }
  },[])

  return (
    <View style={StyleSheet.container}>
      
      <Text style={{color:'red', margin:80}}>Earthquakes Using React Native & Expo</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:80,
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
  },
})