import React from 'react';
import {
    useColorMode,
    Center,
    Heading,
    Text,
    Flex,
    Stack,
    Avatar,
    Spacer,
    Box
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import BlogSeo from '../components/BlogSeo';
import Container from '../components/Container';

function BlogLayout({ children, frontMatter }) {
    const { colorMode } = useColorMode();
    const textColor = {
        light: 'gray.800',
        dark: 'gray.500'
    };

    return (
        <>
            <Container>
                <BlogSeo url={`https://lavya.tech/blog/${frontMatter.slug}`} {...frontMatter} />
                <Stack
                    as="article"
                    spacing={8}
                    justifyContent="center"
                    alignItems="flex-start"
                    mt="auto"
                    mr="auto"
                    mb="4rem"
                    ml="auto"
                    maxWidth="700px"
                    w="100%"
                    px={2}
                >
                    <Flex
                        flexDirection="column"
                        maxWidth="700px"
                        w="100%"
                    >
                        <Heading letterSpacing="tight" mb={3} size="2xl">
                            {frontMatter.title}
                        </Heading>
                        <Flex
                            justify="space-between"
                            align={['initial', 'center']}
                            direction={['column', 'row']}
                            mt={2}
                            w="100%"
                        >
                            <Flex align="center">
                                <Avatar
                                    size="xs"
                                    name="Lav"
                                    src="/static/goat.png"
                                    mr={2}
                                />
                                <Text fontSize="sm" color={textColor[colorMode]}>
                                    {frontMatter.by}
                                    {'Lav / '}
                                    {format(parseISO(frontMatter.publishedAt), 'MMMM dd, yyyy')}
                                </Text>
                            </Flex>
                            <Text fontSize="sm" color="gray.500" minWidth="100px" mt={[2, 0]}>
                                {frontMatter.readingTime.text}
                            </Text>
                        </Flex>
                    </Flex>
                    {children}
                </Stack>
            </Container>
        </>
    )
}

export default BlogLayout;