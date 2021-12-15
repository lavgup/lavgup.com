export default function DuplicateIcon({ ...props }) {
	return (
		<svg
			{...props}
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth="1"
			strokeLinecap="round"
			strokeLinejoin="round"
			fill="none"
			shapeRendering="geometricPrecision"
			color="currentColor"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				strokeWidth={2}
				d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
			/>
		</svg>
	);
}
