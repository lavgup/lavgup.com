import Container from '../components/Container';
import Like from '../components/Like';
import Dislike from '../components/Dislike';

export default function About() {
	const likes = [
		'JavaScript', 'Node.js', 'React', 'Next.js', 'Vercel',
		'Go', 'Java', 'Discord', 'MediaWiki', 'Apple', 'Badminton', 'Tennis',
		'Physics', 'Mathematics', 'Comp Sci', 'Programming',
		'Blogging', 'Reading', 'Rap', 'Grime', 'Pizza', 'Sushi'
	];

	const dislikes = [
		'Toxicity', 'K-Pop', 'TikTok', 'Basketball', 'Uninformed politics', 'Trump',
		'Android', 'Facebook', 'Trolls', 'Chrome', 'Adobe CC', 'Reddit',
		'Windows', 'Arch', 'Caramel', 'Peanut butter'
	];

	return (
		<Container
			title="About - Lav"
			description="A description of me, what I like and what I dislike."
		>
			<div className="flex flex-col justify-center items-start max-w-4xl mx-auto mb-16">
				<h1 className="font-bold text-3xl md:text-5xl tracking-tight">
					About
				</h1>
				<p className="text-gray-600 dark:text-gray-400 mt-2">
					Hey! I'm Lavya and I'm a high school student located in Newcastle, a city two hours away from
					Sydney, Australia.
					Apart from my school studies, I am enrolled in my local university, the University of Newcastle, for
					a high-performing students program.
					Out of options including design and medicine courses, I chose a course I was very interested in
					completing - Object Oriented Programming.
					<br /><br />
					To remain in shape, I play badminton 🏸 three times a week. Badminton was one of the first sports I
					picked up alongside soccer, rugby and tennis.
					Due to court availability changes, I dropped badminton and started playing tennis, in which I
					engaged with many tournaments around the city and earned a A$100 prize.
					In that time, new badminton courts had been made (and coincidentally the tennis courts' owners lost
					their lease!), so I started playing the sport again and I'm loving it.
					<br /><br />
					For my hobby, I develop software to help myself and others in their daily lives.
					Why did I start writing code?
					Just to have the freedom.
					The freedom of being able to maintain a presence on the internet and automate the tedious tasks you
					carry out everyday, for free.
					In fact, I created this website with no advertisements and on a custom domain without paying a cent.
				</p>

				<h2 className="font-bold text-2xl md:text-4xl tracking-tight mt-16 mb-2">
					I like
				</h2>
				<ul className="flex flex-wrap list-none p-0">
					{likes.map(like => (
						<li><Like like={like} /></li>
					))}
				</ul>

				<h2 className="font-bold text-2xl md:text-4xl tracking-tight mt-16 mb-2">
					I dislike
				</h2>
				<ul className="flex flex-wrap list-none p-0">
					{dislikes.map(like => (
						<li><Dislike like={like} /></li>
					))}
				</ul>
			</div>
		</Container>
	);
}