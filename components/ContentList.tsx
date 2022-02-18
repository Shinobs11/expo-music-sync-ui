import ContentItem from './base/ContentItem';
import type { Component } from "react";
import { FlatList, ListRenderItemInfo, View } from 'react-native';
import { Container, Heading, Image } from 'native-base';
import customTypes from '../types/CustomTypes';
import { ContentItemProps } from './base/ContentItem';


//TODOS: generalize component to reuse for other types of lists


interface PropsType {
    data: customTypes.ListOfCurrentUsersPlaylistsResponse
}

/**
 * One thing to note is that every playlist image is going to be of the form
 * https://mosaic.scdn.co/${60 | 300 | 640}/${some id}
    Meaning that I don't necessairly need to pass all of these image ids around, only one.
*/


//TODO: just so i don't forget, remember to implement a loading icon for when im getting the images.

const renderedItem = ({ item, index, separators }: ListRenderItemInfo<ContentItemProps>) => {
    const {image, contentName, contentOwner} = item;
    return (
        
        <ContentItem image={image} contentName={contentName} contentOwner={contentOwner ? contentOwner : undefined}
        contentShape={"bar"} imageShape={"square"}
        />
    )


}



const PlaylistList = ({ data }: PropsType) => {

    const parsedData = data.items.map((x) => {
        return (
            {
                contentItemData:
                {
                    image: x.images[0].url,
                    contentName: x.name,
                    contentOwner: x.owner.display_name,
                    contentShape: "bar",
                    imageShape: (x.type == "artist") ? "avatar" : "square"
                },
                key: x.id
            } as {contentItemData:ContentItemProps, key:string })
    })


    return (
        
        <FlatList
            data={parsedData.map(x => x.contentItemData) as ReadonlyArray<ContentItemProps>}
            renderItem={renderedItem}
            keyExtractor={(item, index) => { return (parsedData[index].key) }}
            style={{alignSelf:"flex-start", width: "100%", height:"100%"}}
        />
    )
}
export default PlaylistList;