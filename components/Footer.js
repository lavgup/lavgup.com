import React from 'react';
import NextLink from 'next/link';
import { Flex, Link, useColorMode } from '@chakra-ui/react';
import {
    FaGithub,
    FaDiscord,
    FaRedditAlien,
    FaEnvelope
} from 'react-icons/fa';
import IconButton from './Icon';

function Footer() {
    const { colorMode } = useColorMode();
    const text = {
        dark: 'gray.400',
        light: 'gray.500'
    };

    return (
        <Flex align="center" mb={4} direction="column">
            <div>
                <IconButton
                    icon={<FaGithub size={20} />}
                    href="https://github.com/lavgup"
                    color
                />
                <IconButton
                    icon={<FaDiscord size={20} />}
                    href="https://discord.com/invite/3akrAcXq5h"
                    color
                />
                <IconButton
                    icon={<FaRedditAlien size={21} />}
                    href="https://reddit.com/u/lavg69"
                    color
                />
                <IconButton
                    icon={<FaEnvelope size={21} />}
                    href="mailto://lavyag01@gmail.com"
                />
            </div>
            <div>
                <NextLink href="/blog" passHref>
                    <Link
                        fontSize="sm"
                        color={text[colorMode]}
                        minWidth="100px"
                        mr={2}
                        title="Blog"
                        _hover={{
                            textDecoration: 'none'
                        }}
                    >
                        /blog
                    </Link>
                </NextLink>
                <NextLink
                    fontSize="sm"
                    color={text[colorMode]}
                    minWidth="100px"
                    mr={2}
                    href="/games"
                    title="Photos"
                >
                    <Link
                        fontSize="sm"
                        color={text[colorMode]}
                        minWidth="100px"
                        mr={2}
                        title="Games"
                        _hover={{
                            textDecoration: 'none'
                        }}
                    >
                        /games
                    </Link>
                </NextLink>
            </div>
        </Flex>
    )
}

export default Footer;