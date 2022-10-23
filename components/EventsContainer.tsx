import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, Modal, TextField, Typography } from '@mui/material';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import EventBox from './EventBox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';

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

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function EventsContainer(props: EventData[]) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChangeStart = (newStart: Dayjs | null) => {
    setStart(newStart);
  };
  const [end, setEnd] = React.useState<Dayjs | null>(
    dayjs('2014-08-18T21:11:54'),
  );

  const handleChangeEnd = (newEnd: Dayjs | null) => {
    setEnd(newEnd);
  };
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
      <Button onClick={handleOpen}>Open survey</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
            <TextField
              required
              id="Title"
              label="Title"
              defaultValue=""
            />
            <TextField
              id="Description"
              label="Description"
              defaultValue=""
            />
            <DateTimePicker
              label="Start Time"
              value={start}
              onChange={handleChangeStart}
              renderInput={(params) => <TextField {...params} />}
            />
            <DateTimePicker
              label="End Time"
              value={end}
              onChange={handleChangeEnd}
              renderInput={(params) => <TextField {...params} />}
            />
            <TextField
              required
              id="Location"
              label="Location (Address)"
              defaultValue=""
            />
        </Box>
      </Modal>
    </Box>
  );
}

export default EventsContainer