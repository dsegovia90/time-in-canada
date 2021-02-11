import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import Head from 'next/head'

const Home: React.FC = () => {
  const markup = () => ({
    __html:
      '<iframe id="time-in-canada-iframe" frameBorder="0" scrolling="no" style="display: block; width: 100%; border: none; height: 284px" src="/time-in-canada-iframe"></iframe>',
  })

  return (
    <Container>
      <Head>
        <script src="./time-in-canada-script.js" />
      </Head>
      <Box my={10} dangerouslySetInnerHTML={markup()}></Box>
      <Box mt={30} mb={8} fontStyle="italic">
        <Typography variant="caption">
          This is an unofficial tool and for reference use only.
          <br />
          Last updated in February 2021, check the official website for more accurate and up to date information{' '}
          <a
            href="https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-citizenship/become-canadian-citizen/eligibility.html#time"
            target="_blank"
            rel="noreferrer"
          >
            here
          </a>
          .
          <br />
          <br />
          You can also check out the code{' '}
          <a href="https://github.com/dsegovia90/time-in-canada" target="_blank" rel="noreferrer">
            here
          </a>
          .
        </Typography>
      </Box>
    </Container>
  )
}

export default Home
