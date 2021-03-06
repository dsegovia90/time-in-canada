import React from 'react'
import { Box, Container, Typography } from '@material-ui/core'
import TimeCalculator from '../src/components/TimeCalculator'

const Home: React.FC = () => {
  return (
    <Container>
      <Box my={10}>
        <TimeCalculator />
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
