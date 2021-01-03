import { Link, IconButton } from '@chakra-ui/react';

function Icon({ icon, href, color }) {
    return (
        <Link href={href}>
            <IconButton
                bg="transparent"
                mt={2}
                size="md"
                aria-label="social"
                icon={icon}
                color={color}
            />
        </Link>
    )
}

export default Icon;