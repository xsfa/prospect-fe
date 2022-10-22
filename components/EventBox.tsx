import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { createPortal } from 'react-dom/cjs/react-dom.development';

interface Profile {

}

interface Location {

}
interface EventData {
  title: string,
  description: string, 
  profile: Profile,
  partySize: number,
  time: Date,
  location: Location
}

function EventBox(eventData: EventData) {
  return (
    <Box
      sx={{
        width: 300,
        height: '10vh',
        maxHeight: '40vh',
        border: "1px solid black",
        borderRadius: 8
        
      }}
    >
      <Typography variant="h5" align="left">{eventData.title}</Typography>
      {/* <Typography variant="h5" align="left">{eventData.description}</Typography> */}
      <Typography variant="h5" align="left">People Attending: {eventData.partySize}</Typography>
      <Typography variant="h5" align="left">{eventData.time.toLocaleString()}</Typography>
    </Box>
  );
}

export default EventBox