import Head from 'next/head'
import React from 'react'

function GlobalHead() {
  return (
    <Head>
      {/* Use minimum-scale=1 to enable GPU rasterization */}
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
      />
    </Head>
  )
}

export default GlobalHead
