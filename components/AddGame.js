import React from 'react';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Radio,
    FormErrorMessage,
    RadioGroup,
    Flex,
    Spacer,
    createStandaloneToast
} from '@chakra-ui/react';
import theme from '../styles/theme';
import { Formik, Field } from 'formik';
import { signOut } from 'next-auth/client';

const toast = createStandaloneToast({ theme });

async function handleSubmit(info) {
    const fetcher = url => fetch(url).then(res => res.json());

    for (const [key, val] of Object.entries(info)) {
        info[key] = val.trim();
    }

    const url =
        `/api/addgame?game=${info.game}&wiki=${info.wiki.toLowerCase()}&farm=${info.farm}&name=${info.name}`;

    const loading = toast({
        position: 'top-right',
        title: 'Loading...',
        description: "Rome wasn't built in a day",
        status: 'info',
        isClosable: false
    })

    const data = await fetcher(url);
    if (loading) toast.close(loading);

    if (data.error || !data.pullNumber) return toast({
        position: 'top-right',
        title: 'An error occurred.',
        description: `Unable to submit entry to database${data.error ? `: ${data.error}` : ''}`,
        status: 'error',
        duration: 9000,
        isClosable: true
    });

    return toast({
        position: 'top-right',
        title: 'Success',
        description: `Successfully added entry to database, under pull request #${data.pullNumber}`,
        status: 'success',
        duration: 9000,
        isClosable: true
    });
}

function validateRequirement(value, what) {
    let error;

    if (!value) {
        error = `${what} is required`;
    } else if (3 > value.length) {
        error = 'Must be at least three characters';
    }

    return error;
}

const validateGame = value => validateRequirement(value, 'Game');
const validateWiki = value => validateRequirement(value, 'Wiki');
const validateName = value => validateRequirement(value, 'Name');

class AddGame extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            game: '',
            wiki: '',
            name: '',
            farm: 'gamepedia'
        }
    }

    render() {
        return (
            <Box>
                <Formik
                    initialValues={this.state}
                    onSubmit={async (values, actions) => {
                        await handleSubmit(values);
                        actions.setSubmitting(false);
                    }}
                >
                    {({ values, handleChange, handleSubmit, isSubmitting }) => {
                        return (
                            <>
                                <Field
                                    name="game"
                                    validate={validateGame}
                                >
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.game && form.touched.game
                                            }
                                            isRequired
                                            align="left"
                                        >
                                            <FormLabel htmlFor="game">Game</FormLabel>
                                            <Input
                                                {...field}
                                                id="game"
                                                placeholder="Minecraft"
                                                value={values.title}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>The game for the new database entry.</FormHelperText>
                                            <FormErrorMessage>
                                                {form.errors.game}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field
                                    name="wiki"
                                    validate={validateWiki}
                                >
                                    {({ field, form }) => (
                                        <FormControl mt={6}
                                                     isInvalid={
                                                         form.errors.wiki && form.touched.wiki
                                                     }
                                                     isRequired
                                                     align="left"
                                        >
                                            <FormLabel htmlFor="wiki">Wiki</FormLabel>
                                            <InputGroup size="sm">
                                                <InputLeftAddon children="https://" />
                                                <Input
                                                    {...field}
                                                    borderRadius="0"
                                                    placeholder="minecraft"
                                                />
                                                <InputRightAddon children={`.${this.state.farm}.com`} />
                                            </InputGroup>
                                            <FormHelperText>The game's Fandom/Gamepedia wiki.</FormHelperText>
                                            <FormErrorMessage>
                                                {form.errors.wiki}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field
                                    name="farm"
                                >
                                    {() => (
                                        <FormControl
                                            align="left"
                                            mt={6}
                                        >
                                            <FormLabel>Wiki Farm</FormLabel>
                                            <RadioGroup onChange={val => this.setState({ farm: val })} defaultValue="gamepedia">
                                                <HStack spacing="24px">
                                                    <Radio value="gamepedia" size="md">Gamepedia</Radio>
                                                    <Radio value="fandom" size="md">Fandom</Radio>
                                                </HStack>
                                            </RadioGroup>
                                            <FormHelperText>The wiki farm the game's wiki is a part of.</FormHelperText>
                                        </FormControl>
                                    )}
                                </Field>

                                <Field
                                    name="name"
                                    validate={validateName}
                                >
                                    {({ field, form }) => (
                                        <FormControl
                                            isInvalid={
                                                form.errors.name && form.touched.name
                                            }
                                            align="left"
                                            mt={6}
                                            isRequired
                                        >
                                            <FormLabel>Wiki Name</FormLabel>
                                            <Input
                                                {...field}
                                                placeholder="Minecraft Wiki"
                                            />
                                            <FormHelperText>The name of the wiki.</FormHelperText>
                                            <FormErrorMessage>
                                                {form.errors.name}
                                            </FormErrorMessage>
                                        </FormControl>
                                    )}
                                </Field>

                                <Flex mt={10} mb={4}>
                                    <Button
                                        colorScheme="blue"
                                        size="md"
                                        align="left"
                                        isLoading={isSubmitting}
                                        onClick={() => handleSubmit(this.state)}
                                    >
                                        Submit
                                    </Button>
                                    <Spacer />
                                    <Button
                                        colorScheme="red"
                                        size="md"
                                        align="right"
                                        isLoading={isSubmitting}
                                        onClick={() => signOut()}
                                    >
                                        Sign Out
                                    </Button>
                                </Flex>
                            </>
                        )
                    }}
                </Formik>
            </Box>
        )
    }
}

export default AddGame;