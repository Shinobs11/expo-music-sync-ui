import { StyleSheet, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';
import data from '../playlists.json'
import { RootTabScreenProps } from '../types';
import Example from '../components/Example';
import AppBar from '../components/AppBar';
import ContentItem from '../components/base/ContentItem'
import PlaylistList from '../components/ContentList'
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View
    
    >
        {/* <Example/> */}
        <AppBar/>
        <PlaylistList data={data}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});
