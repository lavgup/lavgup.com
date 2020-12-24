import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Nav from '../components/Nav';
import {
    FaGithub,
    FaDiscord,
    FaRedditAlien,
    FaEnvelope,
    FaExternalLinkAlt
} from 'react-icons/fa';
import {
    Container,
    Stack,
    Box,
    Spacer,
    Heading,
    useColorMode
} from '@chakra-ui/react';

import IconButton from '../components/Icon';
import Project from '../components/Project';

export default function Home() {
    const { colorMode } = useColorMode();
    const color = colorMode === 'dark' ? 'white' : 'black';

    return (
        <Container>
            <Head>
                <title>Lav's Site</title>
            </Head>
            <Nav />
            <Stack
                spacing={8}
                justifyContent="center"
                maxWidth="700px"
            >

                <Box
                    align="center"
                    justify="space-between"
                    padding="1.5rem"
                >
                    <Spacer />
                    <Image src="/goat.png" width={250} height={250} />
                    <Heading mt={2}>
                        Hi. I'm Lav.
                    </Heading>

                    <IconButton
                        icon={<FaGithub size={20} />}
                        href="https://github.com/Sidemen19"
                        color={color}
                    />
                    <IconButton
                        icon={<FaDiscord size={19} />}
                        href="https://discord.com/invite/3akrAcXq5h"
                        color={color}
                    />
                    <IconButton
                        icon={<FaRedditAlien size={21} />}
                        href="https://reddit.com/u/lavg69"
                        color={color}
                    />
                    <IconButton
                        icon={<FaEnvelope size={21} />}
                        href="mailto://lavyag01@gmail.com"
                        color={color}
                    />

                    <Heading mt={20}>
                        Projects
                    </Heading>

                    <Stack mt={5} spacing={0.5}>
                        <Project
                            title="Wiki Utilities"
                            description="A Discord bot designed to enhance the life of wiki moderators."
                            href="https://github.com/Sidemen19/Wiki-Utilities"
                        />
                        <Project
                            title="mediawiki.js"
                            description="A full-blown API wrapper for MediaWiki sites."
                            href="https://github.com/Sidemen19/mediawiki.js"
                        />
                        <Project
                            title="VACEfron.js"
                            description="A minimalistic API wrapper for VACEfron's Image API."
                            href="https://github.com/Sidemen19/VACEfron.js"
                        />
                    </Stack>
                </Box>
            </Stack>
        </Container>
    )
}
