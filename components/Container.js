import Nav from './Nav';
import { Flex } from '@chakra-ui/react';

function Container({ children, isMainPage }) {
    return (
        <>
            <Nav isMainPage={isMainPage} />
            <Flex
                as="main"
                justifyContent="center"
                flexDirection="column"
                px={[0, 4, 4]}
                mt={[0, 8, 8]}
            >
                {children}
            </Flex>
        </>
    )
}

export default Container;