import React from 'react';
import { VStack,  Center, Box, Divider, Text, HStack} from 'native-base';
import { useTheme } from '@react-navigation/native'
import {StyleSheet, Image,  View} from 'react-native';
import { propsFlattener } from 'native-base/lib/typescript/hooks/useThemeProps/propsFlattener';

//todos: need to make a content item with an image to left and text to right
//todos: research caching images on react-native
export interface ContentItemProps{
    contentShape: "box" | "bar",
    imageShape: "square" | "avatar",
    contentName: string,
    contentOwner?: string,
    image?: string
}

const ContentItem = (props:ContentItemProps) => {
    const { dark, colors } = useTheme();
    const s = StyleSheet.create({
        container:{
            paddingHorizontal: 15,
            paddingVertical: 10,
            height:100,
            display:"flex",
            flexDirection:"row",
            
        },
        textContainer:{
        },
        image:{
            height: "100%",
            width: 100,    
        },

    })
    
    const Container = ({children}:{children:React.ReactNode}) =>{
        if(props.contentShape == "bar"){
        return(
            // <Box w={"100%"} h={"40"} style={s.container}>
                <View style={s.container} >
                    {children}
                </View>
            // </Box>
        )
        }
        else{
            return(
                <Box style={s.container}>
                    <VStack >
                        {children}
                    </VStack>
                </Box>
            )
        }
    }
    const ContentText = ()=>{
        if(props.contentOwner != undefined){
            return(
                <View style={s.textContainer} >
                <VStack >
                    <Text fontSize={14}   color={colors.text}>
                        {props.contentName}
                    </Text>
                    <Text fontSize={14}  color={colors.text}>
                        {props.contentOwner}
                    </Text>
                </VStack>
                </View>
            )
        }
        else{
            return(
                <View style={s.textContainer}>
            <Text fontSize={14} color={colors.text}>
                {props.contentName}
            </Text>
            </View>
            )
        }
    }



    
    return (
    
            <Container>
                
                <Image source={{uri: props.image}}
                // height={40}
                // width={40}
                style={s.image}
                resizeMode={"contain"}
                />
                
                <ContentText/>
                
            </Container>
            
    )
}


export default ContentItem;






