import React, { useEffect } from 'react'
import { Box, Container, Typography } from '@material-ui/core'

const Home: React.FC = () => {
  function resizeIframe() {
    const iframe = document.getElementById('time-in-canada-iframe')
    iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px'
  }

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.data === 'resizeTimeCalculator' && event.origin === 'https://time-in-canada.vercel.app') {
        console.log(event)
        resizeIframe()
      }
    })
  }, [])

  return (
    <Container>
      <Box my={10}>
        <iframe
          id="time-in-canada-iframe"
          frameBorder="0"
          scrolling="no"
          style={{ display: 'block', width: '100%', border: 'none' }}
          src="/time-in-canada-iframe"
          onLoad={resizeIframe}
        />
      </Box>
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
