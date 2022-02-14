import { StatusBar } from 'expo-status-bar';
import type { StorageManager } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeBaseProvider, extendTheme, ColorMode } from 'native-base';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

    //----------------------------------------------------
    //customizing theme through extendTheme
    const newColorTheme = {
        brand:{
            900: '#8287af',
            800: '#7c83db',
            700: '#b3bef6',
        }
    }
    //can pass resulting theme object as props to NativeBaseProvider
    const theme = extendTheme({colors: newColorTheme})
    //-----------------------------------------------------

    //providing dark-light mode functionality using AsyncStorage to keep settings.
const colorModeManager: StorageManager = {
    get: async () => {
      try {
        let val = await AsyncStorage.getItem('@my-app-color-mode');
        if (!val){
            val = colorScheme; // lil bit extra to utilize system preferred if no pre-set setting
        }
        return val === 'dark' ? 'dark' : 'light';
      } catch (e) {
        console.log(e);
        return 'light';
      }
    },
    set: async (value: ColorMode) => {
      try {
        await AsyncStorage.setItem('@my-app-color-mode', value as string);
      } catch (e) {
        console.log(e);
      }
    },
  };
  //I can then pass colorModeManager in as props to the provider and voila
  //------------------------------------------------------------------------
  //using linear gradient woo
  const config = {
    dependencies: {
      // For Expo projects (Bare or managed workflow)
      'linear-gradient': require('expo-linear-gradient').LinearGradient,
      // For non expo projects
      // 'linear-gradient': require('react-native-linear-gradient').default,
    },
  };
  
//----------------------------------------------------------------------------------------------    












  if (!isLoadingComplete) {
    return null;
  } else {
    return (
        //provides theme to rest of app components using react's context api
      <NativeBaseProvider config={config}  theme={theme} colorModeManager={colorModeManager}>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </NativeBaseProvider>
    );
  }
}
