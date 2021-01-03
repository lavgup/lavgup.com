import React from 'react';
import { NextSeo } from 'next-seo';
import { Center } from '@chakra-ui/react';
import Container from '../components/Container';

const url = 'https://lavya.tech/blog';
const title = 'Blog - Lav';
const description = 'Random discussion on my personal thoughts, projects and hobbies';

function Blog() {
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
                OK
            </Center>
        </Container>
    )
}

export default Blog;