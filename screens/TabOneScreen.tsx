import { StyleSheet, View } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';

import { RootTabScreenProps } from '../types';
import Example from '../components/Example';
import AppBar from '../components/AppBar';
import ContentItem from '../components/base/ContentItem'
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View>
        {/* <Example/> */}
        <AppBar/>
        <ContentItem/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  }
});
