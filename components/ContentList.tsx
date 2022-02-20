/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import ContentItem from './base/ContentItem';
import type { Component, SyntheticEvent } from "react";
import { FlatList, ListRenderItemInfo, NativeScrollEvent, View, NativeSyntheticEvent, Animated } from 'react-native';
import { useNavigation, useTheme, CompositeNavigationProp} from '@react-navigation/native';
import { Container, Heading, Image } from 'native-base';
import customTypes from '../types/CustomTypes';
import { ContentItemProps } from './base/ContentItem';
import Navigation from '../navigation/index';
import { RootTabScreenProps, RootStackParamList, RootStackScreenProps} from '../types';
import { NativeStackScreenProps, NativeStackNavigationProp } from '@react-navigation/native-stack';
import ContentHeader from '../components/base/ContentHeader';


//TODOS: generalize component to reuse for other types of lists

//Screw typescript + react-navigation oh my god i give up on trying to figure out the mess of properly typing navigators
type PropsType = {
    data: customTypes.ContentListResponseData[],
    type: string,
    scrollY: React.MutableRefObject<Animated.Value>,
    listShape: "box" | "bar" | "thin-bar"
}

/**
 * One thing to note is that every playlist image is going to be of the form
 * https://mosaic.scdn.co/${60 | 300 | 640}/${some id}
    Meaning that I don't necessairly need to pass all of these image ids around, only one.
*/


//TODO: just so i don't forget, remember to implement a loading icon for when im getting the images.

const renderedItem = ({ item, index, separators }: ListRenderItemInfo<ContentItemProps>) => {
    const {image, itemData, contentName, contentOwner, nav, imageShape, contentShape} = item;
    return (
        
        <ContentItem
        itemData={itemData}
        image={image} 
        contentName={contentName}
        contentOwner={contentOwner ? contentOwner : undefined}
        contentShape={contentShape}
        imageShape={imageShape}
        nav={nav}
        />
    )


}




const PlaylistList = (props:PropsType) => {
    const theme = useTheme();
    const navigation = useNavigation();
    const { data, scrollY, type, listShape } = props;
    const parseListData = (data:unknown,type:string)=>{
        //todos: Try to implement support for full objects
    
        const loadedNav = (data:customTypes.ContentListResponseData)=>{
            return()=>{
            const common:customTypes.CommonContentProperties =  {
                external_url:data.external_urls,
                href: data.href,
                id: data.id,
                name: data.name,
                type: data.type,
                uri: data.uri
            }
            navigation.navigate(data.type, common)
        }
        }
    
        const parseAlbumData = (data:customTypes.AlbumObjectSimplified) =>{
            
                return {
                    itemData: {
                    artists: data.artists,
                    id: data.id,
                    images: data.images,
                    name: data.name,
                    release_date: data.release_date,
                    total_tracks: data.total_tracks,
                    type: data.type,
                },
                nav: loadedNav(data),
                contentShape: listShape,
                imageShape: "square",
                contentName: data.name,
                image: data.images[0].url
            }
        }
        const parsePlaylistData = (data:customTypes.PlaylistObjectSimplified) =>{
                return {
                    itemData:{
                    collaborative: data.collaborative,
                    description: data.description,
                    id: data.id,
                    images: data.images,
                    name: data.name,
                    owner: data.owner,
                    public: data.public,
                    tracks: {
                        href: data.tracks.href,
                        total: data.tracks.total
                    },
                    type:data.type,
                    
                },
                nav: loadedNav(data),
                contentShape: listShape,
                imageShape: "square",
                contentName: data.name,
                image: data.images[0].url
                }
        }
        const parseArtistData = (data:customTypes.ArtistObjectFull) =>{
                return{
                    itemData:{
                    name: data.name,
                    id: data.id,
                    followers: data.followers,
                    genres: data.genres,
                    popularity: data.popularity,
                    images: data.images,
                    type: data.type,
                },
                nav: loadedNav(data),
                contentShape: listShape,
                imageShape: "avatar",
                contentName: data.name,
                image: data.images[0].url
            }
        }
    
        const parseTrackData = (data:customTypes.TrackObjectSimplified) =>{
            return {
                itemData:{
                artists: data.artists,
                duration_ms: data.duration_ms,
                explicit: data.explicit,
                data: data.external_urls,
                href: data.href,
                id: data.id,
                //is_playable
                name: data.name,
                track_number: data.track_number,
                },
                nav: loadedNav(data),
                contentShape: listShape,
                imageShape: "no-image",
                contentName: data.name,
            }
        }
        switch(type){
            case "album":{
                const albumData = data as customTypes.AlbumObjectSimplified[];
                return albumData.map(parseAlbumData)
            }
            case "artist":{
                const artistData = data as customTypes.ArtistObjectFull[];
                return artistData.map(parseArtistData);
            }
            case "playlist":{
                const playlistData = data as customTypes.PlaylistObjectSimplified[];
                return playlistData.map(parsePlaylistData)
            }
            default:{
                const trackData = data as customTypes.TrackObjectSimplified[];
                return trackData.map(parseTrackData)
            }
        }        
    }
    

   
    const parsedData = parseListData(data, type);

    const image:customTypes.ImageObject = {height:null,url:"https://blend-playlist-covers.spotifycdn.com/v2/blend_LARGE-gold-yellow-en.jpg",width:null}
    return (
        
        <Animated.FlatList
        //todos: Make Header conditional based on some props, idk how im going to do this with the different screens yet tho
            ListHeaderComponent={<ContentHeader
                name="Lizzie + shino Lizzie + shino"
                images={image}
                type="playlist"
                colorTheme={theme}
                />}
            data={parsedData}
            renderItem={renderedItem}
            keyExtractor={(item, index) => { return (parsedData[index].itemData.id) }}
            style={{alignSelf:"flex-start", width: "100%", height:"100%"}}
            onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: scrollY.current}}}],
                {useNativeDriver: true}
            )}
        />
    )
}
export default PlaylistList;