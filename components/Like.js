export default function Like({ like }) {
	return (
		<div className="rounded-md text-like-text bg-like-bg dark:bg-like-dbg dark:text-like-dtext p-2 mt-3 mr-2">
			{like}
		</div>
	);
}