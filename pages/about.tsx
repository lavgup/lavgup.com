import Container from 'components/Container';
import Image from 'next/image';
import Link from 'next/link';

import sunset from '../public/static/images/Sunset.jpeg';

export default function About() {
    return (
        <Container
            title="About - Lav"
            description="A description of me, what I like and what I dislike."
        >
            <h1 className="text-4xl font-bold tracking-tight">About</h1>

            <figure className="mt-5">
                <picture>
                    <Image
                        src={sunset}
                        placeholder="blur"
                        draggable={false}
                        className="rounded-xl"
                        height="525"
                        width="900"
                        alt="Sunset"
                    />
                </picture>

                <figcaption className="ml-0.5 text-sm">
                    Artistic sunset taken late-2020.
                </figcaption>
            </figure>

            <p className="mt-6 w-full max-w-none text-gray-600 prose dark:prose-dark">
                Hey! I'm Lavya. I'm an Australian high school student with a
                passion for exploring the web. When I'm not studying for my
                final years, I'm usually programming interesting projects,
                watching TV or hanging out with friends.
                <br />
                <br />
                I enjoy frontend web development, occasionally dabbling into
                backend development. I love building web applications - the
                challenges are what make it fun.
                <br />
                <br />
                Check out <A href="/stack">my stack</A> and{' '}
                <A href="/blog">blog</A>!
            </p>
        </Container>
    );
}

function A({ href, children }: { href: string; children: string }) {
    return (
        <Link href={href}>
            <a>{children}</a>
        </Link>
    );
}
