import React, { useState } from 'react'
import { Box, Button, IconButton, TextField, Typography } from '@material-ui/core'
import LuxonUtils from '@date-io/luxon'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { DateTime } from 'luxon'
import { Delete } from '@material-ui/icons'
import { v4 as uuidv4 } from 'uuid'

interface TravelItem {
  uuid: string
  from: DateTime
  to: DateTime
  displayName: string
}

const TimeCalculator: React.FC = () => {
  const [landingDate, setLandingDate] = useState<DateTime>(DateTime.local())
  const [travels, setTravels] = useState<TravelItem[]>([])
  const [counter, setCounter] = useState<number>(1)
  const [edited, setEdited] = useState<boolean>(false)

  const handleTimeChange = (date: DateTime) => {
    setLandingDate(date)
  }

  const addTravel = () => {
    setTravels((prevTravels) => {
      return [
        ...prevTravels,
        {
          uuid: uuidv4(),
          displayName: `Travel #${counter}`,
          from: DateTime.local(),
          to: DateTime.local(),
        },
      ]
    })
    setCounter((prevCounter) => prevCounter + 1)
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
    const travelDaysCount = travels.reduce((acc, val) => {
      const daysCount = Math.ceil(val.to.diff(val.from, 'day').days)
      return acc + daysCount
    }, 0)

    const initialDiff = Math.ceil(DateTime.local().diff(landingDate, 'day').days)
    return initialDiff - travelDaysCount - 1
  }

  const updateDisplayName = (idx) => ({ target }) => {
    setTravels((prevTravels) => {
      prevTravels[idx].displayName = target.value
      return [...prevTravels]
    })
    setEdited(true)
  }

  return (
    <MuiPickersUtilsProvider utils={LuxonUtils}>
      <Box mb={1}>
        <Typography variant="h5">Time in Canada:</Typography>
      </Box>
      <Box mb={3}>
        <Typography>
          {getTimeInCanada()} days out of 1,095 needed. You are at {((getTimeInCanada() / 1095) * 100).toFixed(2)}%
        </Typography>
      </Box>
      <Box>
        <KeyboardDatePicker
          onChange={handleTimeChange}
          variant="inline"
          format="yyyy/MM/dd"
          value={landingDate}
          label="Landing Date:"
          disableFuture
          autoOk
        />
      </Box>
      <Box mt={5}>
        <Typography variant="h5">Travel History Outside Canada</Typography>
      </Box>
      {travels.map((travel, idx) => {
        const error = travels.reduce((acc, travelCheck, jdx) => {
          if (acc || idx === jdx) return acc
          const fromIsBetween = travel.from > travelCheck.from && travel.from < travelCheck.to
          const toIsBetween = travel.to > travelCheck.from && travel.to < travelCheck.to
          const isWrapping = travel.from < travelCheck.from && travel.to > travelCheck.to
          return acc || fromIsBetween || toIsBetween || isWrapping
        }, false)
        return (
          <Box key={travel.uuid} my={3}>
            <Box>
              <TextField
                variant="filled"
                value={travel.displayName}
                onChange={updateDisplayName(idx)}
                InputProps={{ disableUnderline: true }}
                label={idx === 0 && !edited ? 'This is editable' : ''}
              />
            </Box>
            <Box display="flex" py={5} px={1.5} style={{ border: '2px solid #e3e3e3', borderRadius: '0 4px 4px 4px' }}>
              <Box mr={3}>
                <KeyboardDatePicker
                  onChange={handleTravelChange(idx, 'from')}
                  variant="inline"
                  format="yyyy/MM/dd"
                  value={travel.from}
                  minDate={landingDate}
                  maxDate={travel.to}
                  label="From:"
                  disableFuture
                  autoOk
                  error={error}
                  helperText={error ? 'Overlapping dates.' : ''}
                />
              </Box>
              <Box>
                <KeyboardDatePicker
                  onChange={handleTravelChange(idx, 'to')}
                  variant="inline"
                  format="yyyy/MM/dd"
                  value={travel.to}
                  minDate={travel.from}
                  label="To:"
                  disableFuture
                  autoOk
                  error={error}
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
          </Box>
        )
      })}
      <Box mt={5}>
        <Button variant="contained" color="primary" onClick={addTravel}>
          Add new travel
        </Button>
      </Box>
    </MuiPickersUtilsProvider>
  )
}

export default TimeCalculator
