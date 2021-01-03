import React from 'react';
import {
    Flex,
    Link,
    Heading,
    Text,
    VStack,
    Box,
    Center,
    Spacer,
    useColorMode
} from '@chakra-ui/react';

function Project({ title, description, href }) {
    const { colorMode } = useColorMode();
    const borderColors = {
        light: 'gray.800',
        dark: 'gray.600'
    };

    const bg = {
        light: 'yellow.400',
        dark: 'teal.900'
    }

    return (
        <Box>
            <Center>
            <Link
                href={href}
                title={title}
                width="100%"
                isExternal
                _hover={{
                    bg: bg[colorMode]
                }}
            >
                <Box
                    border="0.5px solid"
                    borderRadius="5px"
                    borderColor={borderColors[colorMode]}
                    p={3}
                >
                    <VStack>
                        <Heading
                            size="md"
                            fontWeight="bold"
                            mb={2.5}
                            letterSpacing="tighter"
                        >
                            {title}
                        </Heading>
                        <Text lineHeight={1.3}>
                            {description}
                        </Text>
                    </VStack>
                </Box>
            </Link>
            </Center>
        </Box>
    )
}

export default Project;