/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Platform, Dimensions, StyleSheet, PixelRatio, useWindowDimensions, Button, Text, View, Animated, Pressable } from 'react-native'
import {useState} from 'react';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { useTheme, useNavigation } from '@react-navigation/native';
import { HStack } from 'native-base';
import { RootStackScreenProps, RootStackParamList } from '../types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';






//top padding 285-257 = 28
//bot padding 239-218 = 21
//left padding 253-238 =15
//right padding 377-361 =16


//TODOS: Have a smooth transition between ContentHeader fading and the Content title appearing on AppBar
interface PropType {
    headerText?: string,
    scrollPos?: React.MutableRefObject<Animated.Value>
}


const AppBar = (props: PropType) => {
    const {colors, dark} = useTheme()
    const navigation = useNavigation();
    //TODO: have some sort of state pass the contentHeaderHeight into this
    const animateOpacity = (scrollPos: React.MutableRefObject<Animated.Value>) =>{
        const contentHeaderHeight = 160;
        const inputRange = [
            0, contentHeaderHeight
        ]
        const outputRange = [
            0, 1
        ]
        return scrollPos.current.interpolate({inputRange:inputRange, outputRange: outputRange})
    }

    


    const { height, width } = useWindowDimensions();
    
    const s = StyleSheet.create({
        container: {
            paddingHorizontal: 15,
            paddingTop: 7,
            paddingBottom: 21,
            backgroundColor: colors.background,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: (0.09 * height),
            maxHeight: 80
        },
        textView: {
            alignItems: "center"
        },
        text: {
            color: colors.text,
            fontSize: 20,
            fontWeight: "bold"
        },

    })
    const BackButton = ({nav}:{nav:any}) =>{
        const backNav = () =>{
                console.log("Back pressed");
                nav.goBack();
        }
        return(
                <Pressable onPress={backNav}>
                    <Ionicons  name="arrow-back" size={30} color={colors.text} />
                </Pressable>
        )
    }
    //TODOS: For now I'm going to implement toggle for the text, but I'd like to be able to animate through this prop if
    // it doesn't hurt performance
    //TODOS: Migrate away from native-base components when ready, I don't think they'll provide great performance.
    
    return (
        <>
            <HStack style={s.container}>

                <HStack style={s.textView}>
                    { props.headerText && props.scrollPos ?
                    <>
                    <BackButton nav={navigation}/>
                    <Animated.Text style={{opacity:animateOpacity(props.scrollPos as React.MutableRefObject<Animated.Value>),...s.text}}>
                        {props.headerText}
                    </Animated.Text>
                    </> 
                    :(
                    props.headerText ? <>
                    <BackButton nav={navigation}/>
                    <Text style={s.text}>
                        {props.headerText}
                    </Text>
                    </>
                    :
                    <Text style={s.text}>
                        Hello there!
                    </Text>
                    )
                    }
                </HStack>
                <HStack>
                    <MaterialIcons name="search" size={30} color={colors.text} />
                    <MaterialIcons name="favorite" size={30} color={colors.text} />
                    <MaterialIcons name="settings" size={30} color={colors.text} />
                </HStack>
            </HStack>
        </>
    )
}




export default AppBar;