import Container from 'components/Container';
import Like from 'components/Like';
import Dislike from 'components/Dislike';

export default function About() {
	const likes = [
		'JavaScript', 'Node.js', 'React', 'Next.js', 'Vercel',
		'Go', 'Java', 'Discord', 'MediaWiki', 'Apple', 'Badminton', 'Tennis',
		'Physics', 'Mathematics', 'Comp Sci', 'Programming',
		'Blogging', 'Reading', 'Rap', 'Grime', 'Pizza', 'Sushi'
	] as const;

	const dislikes = [
		'Toxicity', 'K-Pop', 'TikTok', 'Basketball', 'Uninformed politics',
		'Android', 'Facebook', 'Trolls', 'Chrome', 'Adobe CC', 'Reddit',
		'Windows', 'Arch', 'Caramel', 'Peanut butter'
	] as const;

	return (
		<Container
			title="About - Lav"
			description="A description of me, what I like and what I dislike."
		>
			<div className="flex flex-col items-start justify-center max-w-4xl mx-auto mb-16">
				<h1 className="text-3xl font-bold tracking-tight md:text-5xl">
					About
				</h1>
				<p className="w-full mt-2 text-gray-600 max-w-none prose dark:prose-dark dark:text-gray-400">
					Hey! I&apos;m Lavya and I&apos;m a high school student located in Newcastle, a city two hours away from Sydney, Australia.
					Apart from my school studies, I am enrolled in my local university, the University of Newcastle, for a high-performing students program.
					Out of options including design and medicine courses, I chose a course I was very interested in completing - Object Oriented Programming.

	                <br />
					<br />
					To remain in shape, I play badminton three times a week. Badminton was one of the first sports I picked up alongside soccer, rugby and tennis.
					Due to court availability changes, I dropped badminton and started playing tennis, in which I engaged with many tournaments around the city and earned a A$100 prize.
					In that time, I had found interest in badminton again (and coincidentally the original tennis court managers lost their lease!), so I started playing the sport again and I&apos;m loving it.

					<br />
					<br />

					For my hobby, I develop software to help myself and others in their daily lives.
					Why did I start writing code?
					Just to have the freedom.
					The freedom of being able to maintain a presence on the internet and automate the tedious tasks
					you
					carry out everyday, for free.
					In fact, I created this website with no advertisements and on a custom domain without paying a
					cent.
				</p>

				<h2 className="mt-16 mb-2 text-2xl font-bold tracking-tight md:text-4xl">
					I like
				</h2>
				<ul className="flex flex-wrap p-0 list-none">
					{likes.map(like => (
						<li key={like}><Like like={like} /></li>
					))}
				</ul>

				<h2 className="mt-16 mb-2 text-2xl font-bold tracking-tight md:text-4xl">
					I dislike
				</h2>
				<ul className="flex flex-wrap p-0 list-none">
					{dislikes.map(dislike => (
						<li key={dislike}><Dislike dislike={dislike} /></li>
					))}
				</ul>
			</div>
		</Container>
	);
}
