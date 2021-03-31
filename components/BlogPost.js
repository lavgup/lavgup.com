import React from 'react';
import NextLink from 'next/link';
import { useColorMode, Heading, Text, Box, Link } from '@chakra-ui/react';

function BlogPost(frontMatter) {
    const { colorMode } = useColorMode();
    const secondaryTextColor = {
        light: 'gray.700',
        dark: 'gray.400'
    };

    return (
        <NextLink href={`blog/${frontMatter.slug}`} passHref>
            <Link w="100%" _hover={{ textDecoration: 'none' }}>
                <Box
                    display="block"
                    width="100%"
                    align={frontMatter.isMainPage ? 'center' : 'left'}
                >
                    <Heading size="md" mb={2} fontWeight="medium">
                        {frontMatter.title}
                    </Heading>
                    <Text color={secondaryTextColor[colorMode]}>
                        {frontMatter.description}
                    </Text>
                </Box>
            </Link>
        </NextLink>
    )
}

export default BlogPost;