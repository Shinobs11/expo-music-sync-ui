import { Platform, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function PlaylistScreen({route, navigation}:RootStackScreenProps<'Playlist'>) {
    return (
    <View style={styles.container}>
      



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
