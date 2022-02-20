import ContentItem from './base/ContentItem';
import type { Component } from "react";
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Heading, Image } from 'native-base';
import customTypes from '../types/CustomTypes';
import { ContentItemProps } from './base/ContentItem';
import Navigation from '../navigation/index';
import { RootTabScreenProps, RootStackParamList} from '../types';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ContentHeader from '../components/base/ContentHeader';

//TODOS: generalize component to reuse for other types of lists


type PropsType = {
    data: customTypes.ListOfCurrentUsersPlaylistsResponse,
    navigation: RootTabScreenProps<'TabOne'>
}

/**
 * One thing to note is that every playlist image is going to be of the form
 * https://mosaic.scdn.co/${60 | 300 | 640}/${some id}
    Meaning that I don't necessairly need to pass all of these image ids around, only one.
*/


//TODO: just so i don't forget, remember to implement a loading icon for when im getting the images.

const renderedItem = ({ item, index, separators }: ListRenderItemInfo<ContentItemProps>) => {
    const {image, contentName, contentOwner, nav} = item;
    return (
        
        <ContentItem image={image} contentName={contentName} contentOwner={contentOwner ? contentOwner : undefined}
        contentShape={"bar"} imageShape={"square"} nav={nav}
        />
    )


}



const PlaylistList = ({ data, navigation }: PropsType) => {
    
    const nav = navigation.navigation
    
    
    const parsedData = data.items.map((x) => {
        
        const loadedNav = ()=>{
            const common:customTypes.CommonContentProperties =  {
                external_url:x.external_urls,
                href: x.href,
                id: x.id,
                name: x.name,
                type: x.type,
                uri: x.uri
            }
            nav.navigate(x.type, common)
        }
        return (
            {
                contentItemData:
                {
                    image: x.images[0].url,
                    contentName: x.name,
                    contentOwner: x.owner.display_name,
                    contentShape: "bar",
                    imageShape: (x.type == "artist") ? "avatar" : "square",
                    nav: loadedNav
                },
                key: x.id
            } as {contentItemData:ContentItemProps, key:string })
    })

    const image:customTypes.ImageObject = {height:null,url:"https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-gold-yellow-en.jpg",width:null}
    return (
        
        <FlatList
        //todos: Make Header conditional based on some props, idk how im going to do this with the different screens yet tho
            ListHeaderComponent={<ContentHeader
                name="Lizzie + shino Lizzie + shino"
                images={image}
                type="playlist"
                />}
            data={parsedData.map(x => x.contentItemData) as ReadonlyArray<ContentItemProps>}
            renderItem={renderedItem}
            keyExtractor={(item, index) => { return (parsedData[index].key) }}
            style={{alignSelf:"flex-start", width: "100%", height:"100%"}}
        />
    )
}
export default PlaylistList;