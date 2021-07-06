import React from 'react'
import {Box, Container, Flex} from '@chakra-ui/react';
import AddnewPosts from './AddnewPosts'

function navbar() {
    return (
        <Box position="sticky" top={0} p={4} bg="gray.100" zIndex={1} > 
        <Container maxW="md" centerContent >
            <Flex justifyContent="flex-end" w="100%" position="sticky" top={0} > 
            <AddnewPosts/>  

            </Flex>

        </Container>
           
        </Box>
    )
}

export default navbar
