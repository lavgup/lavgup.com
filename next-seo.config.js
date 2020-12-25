const title = 'Lav - Aussie idiot';
const description = 'Australian student with a passion to learn and explore the world-wide web.';

const SEO = {
    title,
    description,
    canonical: 'https://lavya.tech',
    openGraph: {
        type: 'website',
        locale: 'en_IE',
        url: 'https://lavya.tech/',
        title,
        description,
        images: [
            {
                url: 'https://lavya.tech/static/banner.png',
                alt: title,
                width: 500,
                height: 500
            }
        ]
    },
    twitter: {
        handle: '@lavxgup',
        site: '@lavxgup',
        cardType: 'summary_large_image'
    }
}

export default SEO;