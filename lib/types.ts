export interface Post {
	title: string,
	description: string,
	slug: string,
	tags: string[]
}

export interface FrontMatter {
	readingTime: {
		text: string
	};
	title: string,
	slug: string,
	description: string,
	publishedAt: string,
	image: string,
	tags: string[]
}
