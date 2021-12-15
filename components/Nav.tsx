import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import Palette from './command/Palette';

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

	useEffect(() => setMounted(true), [mounted, setMounted]);

	return (
		<nav
			className="flex justify-between w-full py-3 mx-auto transition ease-in-out duration-500"
		>
			<Link href="/">
				<a className="flex-shrink-0">
					<Image
						src="/static/images/llama.png"
						height="50"
						width="50"
						className="rounded-full h-14 w-14"
						alt="Lav's llama avatar"
					/>
				</a>
			</Link>

			<div className="flex flex-row items-center flex-shrink w-full mt-2 justify-evenly">
				{pages.map((el, idx) => {
					return <NavLink
						key={idx}
						text={el.title}
						href={el.href}
						active={pathname === el.href}
					/>;
				})}
			</div>

			<div className="mt-5 pr-1.5">
				<Palette />
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
		active && 'shadow-nav dark:shadow-nav-dark'
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
