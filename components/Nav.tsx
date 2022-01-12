import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import CommandIcon from './icons/Command';
import { useKBar } from 'kbar';

const pages = [
	{
		title: 'Home',
		href: '/'
	},
	{
		title: 'About',
		href: '/about'
	},
	{
		title: 'Blog',
		href: '/blog'
	}
];

export default function Nav() {
	const { pathname } = useRouter();
	const [mounted, setMounted] = useState(false);

	const { query, vState } = useKBar(state => {

		return {
			vState: state.visualState
		};
	});

	useEffect(() => setMounted(true), [mounted, setMounted]);

	return (
		<nav
			className={`
				sticky w-full
				${vState !== 'hidden' && 'invisible'}
				backdrop-saturate-[180%] backdrop-blur-2xl
				top-0 z-10 px-2 pt-3.5 pb-5 mt-2 mx-auto mb-5
			`}
		>
			<div className="flex items-center justify-between max-w-[54rem] w-full mx-auto">
				<Link href="/">
					<a className="flex-shrink-0">
						<Image
							src="/static/images/llama.png"
							height="50"
							width="50"
							className="w-14 h-14 rounded-full"
							alt="Lav's llama avatar"
						/>
					</a>
				</Link>

				<div className="flex flex-row flex-shrink justify-evenly items-center mt-2 w-full">
					{pages.map((el, idx) => {
						return <NavLink
							key={idx}
							text={el.title}
							href={el.href}
							active={pathname === el.href}
						/>;
					})}
				</div>

				<div className="pr-2 mt-4">
					<button title="⌘K" onClick={query.toggle}>
						<CommandIcon className="h-5 w-5" />
					</button>
				</div>
			</div>
		</nav>
	);
}

function NavLink({ text, href, active = false }: {
	href: string,
	text: string,
	active?: boolean
}) {
	const className = clsx(
		'tracking-[0.005em] font-bold capitalize transform-gpu',
		active && 'shadow-nav dark:shadow-nav-dark',
		!active && 'opacity-60'
	);

	return (
		<Link href={href}>
			<a
				className={className}
			>
				{text}
			</a>
		</Link>
	);
}
