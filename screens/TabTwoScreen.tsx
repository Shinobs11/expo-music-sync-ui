import { StyleSheet } from 'react-native';
import AppBar from '../components/AppBar';
import { Text, View } from '../components/Themed';
import ContentHeader from '../components/base/ContentHeader';
import customTypes from '../types/CustomTypes';

export default function TabTwoScreen() {
    
  return (
    <View style={styles.container}>
        <AppBar/>
        
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height:"100%",
    width: "100%"
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
