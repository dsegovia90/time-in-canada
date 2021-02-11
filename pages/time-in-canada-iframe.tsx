import { Box } from '@material-ui/core'
import React from 'react'
import TimeCalculator from '../src/components/TimeCalculator'

const Home: React.FC = () => {
  return (
    <Box mb={0.5}>
      <TimeCalculator />
    </Box>
  )
}

export default Home
