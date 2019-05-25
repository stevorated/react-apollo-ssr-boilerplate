import React from 'react'
import { Helmet } from 'react-helmet'

export default function HelmetComponent({pageTitle, ogTitle}) {
  return (
    <div>
      <Helmet>
        <title>My App-{pageTitle}</title>
        <meta property="og:title" content={ogTitle} />
      </Helmet>
    </div>
  )
}
