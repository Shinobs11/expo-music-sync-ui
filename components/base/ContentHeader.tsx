import React from 'react';
import { StyleSheet,  View, Text, Image} from 'react-native';
import customTypes from '../../types/CustomTypes';

import {useTheme} from '@react-navigation/native';


interface PropsType {
    images: customTypes.ImageObject,
    name: string,
    owner?: string,
    type: string,

}


const ContentHeader = (props:PropsType) =>{
const { dark, colors } = useTheme();
const s = StyleSheet.create({
    topContainer:{
        display: "flex",
        flexDirection: 'row',
        height: 180,
        width: "100%"
    },
    sideContainer:{
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        flexWrap:'wrap',
        width: "100%"
    },
    image:{
        height: 160,
        width: 160
    },
    imageContainer:{
        paddingHorizontal:12,
        paddingTop:0,
        paddingBottom:10
    },
    nameStyle:{
        flex: 1,
        color:colors.text,
        fontSize:28,
        fontWeight: 'bold'
    }
})
    return(
    <View style={s.topContainer}>
        <View style={s.imageContainer}>
        <Image
        accessibilityLabel={props.name}
        style={s.image}
        source={{uri:props.images.url}}
        />
        </View>
        <View style={s.sideContainer}>
        <Text 
        selectable
        style={s.nameStyle}>
            {props.name}
        </Text>
        </View>
    </View>
    )
}




export default ContentHeader;