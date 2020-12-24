import React from 'react';
import {
    Flex,
    Link,
    Heading,
    Text,
    Stack,
    Container,
    useColorMode
} from '@chakra-ui/react';

function Project({ title, description, href }) {
    const { colorMode } = useColorMode();
    const borderColors = {
        light: 'gray.800',
        dark: 'gray.500'
    };

    return (
        <Container centerContent>
            <Link
                mb={4}
                href={href}
                title={title}
                isExternal
                _hover={{
                    boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.05)',
                    textDecoration: 'none'
                }}
            >
                <Flex
                    align="center"
                    border="1px solid"
                    borderColor={borderColors[colorMode]}
                    borderRadius={4}
                    p={3}
                >
                    <Stack>
                        <Heading
                            as="h4"
                            size="md"
                            fontWeight="bold"
                            mb={2.5}
                            letterSpacing="tighter"
                        >
                            {title}
                        </Heading>
                        <Text lineHeight={1.3} mt={1.5}>
                            {description}
                        </Text>
                    </Stack>
                </Flex>
            </Link>
        </Container>
    )
}

export default Project;