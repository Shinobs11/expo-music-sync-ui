import React from 'react';
import { VStack, Box, Divider, Text } from 'native-base';
import { useTheme } from '@react-navigation/native'


const ContentItem = () => {
    const { dark, colors } = useTheme();
    return (
        <Box >
            <Box h={} w={} bg="#FFFFFF"/>
                <Box px="4" pt="4">
                    <Text color={colors.text}>
                        NativeBase
                    </Text>
                </Box>
        </Box>
    )
}


export default ContentItem;






