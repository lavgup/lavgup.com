import Item from './Item';
import { useCommandStore } from '../../store/command';
import { ComponentType, ReactElement } from 'react';

import { DarkIcon, SunIcon, SystemIcon } from '../icons/Theme';
import DuplicateIcon from '../icons/Duplicate';
import HomeIcon from '../icons/Home';
import UserIcon from '../icons/User';
import BlogIcon from '../icons/Blog';
import StackIcon from '../icons/Stack';
import WordsIcon from '../icons/Words';
import { NextRouter } from 'next/router';
import { useTheme } from 'next-themes';

import { toast } from 'react-hot-toast';
import GitHubIcon from '../icons/GitHub';
import TwitterIcon from '../icons/Twitter';
import RSSIcon from '../icons/RSS';
import CodeIcon from '../icons/Code';
import MailIcon from '../icons/Mail';

const capitalise = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

export interface ItemType {
	name: string;
	icon: ComponentType<{ className?: string }>;
	href?: string;
	callback?: ({ navigator, router }: { navigator: Navigator, router: NextRouter, theme: string | undefined }) => void;
	items?: () => ReactElement;
	showing?: boolean;
}

const items: { [key: string]: ItemType[] } = {
	pages: [
		{ name: 'Home', icon: HomeIcon, href: '/' },
		{ name: 'About', icon: UserIcon, href: '/about' },
		{ name: 'Blog', icon: BlogIcon, href: '/blog' },
		{ name: 'Stack', icon: StackIcon, href: '/stack' },
		{ name: 'Words', icon: WordsIcon, href: '/words' }
	],
	general: [
		{ name: 'Theme', icon: SystemIcon, items: ThemeItems },
		{
			name: 'Copy current URL',
			icon: DuplicateIcon,
			callback: ({ navigator, router, theme }) => {
				navigator!.clipboard.writeText('https://lavya.me' + router.asPath).then();

				const options = theme === 'dark' ? { style: { background: '#262626', color: '#E5E5E5' } } : {};

				toast.success('Copied to clipboard', options);
			}
		}
	],
	external: [
		{ name: 'GitHub', icon: GitHubIcon, href: 'https://github.com/lavgup' },
		{ name: 'Twitter', icon: TwitterIcon, href: 'https://twitter.com/lavgup' },
		{ name: 'Mail', icon: MailIcon, href: 'mailto:lavyag01@gmail.com' }
	],
	meta: [
		{ name: 'RSS Feed', icon: RSSIcon, href: '/feed.xml' },
		{ name: 'View source', icon: CodeIcon, href: 'https://github.com/lavgup/lavya.me' }
	]
};

function Group({ children, title }: { children: ReactElement[], title: string }) {
	const { input } = useCommandStore();
	const showing = children?.filter(c => c?.props.showing).length;

	return (
		<div className={input.length ? (showing ? '' : 'hidden') : ''}>
			<h3 className="text-xs ml-1.5 my-1 transform-gpu text-gray-400 dark:text-[#BCBCBC]">{title}</h3>
			<ul>{children}</ul>
		</div>
	);
}

export function DefaultItems() {
	const { input } = useCommandStore();

	const showing = (val: string) => val.toLowerCase().includes(input.toLowerCase());

	return (
		<div className="flex flex-col space-y-1.5">
			{Object.keys(items).map((k, idx) => (
				<Group key={idx} title={capitalise(k)}>
					{items[k as keyof typeof items].map((props, idx) => (
						<Item
							key={idx}
							icon={props.icon}
							name={props.name}
							href={props.href}
							callback={props.callback}
							items={props.items}
							showing={showing(props.name)}
						/>
					))}
				</Group>
			))}
		</div>
	);
}

export function ThemeItems() {
	const { systemTheme, setTheme } = useTheme();

	return (
		<>
			<Item
				icon={SunIcon}
				callback={() => setTheme('light')}
				name="Light"
			/>
			<Item
				icon={DarkIcon}
				callback={() => setTheme('dark')}
				name="Dark"
			/>
			<Item
				icon={SystemIcon}
				callback={() => setTheme(systemTheme || 'light')}
				name="System"
			/>
		</>
	);
}
