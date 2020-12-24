import React from 'react';
import {
    Flex,
    Spacer,
    IconButton,
    useColorMode
} from '@chakra-ui/react';
import { FaMoon, FaSun } from 'react-icons/fa';

function Nav(props) {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex
            align="center"
            justify="space-between"
            pt="1.5rem"
            pr="1.5rem"
            {...props}
        >
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