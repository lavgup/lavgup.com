import NextLink from 'next/link';
import { useColorMode, Heading, Text, Flex, Box, Link } from '@chakra-ui/react';

function BlogPost(frontMatter) {
    const { colorMode } = useColorMode();
    const secondaryTextColor = {
        light: 'gray.700',
        dark: 'gray.400'
    };
    const bg = {
        light: 'gray.400',
        dark: 'gray.200'
    }

    return (
        <NextLink href={`blog/${frontMatter.slug}`} passHref>
            <Link w="100%" _hover={{ textDecoration: 'none' }}>
                <Box
                    mb={8}
                    display="block"
                    width="100%"
                    align="left"
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