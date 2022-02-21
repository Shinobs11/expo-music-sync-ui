import { StyleSheet } from 'react-native';
import AppBar from '../components/AppBar';
import {View, Text} from 'react-native';
import ContentHeader from '../components/base/ContentHeader';
import customTypes from '../types/CustomTypes';
import { RootTabScreenProps } from '../types';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';



//album - MaterialIcons
//person-circle - MaterialIcons - Use this for profile page?
//account-music / account-music-outline - MaterialCommunityIcons - Use this for Artists?
//queue-music - MaterialIcons - use for queue
// music-box-multiple - MaterialCommunityIcons - use this for playlists
//heart or heart-multiple for liked songs - MaterialCommunityIcons
export default function LibraryScreen({navigation, route}: RootTabScreenProps<"Library">) {
    const {colors, dark} = useTheme();
    const styles = StyleSheet.create({
        container: {
          height:"100%",
          width: "100%"
        },
        textBarContainer: {
            width: "100%",
            height: 40,
            marginHorizontal: 30
        },
        textBarText:{
            fontSize:28,
            color: colors.text
        }
      });
      

    const TextBar = ({name}:{name:string}) =>{
        return(
        <View style={styles.textBarContainer}>
            <Text style={styles.textBarText}>
                {name}
            </Text>
        </View>
        )
    }
  return (
    <View style={styles.container}>
        <AppBar />
        <TextBar name={"Playlists"}/> 
        <TextBar name={"Artists"}/>
        <TextBar name={"Albums"}/>
        <TextBar name={"Recently Played"}/>  
        <TextBar name={"Liked Songs"}/>     
    </View>
  );
}

