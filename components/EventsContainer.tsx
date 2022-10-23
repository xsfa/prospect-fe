import * as React from 'react';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import EventBox from './EventBox';

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
let eventsData : EventData[] = [{
  title: "Event 1",
  description: "Event 1's description", 
  profile: {},
  partySize: 5,
  time: new Date(),
  location: {}
},
{
  title: "Event 2",
  description: "Event 1's description", 
  profile: {},
  partySize: 5,
  time: new Date(),
  location: {}
},
{
  title: "Event 3",
  description: "Event 1's description", 
  profile: {},
  partySize: 5,
  time: new Date(),
  location: {}
},
{
  title: "Event 4",
  description: "Event 1's description", 
  profile: {},
  partySize: 5,
  time: new Date(),
  location: {}
},
{
  title: "Event 5",
  description: "Event 1's description", 
  profile: {},
  partySize: 5,
  time: new Date(),
  location: {}
},
]

function EventsContainer(props: EventData[]) {
  return (
    <Box
      sx={{
        width: 400,
        height: '80vh',
        border: "1px solid black",
        borderRadius: 4,
        position: "absolute",
        top: '10vh',
        left: 20,
        backgroundColor: "#FFFFFF"
      }}
    >
      <Box
        sx={{
          height: '80vh',
          overflow:'scroll'
        }}
      >
        {eventsData.map(eventData => {
          return (
          <EventBox 
            title={eventData.title} 
            description={eventData.description} 
            profile={eventData.profile} 
            partySize={eventData.partySize} 
            time={eventData.time} 
            location={eventData.location}/> 
          )
        })}
      </Box>
    </Box>
  );
}

export default EventsContainer