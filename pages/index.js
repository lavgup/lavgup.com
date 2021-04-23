import React from 'react';
import Container from '../components/Container';
import Project from '../components/Project';

export default function Home() {
    return (
        <Container>
            <div className="flex flex-col justify-center items-start max-w-2xl mx-auto mb-16">
                <h1 className="font-bold text-3xl md:text-5xl tracking-tight">
                    Hi. I'm Lav.
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    I'm an Australian student, badminton player and a hobby software developer.
                    When I'm not off at school or smashing shuttles on the court, I'm exploring the worldwide web and creating all sorts of stuff.
                </p>

                <button>
                    <a
                        href="mailto:https://lavyag01@gmail.com"
                        className="rounded-md block mt-10 pb-2 pl-3 pr-3 pt-2 border border-black dark:border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-900"
                    >
                        <p>Get in Touch</p>
                    </a>
                </button>

                <h2 className="font-bold text-2xl md:text-4xl tracking-tight mt-24">
                    About Me
                </h2>
                <p className="prose text-gray-600 dark:text-gray-400 mt-2">
                    Hey! I'm Lavya and I'm a high school student located in Newcastle, a city two hours away from Sydney, Australia.
                    Apart from my school studies, I am enrolled in my local university, the University of Newcastle, for a high-performing students program.
                    Out of options including design and medicine courses, I chose a course I was very interested in completing - Object Oriented Programming.
                    <br /><br />
                    To remain in shape, I play badminton 🏸 three times a week. Badminton was one of the first sports I picked up alongside soccer, rugby and tennis.
                    Due to court availability changes, I dropped badminton and started playing tennis, in which I engaged with many tournaments around the city and earned a A$100 prize.
                    In that time, new badminton courts had been made (and coincidentally the tennis courts' owners lost their lease!), so I started playing the sport again and I'm loving it.
                    <br /><br />
                    For my hobby, I develop software to help myself and others in their daily lives.
                    Why did I start writing code?
                    Just to have the freedom.
                    The freedom of being able to maintain a presence on the internet and automate the tedious tasks you carry out everyday, for free.
                    In fact, I created this website with no advertisements and on a custom domain without paying a cent.
                </p>

                <h2 className="font-bold text-2xl md:text-4xl tracking-tight mt-24 mb-6">
                    Projects
                </h2>
                <Project
                    title="alexflipnote.go"
                    description="A modern and fast wrapper for the AlexFlipnote API in Go. Includes easy token authentication."
                    href="https://github.com/lavgup/alexflipnote.go"
                />
                <Project
                    title="mediawiki.js"
                    description="A simplistic client library in TypeScript for the MediaWiki API, compiled for use in Node programs."
                    href="https://github.com/lavgup/mediawiki.js"
                />
                <Project
                    title="Wiki Utilities"
                    description="Discord bot for taking administrative actions on a wiki through Discord. Delete, protect, edit pages."
                    href="https://github.com/lavgup/wiki-utilities"
                />
            </div>
        </Container>
    );
}
