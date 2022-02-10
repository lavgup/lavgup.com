import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="mt-16">
            <hr className="mb-8 w-full border-gray-300 dark:border-gray-800 border-1" />

            <div className="flex justify-between px-2">
                <div className="flex flex-col gap-2">
                    <StyledLink href="/" text="Home" />
                    <StyledLink href="/about" text="About" />
                    <StyledLink href="/blog" text="Blog" />
                </div>

                <div className="flex flex-col gap-2">
                    <StyledLink
                        href="https://github.com/lavgup"
                        text="GitHub"
                    />
                    <StyledLink
                        href="https://twitter.com/lavgup"
                        text="Twitter"
                    />
                    <StyledLink href="mailto:lavyag01@gmail.com" text="Email" />
                </div>

                <div className="flex flex-col gap-2">
                    <StyledLink href="/stack" text="Stack" />
                    <StyledLink href="/words" text="Words" />
                </div>
            </div>

            <div className="my-10 text-center dark:text-gray-400">
                &copy; Lav {new Date().getFullYear()}
            </div>
        </footer>
    );
}

function StyledLink({ href, text }: { href: string; text: string }) {
    return (
        <Link href={href}>
            <a className="text-gray-600 hover:text-gray-400 dark:text-zinc-300/90 dark:hover:text-gray-200/90">
                {text}
            </a>
        </Link>
    );
}
