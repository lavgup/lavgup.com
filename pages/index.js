import React from 'react';
import Image from 'next/image';
import Container from '../components/Container';
import {
    FaGithub,
    FaDiscord,
    FaRedditAlien,
    FaEnvelope
} from 'react-icons/fa';
import {
    Stack,
    Box,
    Spacer,
    Center,
    Heading,
    useColorMode
} from '@chakra-ui/react';

import IconButton from '../components/Icon';
import Project from '../components/Project';

export default function Home() {
    const { colorMode } = useColorMode();
    const color = colorMode === 'dark' ? 'white' : 'black';

    return (
        <Container isMainPage={true}>
            <Center>
                <Stack
                    spacing={8}
                    justifyContent="center"
                    maxWidth="700px"
                >
                    <Box
                        align="center"
                        justify="space-between"
                    >
                        <Spacer />
                        <Image src="/static/goat.png" width={250} height={250} />
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

                        <Stack ml={3} mr={3} mt={5} mb={3} spacing={4}>
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
            </Center>
        </Container>
    )
}
