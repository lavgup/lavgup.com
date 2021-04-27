export default function Dislike({ like }) {
	return (
		<div className="rounded-md text-dislike-text bg-dislike-bg dark:bg-dislike-dbg dark:text-dislike-dtext p-2 mt-3 mr-2">
			{like}
		</div>
	);
}