import { FaTwitch, FaDiscord } from 'react-icons/fa';
import { signIn, useSession } from 'next-auth/client';
import {
    Skeleton,
    Heading,
    Box,
    Stack,
    Center,
    Text,
    VStack,
    Button,
    Link
} from '@chakra-ui/react';

import { NextSeo } from 'next-seo';
import Container from '../components/Container';
import AddGame from '../components/AddGame';

const url = 'https://lavya.tech/games';
const title = 'Game Wiki Database - Lav';
const description = 'A database hosted storing information on games and their correlating Fandom/Gamepedia wikis.';

function Games() {
    const [session, loading] = useSession();

    return (
        <Container>
            <NextSeo
                title={title}
                description={description}
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
                    maxWidth="700px"
                    ml={3}
                    mr={3}
                >
                        <Box
                            align="center"
                            justify="space-between"
                        >
                            <Skeleton isLoaded={!loading}>
                                <Heading mb={4}>
                                    Game Wiki Database
                                </Heading>
                            </Skeleton>

                            <Skeleton isLoaded={!loading}>
                                <Text mb={7}>
                                    The Game Wiki Database is a database hosted
                                    {" "}
                                    <Link color="teal.400" href="https://github.com/Sidemen19/game-wiki-db" isExternal>
                                        on GitHub
                                    </Link>
                                    {" "} storing information on games and their correlating Fandom/Gamepedia wikis.
                                </Text>
                            </Skeleton>

                            {session ? <Skeleton isLoaded={!loading} align="left">
                                    <AddGame />
                                </Skeleton>
                                : <Skeleton isLoaded={!loading}>
                                    <Heading size="md" mb={4}>
                                        Sign in
                                    </Heading>
                                    <VStack>
                                        <Button
                                            isLoading={loading}
                                            bg="#7289DA"
                                            color="white"
                                            leftIcon={<FaDiscord />}
                                            onClick={() => signIn('discord')}
                                        >
                                            Login with Discord
                                        </Button>
                                        <Button
                                            isLoading={loading}
                                            isDisabled
                                            bg="#6441A4"
                                            color="white"
                                            leftIcon={<FaTwitch />}
                                        >
                                            Login with Twitch
                                        </Button>
                                    </VStack>
                                </Skeleton>
                            }
                        </Box>
                </Stack>
            </Center>
        </Container>
    )
}

export default Games;