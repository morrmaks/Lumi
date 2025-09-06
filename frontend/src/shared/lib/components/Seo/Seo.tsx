import { Helmet } from 'react-helmet-async'

interface SeoProps {
  title?: string
  description?: string
}

export const Seo = (props: SeoProps) => {
  const { title, description } = props

  return (
    <Helmet>
      {title && <title>{title} – Lumi</title>}
      {description && <meta name="description" content={description} />}
    </Helmet>
  )
}
