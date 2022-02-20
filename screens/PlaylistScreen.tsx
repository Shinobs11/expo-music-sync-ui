/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */


import { Animated, Platform, StyleSheet } from 'react-native';
import { RootStackScreenProps } from '../types';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import React, { useRef } from 'react';
import AppBar from '../components/AppBar';
import ContentList from '../components/ContentList';
import lizziePlaylistItems from '../test-data/lizziePlaylistItems.json'
import customTypes from '../types/CustomTypes';

export default function PlaylistScreen(props:RootStackScreenProps<any>) {

    const scrollY = useRef(new Animated.Value(0));
    const data = lizziePlaylistItems.items as customTypes.PagingObject<customTypes.PlaylistTrackObject>["items"]
    const playlistItems = data.map((x)=>x.track) as customTypes.TrackObjectFull[];
  return (
    <View
    style={styles.container}
    >
        {/* <Example/> */}
        <AppBar scrollPos={scrollY} headerText={"Lizzie + Shino"}/>
        <ContentList 
        scrollY={scrollY} 
        type={"playlist"}
        data={playlistItems}
        listShape={"bar"}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
