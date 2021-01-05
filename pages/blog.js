import React from 'react';
import { useState } from 'react';
import { NextSeo } from 'next-seo';
import {
    Box,
    Center,
    Heading,
    Stack,
    useColorMode,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Icon,
    Flex
} from '@chakra-ui/react';
import Container from '../components/Container';
import { getAllFrontMatter } from '../lib/mdx';
import { FaSearch } from 'react-icons/fa';
import BlogPost from '../components/BlogPost';

const url = 'https://lavya.tech/blog';
const title = 'Blog - Lav';
const description = 'Random discussion on my personal thoughts, projects and hobbies.';

function Blog({ posts }) {
    const [searchValue, setSearchValue] = useState('');
    const { colorMode } = useColorMode();
    const secondaryTextColor = {
        light: 'gray.700',
        dark: 'gray.400'
    };

    const filteredBlogPosts = posts
        .sort((a, b) =>
                Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt))
        )
        .filter(frontMatter =>
            frontMatter.title.toLowerCase().includes(searchValue.toLowerCase())
        );

    return (
        <Container>
            <NextSeo
                title={title}
                description={title}
                canonical={url}
                openGraph={{
                    url,
                    title,
                    description
                }}
            />

            <Center>
                <Stack
                    spacing={8}
                    justifyContent="center"
                    ml={3}
                    mr={3}
                >
                    <Box
                        align="center"
                        justify="space-between"
                    >
                        <Heading>
                            Blog
                        </Heading>
                        <Text mt={3} color={secondaryTextColor[colorMode]}>
                            {description}
                        </Text>

                        <InputGroup my={4} mr={4} w="100%">
                            <Input
                                aria-label="Search for a blog post"
                                placeholder="Search for a blog post"
                                onChange={e => setSearchValue(e.target.value)}
                            />
                            <InputRightElement children={<Icon as={FaSearch} />} />
                        </InputGroup>

                        <Flex
                            flexDirection="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            mt={6}
                        >
                            <Heading letterSpacing="tight" mb={4} size="lg" fontWeight={700}>
                                All Posts
                            </Heading>
                            {!filteredBlogPosts.length && 'No posts found.'}
                            {filteredBlogPosts.map((frontMatter) => (
                                <BlogPost key={frontMatter.title} {...frontMatter} />
                            ))}
                        </Flex>
                    </Box>
                </Stack>
            </Center>
        </Container>
    )
}

export async function getStaticProps() {
    const posts = await getAllFrontMatter();

    return { props: { posts } };
}

export default Blog;