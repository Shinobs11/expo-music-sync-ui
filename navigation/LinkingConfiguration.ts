/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import { ContentTypes } from '../constants/ContentTypes';
import { RootStackParamList } from '../types';
import LibraryScreen from '../screens/LibraryScreen';

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          Home: {
            screens: {
              HomeScreen: 'home',
            },
          },
          Library: {
            screens: {
              LibraryScreen: 'library',
            },
          },
        },
      },
      Modal: 'modal',
      NotFound: '*',
      [ContentTypes.playlist]: ContentTypes.playlist,
      [ContentTypes.album]: ContentTypes.album,
      [ContentTypes.artist]: ContentTypes.artist,
    //   [ContentTypes.track]: ContentTypes.track why would a track have a dedicated screen?
    },
  },
};

export default linking;
