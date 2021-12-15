import { Dialog, Transition } from '@headlessui/react';
import {
	memo,
	Fragment,
	useRef, useEffect, useMemo
} from 'react';
import type { KeyboardEvent as KBEvent } from 'react';
import tinykeys from 'tinykeys';

import { useCommandStore } from '../../store/command';
import CommandIcon from '../icons/Command';
import { DefaultItems } from './Items';

import { ThemeItems } from './Items';
import { useRouter } from 'next/router';

function CommandMenu() {
	const {
		isOpen,
		setOpen,
		pages,
		setPages,
		input,
		setInput
	} = useCommandStore();

	const router = useRouter();

	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => inputRef.current?.focus());

	const keymap = useMemo(() => {
		return {
			'g h': () => router.push('/'),
			'g a': () => router.push('/about'),
			'g b': () => router.push('/blog'),
			'g s': () => router.push('/stack'),
			'g w': () => router.push('/words'),

			'g g': () => window.open('https://github.com/lavgup', '_blank'),
			'g t': () => window.open('https://twitter.com/lavgup', '_blank'),
			'g m': () => window.open('mailto:lavyag01@gmail.com'),

			'g r': () => router.push('/feed.xml'),
			'g c': () => window.open('https://github.com/lavgup/lavya.me', '_blank')
		};
	}, [router]);

	useEffect(() => {
		const unsubs = [
			tinykeys(window, keymap),
			tinykeys(window, {
				'$mod+k': event => {
					event.preventDefault();
					setOpen(!isOpen);
				}
			})
		];

		return () => unsubs.forEach(unsub => unsub());
	}, [keymap, isOpen, setOpen]);

	const Items = pages.length ? pages[pages.length - 1] : DefaultItems;

	return (
		<>
			<button
				type="button"
				title="⌘K"
				className="focus:outline-none"
				onClick={() => setOpen(true)}
			>
				<CommandIcon className="w-5 h-5" />
			</button>

			<Transition appear show={isOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					initialFocus={inputRef}
					onKeyDown={(e: KBEvent<HTMLDivElement>) => {
						if (e.key === 'ArrowDown') window.dispatchEvent(
							new KeyboardEvent('keydown', { key: 'Tab' })
						);
						else if (e.key === 'ArrowUp') window.dispatchEvent(
							new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true })
						);
						else if (e.key !== ' ' && e.key !== 'Enter') {
							document.getElementById('command-input')?.focus();
						}
					}}
					onClose={() => {
						setOpen(false);
						setTimeout(() => {
							setPages([]);
							setInput('');
						}, 200);
					}}
				>
					<div
						className="flex items-center justify-center min-h-screen"
					>
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-80"
							entered="opacity-80"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-white dark:bg-black" />
						</Transition.Child>

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div
								className="inline-block p-2 md:h-fit overflow-hidden w-full my-6 mx-8 md:m-0 md:max-w-2xl transform text-left bg-white dark:bg-[#111] drop-shadow-2xl rounded-xl [will-change:height] transition ease-in-out duration-200"
								aria-label="Command Menu"
							>
								<input
									className="inline-block pt-3.5 pb-3 px-4 w-full rounded-t-2xl bg-white dark:bg-[#111] border-b-2 border-gray-200 dark:border-gray-700 placeholder:text-gray-300/70 focus:outline-none transition ease-in-out duration-500"
									onChange={e => setInput(e.target.value)}
									ref={inputRef}
									value={input}
									type="text"
									placeholder={
										Items === ThemeItems
											? 'Select a theme...'
											: 'Type a command, or search...'
									}
								/>

								<div className="justify-center p-1 overflow-y-auto">
									<Items />
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}

export default memo(CommandMenu);
