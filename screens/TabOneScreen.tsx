import { StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text } from '../components/Themed';
import {View} from 'native-base';
import { RootTabScreenProps } from '../types';
import Example from '../components/Example';
export default function TabOneScreen({ navigation }: RootTabScreenProps<'TabOne'>) {
  return (
    <View>
        {/* <Example/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
