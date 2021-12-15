export default function LeftArrow({ ...props }) {
	return (
		<svg
			{...props}
			fill="none"
			stroke="currentColor"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M7 16l-4-4m0 0l4-4m-4 4h18"
			/>
		</svg>
	);
}
