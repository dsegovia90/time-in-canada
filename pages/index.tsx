import React, { useState } from 'react'
import { Box, Button, Container, IconButton, Typography } from '@material-ui/core'
import LuxonUtils from '@date-io/luxon'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTime } from 'luxon'
import { Delete } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'

interface TravelItem {
  uuid: string
  from: DateTime
  to: DateTime
}

const Home: React.FC = () => {
  const [landingDate, setLandingDate] = useState<DateTime>(DateTime.local())
  const [travels, setTravels] = useState<TravelItem[]>([])

  const handleTimeChange = (date: DateTime) => {
    setLandingDate(date)
  }

  const addTravel = () => {
    setTravels((prevTravels) => {
      return [
        ...prevTravels,
        {
          uuid: uuidv4(),
          from: DateTime.local(),
          to: DateTime.local(),
        },
      ]
    })
  }

  const handleTravelChange = (idx: number, fromOrTo: 'from' | 'to') => (date: DateTime) => {
    setTravels((prevTravels) => {
      prevTravels[idx][fromOrTo] = date
      return [...prevTravels]
    })
  }

  const removeTravel = (idx: number) => {
    setTravels((prevTravels) => prevTravels.filter((_, jdx) => jdx !== idx))
  }

  const getTimeInCanada = () => {
    const initialDiff = landingDate.diffNow('days')
    return Math.abs(Math.ceil(initialDiff.days))
  }

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Container>
        <Box my={10}>
          <Box mb={1}>
            <Typography variant="h5">Time in Canada:</Typography>
          </Box>
          <Box mb={3}>
            <Typography>{getTimeInCanada()} days</Typography>
          </Box>
          <Box>
            <KeyboardDatePicker
              onChange={handleTimeChange}
              variant="inline"
              format="dd/MM/yyyy"
              value={landingDate}
              label="Landing Date:"
              disableFuture
            />
          </Box>
          <Box mt={5}>
            <Typography variant="h5">Travel History Outside Canada</Typography>
          </Box>
          {travels.map((travel, idx) => (
            <Box key={travel.from.toMillis()} display="flex" my={3}>
              <Box mr={3}>
                <KeyboardDatePicker
                  onChange={handleTravelChange(idx, 'from')}
                  variant="inline"
                  format="dd/MM/yyyy"
                  value={travel.from}
                  label="From:"
                  disableFuture
                />
              </Box>
              <Box>
                <KeyboardDatePicker
                  onChange={handleTravelChange(idx, 'to')}
                  variant="inline"
                  format="dd/MM/yyyy"
                  value={travel.to}
                  label="To:"
                  disableFuture
                />
              </Box>
              <IconButton
                onClick={() => {
                  removeTravel(idx)
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          ))}
          <Box mt={5}>
            <Button variant="contained" color="primary" onClick={addTravel}>
              Add new travel
            </Button>
          </Box>
        </Box>
      </Container>
    </MuiPickersUtilsProvider>
  )
}

export default Home
