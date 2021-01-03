import Image from 'next/image';
import { Heading, Divider, useColorMode, Alert, Text, Box } from '@chakra-ui/react';

function Quote(props) {
    const { colorMode } = useColorMode()
    const bgColor = {
        light: 'blue.50',
        dark: 'blue.900'
    }

    return (
        <Alert
            mt={4}
            w="98%"
            bg={bgColor[colorMode]}
            variant="left-accent"
            status="info"
            css={{
                '> *:first-of-type': {
                    marginTop: 0,
                    marginLeft: 8
                }
            }}
            {...props}
        />
    )
}

function Hr() {
    const { colorMode } = useColorMode()
    const borderColor = {
        light: 'gray.200',
        dark: 'gray.600'
    }

    return <Divider borderColor={borderColor[colorMode]} my={4} w="100%" />
}

const MDXComponents = {
    Image,
    h1: props => <Heading as="h1" size="xl" my={4} {...props} />,
    h2: props => <Heading as="h2" size="lg" my={4} {...props} />,
    h3: props => <Heading as="h3" size="md" my={4} {...props} />,
    h4: props => <Heading as="h4" size="sm" my={4} {...props} />,
    h5: props => <Heading as="h5" size="sm" my={4} {...props} />,
    h6: props => <Heading as="h6" size="xs" my={4} {...props} />,
    p: (props) => <Text as="p" mt={0} lineHeight="tall" {...props} />,
    ul: (props) => <Box as="ul" pt={2} pl={4} ml={2} {...props} />,
    ol: (props) => <Box as="ol" pt={2} pl={4} ml={2} {...props} />,
    li: (props) => <Box as="li" pb={1} {...props} />,
    hr: Hr,
    blockquote: Quote
};

export default MDXComponents;