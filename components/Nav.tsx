import NextLink from 'next/link';
import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import Logo from './Logo';
import ThemeButton from './ThemeButton';

export default function Nav() {
	const [mounted, setMounted] = useState(false);
	const { resolvedTheme, setTheme } = useTheme();

	useEffect(() => setMounted(true), []);

	return (
		<nav
			className="sticky-nav bg-gray-100 dark:bg-soft-black flex justify-between items-center max-w-5xl w-full py-4 pr-4 my-0 md:my-6 mx-auto bg-opacity-60">
			<NextLink href="/">
				<a aria-label="Go to home" className="ml-6">
					<Logo />
				</a>
			</NextLink>

			<div className="flex justify-between">
				{mounted && <ThemeButton resolvedTheme={resolvedTheme} setTheme={setTheme} />}
				<NextLink href="/about">
					<a className={`ml-2 bg-nav-gray dark:bg-cool-gray-light text-black dark:text-white hover:bg-gray-300 dark:hover:bg-cool-gray-dark px-3 py-2.5 mt-2 h-10 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}>About</a>
				</NextLink>
				<NextLink href="/blog">
					<a className={`ml-2 bg-nav-gray dark:bg-cool-gray-light text-black dark:text-white hover:bg-gray-300 dark:hover:bg-cool-gray-dark px-3 py-2.5 mt-2 h-10 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline`}>Blog</a>
				</NextLink>
			</div>
		</nav>
	);
}
