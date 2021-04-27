export default function ThemeButton({ ...props }) {
	const { resolvedTheme, setTheme } = props;

	return (
		<button
			aria-label="Toggle Dark Mode"
			type="button"
			className="bg-nav-gray dark:bg-cool-gray-light text-black dark:text-white hover:bg-gray-300 dark:hover:bg-cool-gray-dark px-3 py-2.5 mt-2 h-10 w-10 text-sm font-semibold rounded-lg dark-mode:bg-transparent dark-mode:hover:bg-gray-600 dark-mode:focus:bg-gray-600 dark-mode:focus:text-white dark-mode:hover:text-white dark-mode:text-gray-200 md:mt-0 md:ml-4 hover:text-gray-900 focus:text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
			onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 24 24"
				fill="currentColor"
				stroke="currentColor"
				className="text-gray-800 dark:text-gray-200"
			>
				{resolvedTheme === 'dark' ? (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
					/>
				) : (
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
					/>
				)}
			</svg>
		</button>
	);
}