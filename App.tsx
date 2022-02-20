import {View, StyleSheet, StatusBar, Platform} from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, ColorMode } from 'native-base';
import type { StorageManager} from 'native-base';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { useTheme, DefaultTheme, DarkTheme } from '@react-navigation/native';
import AppBar from './components/AppBar';
export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
    


//----------------------------------------------------------------------------------------------    


const theme = (colorScheme === 'dark') ? DarkTheme : DefaultTheme



  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        
    <NativeBaseProvider >
    <SafeAreaProvider>
      <StatusBar backgroundColor={Platform.OS == 'android' ? theme.colors.background: undefined }  />
      
        <Navigation colorScheme={colorScheme} /> 
      </SafeAreaProvider>
      </NativeBaseProvider>
    );
  }
}
