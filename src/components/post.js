import React from 'react'
import { Box, HStack, Text } from "@chakra-ui/react";
import VoteButtons from './VoteButtons';

function post({item}) {
    return (
        <HStack key={item.id} w="100%" alignItems="flex-start" >
          <VoteButtons item={item} />  
         <Box bg="gray.100" p={4} rounded="md" w="100%" >
             <Text>{item.title} </Text>
         </Box>
           
       
        </HStack>
    )
}

export default post
