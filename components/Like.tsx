export default function Like({ like }: { like: string }) {
	return (
		<div className="p-2 mt-3 mr-2 rounded-md text-like-text bg-like-bg dark:bg-like-dbg dark:text-like-dtext">
			{like}
		</div>
	);
}
