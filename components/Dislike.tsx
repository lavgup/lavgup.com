export default function Dislike({ dislike }: { dislike: string }) {
	return (
		<div className="rounded-md text-dislike-text bg-dislike-bg dark:bg-dislike-dbg dark:text-dislike-dtext p-2 mt-3 mr-2">
			{dislike}
		</div>
	);
}
