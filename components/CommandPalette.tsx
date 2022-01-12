import {
	KBarProvider,
	KBarPortal,
	KBarPositioner,
	KBarAnimator,
	KBarSearch,
	KBarResults,
	useMatches,
	ActionImpl,
	ActionId
} from 'kbar';

import React, {ReactNode } from 'react';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import { toast, Toaster } from 'react-hot-toast';

import HomeIcon from './icons/Home';
import UserIcon from './icons/User';
import BlogIcon from './icons/Blog';
import StackIcon from './icons/Stack';
import WordsIcon from './icons/Words';
import TwitterIcon from './icons/Twitter';
import GitHubIcon from './icons/GitHub';
import MailIcon from './icons/Mail';
import { DarkIcon, SunIcon, SystemIcon } from './icons/Theme';
import DuplicateIcon from './icons/Duplicate';
import RSSIcon from './icons/RSS';
import CodeIcon from './icons/Code';

import * as Panelbear from '@panelbear/panelbear-js';

/* eslint-disable no-unused-vars */
enum Sections {
	Navigation = 'navigation',
	Socials = 'socials',
	General = 'general'
}

/* eslint-enable */

export default function CommandPalette({ children }: { children: ReactNode }) {
	const router = useRouter();
	const { resolvedTheme, setTheme } = useTheme();

	const actions = [
		{
			id: 'home',
			name: 'Home',
			icon: <HomeIcon />,
			shortcut: ['h'],
			section: Sections.Navigation,
			keywords: 'home back main root index',
			perform: () => router.push('/')
		},
		{
			id: 'about',
			name: 'About',
			icon: <UserIcon />,
			shortcut: ['a'],
			section: Sections.Navigation,
			keywords: 'info',
			perform: () => router.push('/about')
		},
		{
			id: 'blog',
			name: 'Blog',
			icon: <BlogIcon />,
			shortcut: ['b'],
			section: Sections.Navigation,
			keywords: 'writing articles content',
			perform: () => router.push('/blog')
		},
		{
			id: 'stack',
			name: 'Stack',
			icon: <StackIcon />,
			shortcut: ['s'],
			section: Sections.Navigation,
			keywords: 'gear tools',
			perform: () => router.push('/stack')
		},
		{
			id: 'words',
			name: 'Words',
			icon: <WordsIcon />,
			shortcut: ['w'],
			section: Sections.Navigation,
			keywords: 'vocables',
			perform: () => router.push('/words')
		},
		{
			id: 'twitter',
			name: 'Twitter',
			icon: <TwitterIcon />,
			shortcut: ['t'],
			section: Sections.Socials,
			keywords: 'twitter tweet',
			perform: () => window.location.href = 'https://twitter.com/lavgup'
		},
		{
			id: 'github',
			name: 'GitHub',
			icon: <GitHubIcon />,
			shortcut: ['g'],
			section: Sections.Socials,
			perform: () => window.location.href = 'https://github.com/lavgup'
		},
		{
			id: 'mail',
			name: 'Mail',
			icon: <MailIcon />,
			shortcut: ['m'],
			section: Sections.Socials,
			keywords: 'email contact',
			perform: () => window.location.href = 'mailto://lavyag01@gmail.com'
		},
		{
			id: 'theme',
			name: 'Change theme...',
			icon: <SystemIcon />,
			section: Sections.General
		},
		{
			id: 'light',
			name: 'Light',
			icon: <SunIcon />,
			section: '',
			keywords: 'light theme',
			parent: 'theme',
			perform: () => {
				setTheme('light');
			}
		},
		{
			id: 'dark',
			name: 'Dark',
			icon: <DarkIcon />,
			section: '',
			keywords: 'dark theme',
			parent: 'theme',
			perform: () => {
				setTheme('dark');
			}
		},
		{
			id: 'system',
			name: 'System',
			icon: <SystemIcon />,
			section: '',
			keywords: 'system theme',
			parent: 'theme',
			perform: () => {
				setTheme('system');
			}
		},
		{
			id: 'copyUrl',
			name: 'Copy URL to clipboard',
			icon: <DuplicateIcon />,
			shortcut: ['cc'],
			section: Sections.General,
			keywords: 'copy share url',
			perform: () => {
				navigator.clipboard.writeText('https://lavya.me' + router.asPath).then();

				const options = resolvedTheme === 'dark'
					? { style: { background: '#262626', color: '#E5E5E5' } }
					: {};

				toast.success('Successfully copied to clipboard!', options);
			}
		},
		{
			id: 'rss',
			name: 'RSS Feed',
			icon: <RSSIcon />,
			section: Sections.General,
			keywords: 'rss feed atom',
			perform: async () => {
				navigator.clipboard.writeText('https://lavya.me/feed.xml').then();
				router.push('https://lavya.me/feed.xml').then();
			}
		},
		{
			id: 'source',
			name: 'View source',
			icon: <CodeIcon />,
			shortcut: ['sc'],
			section: Sections.General,
			keywords: 'source code',
			perform: async () => {
				window.location.href = 'https://github.com/lavgup/lavya.me';
			}
		}
	].map(action => {
		const obj = {
			...action
		};

		if (action.perform) {
			obj.perform = () => {
				action.perform();

				const prefix = action.parent ? `${action.parent}-` : '';

				Panelbear.track(`cmd-${prefix}${action.id}`);
			};
		}

		return obj;
	});

	return (
		<KBarProvider
			actions={actions}
			options={{
				enableHistory: true
			}}
		>
			<KBarPortal>
				<KBarPositioner
					className="bg-white/80 dark:bg-black/80"
					style={{ padding: '10vh 16px 16px' }}
				>
					<KBarAnimator
						className="overflow-hidden w-full max-w-2xl bg-white rounded-lg shadow-2xl dark:bg-soft-black z-10"
					>
						<KBarSearch
							className="dark:placeholder:text-neutral-400/60 p-4 mb-3 w-full border-b-[1px] box-border outline-none dark:bg-soft-black dark:border-neutral-500/40"
						/>
						<div className="pb-1.5">
							<Results />
						</div>
					</KBarAnimator>
				</KBarPositioner>
			</KBarPortal>

			{children}

			<Toaster position="bottom-right" />
		</KBarProvider>
	);
}

function Results() {
	const { results, rootActionId } = useMatches();

	return (
		<KBarResults
			maxHeight={400}
			items={results}
			onRender={({ item, active }) =>
				typeof item === 'string' ? (
					<p
						className="pt-3 pb-1 pl-3 text-[.65rem] uppercase dark:text-neutral-300/50"
					>
						{item}
					</p>
				) : (
					<ResultItem
						action={item}
						active={active}
						currentRootActionId={rootActionId as string}
					/>
				)
			}
		/>
	);
}

// eslint-disable-next-line react/display-name
const ResultItem = React.forwardRef(
	(
		{
			action,
			active,
			currentRootActionId
		}: {
			action: ActionImpl;
			active: boolean;
			currentRootActionId: ActionId;
		},
		ref: React.Ref<HTMLDivElement>
	) => {
		const ancestors = React.useMemo(() => {
			if (!currentRootActionId) return action.ancestors;
			const index = action.ancestors.findIndex(
				(ancestor) => ancestor.id === currentRootActionId
			);
			// +1 removes the currentRootAction; e.g.
			// if we are on the "Set theme" parent action,
			// the UI should not display "Set theme… > Dark"
			// but rather just "Dark"
			return action.ancestors.slice(index + 1);
		}, [action.ancestors, currentRootActionId]);

		return (
			<div
				ref={ref}
				className={`
					flex justify-between
					items-center cursor-pointer py-2 px-3 mx-1.5 rounded-md
					${active && 'bg-gray-200/70 dark:bg-neutral-600/30'}
					transition-colors duration-[.15s] delay-[0]
					dark:text-neutral-300/80
				`}
			>
				<div
					className="flex gap-3 items-center text-sm"
				>
					<span className="w-5 h-5">
						{action.icon && action.icon}
					</span>

					<div className="flex flex-col">
						<div>
							{ancestors.length > 0 && ancestors.map((ancestor: ActionImpl) => (
								<React.Fragment key={ancestor.id}>
									<span>
										{ancestor.name}
									</span>
									<span className="mr-0.5">
										&rsaquo;
									</span>
								</React.Fragment>
							))}
							<span>{action.name}</span>
						</div>

						{action.subtitle && (
							<span className="text-[0.75rem]">{action.subtitle}</span>
						)}
					</div>
				</div>

				{action.shortcut?.length ? (
					<div
						aria-hidden
						className="grid grid-flow-col gap-[0.25rem]"
					>
						{action.shortcut.map((sc) => (
							<kbd
								key={sc}
								className="py-[.1rem] px-[.325rem] bg-cmd-kbd rounded-md text-md"
							>
								{sc}
							</kbd>
						))}
					</div>
				) : null}
			</div>
		);
	}
);
