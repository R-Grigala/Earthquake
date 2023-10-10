import { StatusBar } from 'expo-status-bar';
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners'
import theme from './src/theme/theme';
import themeContext from './src/theme/themeContext';
import 'react-native-gesture-handler';
// import * as Location from 'expo-location';
import { NotificationListner, requestUserPermission } from './src/utils/pushNotification';
import MyTabs from './src/navigation/tabs/MyTabs';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [locPermission, setLocPermission] = useState('');

  // const locationPermission = async () => {
  //   let { status } = await Location.requestForegroundPermissionsAsync();
  //   if (status === "granted") {
  //     // Permission to access location was granted
  //     alert('Permission to access location was granted');
  //   } else {
  //     // Permission to access location was denied
  //     alert('Permission Not access location was denied');
  //   }
  // }

  useEffect(() => {
    // const checkPermission = async () => {
    //   const status = await locationPermission();
    //   setLocPermission(status);
    //   console.log(locPermission)
    // };

    try{
      requestUserPermission();
      NotificationListner();
    }catch(error){
      console.log("Failed", error)
    }

    checkPermission(); // Initial permission check

    const listener = EventRegister.addEventListener('ChangeTheme', (data) =>{
      setDarkMode(data)
      console.log(data)
    })
    return () => {
      EventRegister.removeAllListeners(listener)
    }
  }, [darkMode])
  return (
    <themeContext.Provider value={darkMode === true ? theme.dark : theme.light}>
      <NavigationContainer theme={darkMode === true ? DarkTheme : DefaultTheme}>
        <MyTabs />
        <StatusBar style="black" />
      </NavigationContainer>
    </themeContext.Provider>
  );
}
