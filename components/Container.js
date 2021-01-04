import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import { Flex, Box, chakra } from '@chakra-ui/react';

function Container({ children, isMainPage }) {
    return (
        <>
            <Nav isMainPage={isMainPage} />
            <Box alignSelf="center">
                <Flex
                    as="main"
                    justifyContent="center"
                    flexDirection="column"
                    px={[0, 4, 4]}
                    mt={[0, 8, 8]}
                >
                    {children}

                    <Box alignSelf="center">
                        <chakra.footer children={<Footer />}
                                       position="fixed"
                                       bottom={0}
                                       right={2}
                                       textAlign="center"
                        />
                    </Box>
                </Flex>
            </Box>
        </>
    )
}

export default Container;