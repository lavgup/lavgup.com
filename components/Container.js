import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { Flex, Box, Center, chakra } from '@chakra-ui/react';

function Container({ children, isMainPage }) {
    return (
        <>
            <Nav isMainPage={isMainPage} />
            <Center>
                <Flex
                    as="main"
                    justifyContent="center"
                    flexDirection="column"
                    position="relative"
                    px={[0, 4, 4]}
                    mt={[0, 10, 10]}
                    w="full"
                    mx="auto"
                    maxW="3xl"
                >
                    {children}
                </Flex>
            </Center>
        </>
    )
}

export default Container;