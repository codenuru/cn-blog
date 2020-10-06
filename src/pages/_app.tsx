import App, { AppProps } from 'next/app'
import React, { useEffect } from 'react'
import { checkToken, getToken } from '@utils/tokenHelper'

import { ApolloProvider } from '@apollo/client'
import { AuthProvider } from '@app/contexts/authContext'
import CssBaseline from '@material-ui/core/CssBaseline'
import GlobalHead from '@app/components/common/GlobalHead'
import { ThemeProvider } from '@app/contexts/ThemeContext'
import { appWithTranslation } from '@app/utils/i18next'
import { useApollo } from '@app/lib/withApollo'

interface PuffyAppProps extends AppProps {
  token: string
}
function BlogApp(props: PuffyAppProps) {
  const { Component, pageProps, token } = props
  const apolloClient = useApollo(pageProps.initialApolloState)
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const authed = checkToken(token)

  return (
    <React.Fragment>
      <GlobalHead />
      <AuthProvider token={token} authed={authed}>
        <ThemeProvider>
          <CssBaseline />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment>
  )
}

// see: https://github.com/isaachinman/next-i18next/issues/652#issuecomment-665845980
// Support for `getServerSideProps`
BlogApp.getInitialProps = async appContext => {
  const appProps = await App.getInitialProps(appContext)
  const { defaultProps } = appContext.Component

  const token = getToken(appContext.ctx)

  return {
    ...appProps,
    pageProps: {
      namespacesRequired: [
        ...(appProps.pageProps.namespacesRequired || []),
        ...(defaultProps?.i18nNamespaces || []),
      ],
    },
    token,
  }
}

export default appWithTranslation(BlogApp)