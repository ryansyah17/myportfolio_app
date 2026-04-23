import { Helmet } from 'react-helmet-async'

interface Props {
    title?: string
    description?: string
    image?: string
    url?: string
}

const BASE_URL = 'http://localhost:5173'
const SITE_NAME = 'Ryansyah Putra'
const DEFAULT_DESC = 'Flutter Developer · Go & React — Building clean and functional apps.'
const DEFAULT_IMG = `${BASE_URL}/og-image.png`

const SEO = ({
    title,
    description = DEFAULT_DESC,
    image = DEFAULT_IMG,
    url = BASE_URL,
}: Props) => {
    const fullTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />

            {/* Open Graph (Facebook, WhatsApp) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:url" content={url} />
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={SITE_NAME} />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />

            {/* Canonical */}
            <link rel="canonical" href={url} />
        </Helmet>
    )
}

export default SEO