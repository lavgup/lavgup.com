import { memo, ReactNode } from 'react';
import { useCommandStore } from '../../store/command';
import { useRouter } from 'next/router';

import { ItemType } from './Items';
import { useTheme } from 'next-themes';

type ItemProps = ItemType & {
	children?: ReactNode;
	closeOnCallback?: boolean;
}

function Item({ children, closeOnCallback = true, ...props }: ItemProps) {
	const {
		setPages,
		setOpen,
		input,
		setInput
	} = useCommandStore();

	const { resolvedTheme } = useTheme();

	const router = useRouter();

	const cb = () => {
		if (props.callback) props.callback({
			navigator,
			router,
			theme: resolvedTheme
		});

		if (props.href) {
			props.href.startsWith('/')
				? window.location.href = props.href
				: window.open(props.href);
		}

		if (props.items) {
			setInput('');
			setPages([props.items]);
			closeOnCallback = false;
		}

		if (closeOnCallback) {
			setOpen(false);
			setInput('');
			setTimeout(() => setPages([]), 200);
		}
	};

	const matched = props.name.toLowerCase().includes(input.trim().toLowerCase());

	return (
		<li className="list-none">
			<button
				{...props}
				className={`
				${input.length && (matched || 'hidden')} 
				flex flex-row w-full gap-3 items-center px-2.5 py-2 rounded-md leading-4 transition ease-in-out duration-300
				font-light text-gray-600 hover:text-gray-700 hover:bg-gray-100 dark:text-[#BCBCBC]/90 hover:text-gray-400 dark:hover:text-[#BCBCBC] dark:hover:bg-zinc-300/[0.125]
				focus:outline-none focus:shadow-outline-blue focus:bg-gray-100 dark:focus:bg-zinc-300/[0.125]
			`}
				onClick={cb}
			>
				{!!props.icon && <props.icon className="flex-shrink-0 w-5 h-5" />}
				<p className="tracking-[-0.001rem] text-[0.9rem]">
					{props.name}
				</p>
			</button>
		</li>
	);
}

export default memo(Item);
