const title = 'Lav - Aussie idiot';
const description = 'Lav is an Australian student with a passion to learn';

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
                url: 'https://lavya.tech/_next/image?url=goat.png&w=256&q=75',
                alt: title,
                width: 1280,
                height: 720
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