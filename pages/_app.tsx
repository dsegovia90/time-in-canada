import React, { FC, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { DefaultSeo } from 'next-seo'
import theme from '../src/theme'

import * as gtag from '../src/lib/gtag'

import { AppProps } from 'next/dist/next-server/lib/router/router'

const isProduction = process.env.NODE_ENV === 'production'

const title = 'Time in Canada Calculator'
const description = 'Simple time in canada calculator to help permanent residents seeking citizenship.'
const url = 'https://time-in-canada.vercel.app/'

const MyApp: FC<AppProps> = (props) => {
  const { Component, pageProps } = props
  const router = useRouter()

  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      /* invoke analytics function only for production */
      if (isProduction) gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <React.Fragment>
      <DefaultSeo
        title={title}
        description={description}
        canonical={url}
        openGraph={{
          url,
          title,
          description,
          site_name: title,
        }}
      />
      <Head>
        <title></title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </React.Fragment>
  )
}

export default MyApp
