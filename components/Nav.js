import React from 'react';
import NextLink from 'next/link';
import {
    Flex,
    Spacer,
    Button,
    Text,
    IconButton,
    useColorMode
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

function Nav({ isMainPage = false }) {
    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <Flex
            align="center"
            justify="space-between"
            pt="1.5rem"
            pr="1.5rem"
            pl="1.5rem"
        >
            {!isMainPage &&
            <NextLink href="/">
                <Button variant="ghost" p={[1, 4]}>
                    <Text fontSize="md">
                        Lav
                    </Text>
                </Button>
            </NextLink>
            }
            <Spacer />
            <Spacer />
            <IconButton
                bg="transparent"
                aria-label="toggle color mode"
                icon={colorMode === 'light' ? <FaMoon size={17} /> : <FaSun size={17} /> }
                onClick={toggleColorMode}
                color={colorMode === 'light' ? 'black' : 'white'}
            />
        </Flex>
    );
}

export default Nav;