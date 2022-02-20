/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Platform, Dimensions, StyleSheet, PixelRatio, useWindowDimensions, Button, Text, View, Animated } from 'react-native'
import {useState} from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import { HStack, Icon, IconButton } from 'native-base';




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
    const { dark, colors } = useTheme();
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

    //TODOS: For now I'm going to implement toggle for the text, but I'd like to be able to animate through this prop if
    // it doesn't hurt performance
    //TODOS: Migrate away from native-base components when ready, I don't think they'll provide great performance.
    return (
        <>
            <HStack style={s.container}>
                <HStack style={s.textView}>
                    { props.headerText && props.scrollPos ? 
                    <Animated.Text style={{opacity:animateOpacity(props.scrollPos as React.MutableRefObject<Animated.Value>),...s.text}}>
                        {props.headerText}
                    </Animated.Text>
                    :
                    <Text style={s.text}>
                        Hello there!
                    </Text>
                    }
                </HStack>
                <HStack>
                    <IconButton icon={<Icon as={MaterialIcons} name="search" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="favorite" size="sm" color="white" />} />
                    <IconButton icon={<Icon as={MaterialIcons} name="settings" size="sm" color="white" />} />
                </HStack>
            </HStack>
        </>
    )
}




export default AppBar;