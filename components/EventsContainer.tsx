import * as React from 'react';
import Box from '@mui/material/Box';
import { Button, IconButton, Modal, TextField, Typography } from '@mui/material';
import { createPortal } from 'react-dom/cjs/react-dom.development';
import EventBox from './EventBox';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs, { Dayjs } from 'dayjs';
import { createClient } from '@supabase/supabase-js';
import { useEffect } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { makeStyles } from "@material-ui/core/styles";
const { v4: uuidv4 } = require('uuid');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

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
  end: Date,
  location: string
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

const useStyles = makeStyles(theme => ({
  customHoverFocus: {
    backgroundColor: "#4ebc3b",
    "&:hover, &.Mui-focusVisible": { backgroundColor: "#4ebc3b" }
  }
}));

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

// const axios = require('axios');

const createEvents = async (id, title, desc, time_start, time_end, creator, location, longitude, latitude) => {
//  if (title.length > 100) {
//      console.log("Title too long")
//      title = "TOO LONG"
//  }
//  if (desc > 1000) {
//      console.log("Description too long")
//      desc = "TOO LONG"
//  }
//  if (time_start >= time_end) {
//      console.log("Events ends before start time: invalid time")
//      time_start = '2020-01-01 12:00:00+00'
//      time_end = '2020-12-30 12:00:00+00'
//  }
 const { error } = await supabase
 .from('events')
 .insert([{ id: id, title: title, desc: desc, time_start: time_start,
      time_end: time_end, creator: creator,
       location: location, longitude: longitude, latitude: latitude}])
 
 if (error) {
     console.log(error)
 } else {
     console.log("Event successfully created")
 }
}

function EventsContainer() {
  const [features, setFeatures] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const classes = useStyles();
  useEffect(() => {
    if (loading) {
      var events = [];
      supabase.from('events')
                .select('title, desc, creator, location, time_start, time_end, longitude, latitude')
                .then(({ data, error }) => {
                console.log(data);
                console.log(error);
                
                // create array of data
                for (var i = 0; i < data.length; i++) {
                    events.push(data[i]);
                }
            }).then(() => {
              var featuresTemp: EventData[] = []
                for (var i = 0; i < events.length; i++) {
                    var event = events[i];
    
                    var feature_title = event.title;
                    var feature_desc = event.desc;
                    var feature_creator = event.creator;
                    var feature_long = event.longitude;
                    var feature_lat = event.latitude;
                    var feature_start = event.time_start;
                    var feature_end = event.time_end;
                    var feature_location = event.location;
                    var params = {
                      access_key: 'abad66fce97fab5f5c568c0320ea8fcf',
                      query: `${feature_long},${feature_lat}`
                    }
                    // axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&key=AIzaSyAynkqrmClN-pCo_-GyCvbBot94DD5drOs', {params})
                    // .then(response => {
                    //   var feature: EventData = {
                    //     title: feature_title,
                    //     description: feature_desc, 
                    //     profile: feature_creator,
                    //     partySize: 5,
                    //     time: new Date(),
                    //     location: {response}
                    //   };
                    //   console.log(response)
                    //   featuresTemp.push(feature);
                    // }).catch(error => {
                    //   console.log(error);
                    // });
                    var feature: EventData = {
                      title: feature_title,
                      description: feature_desc, 
                      profile: feature_creator,
                      partySize: 5,
                      time: new Date(feature_start),
                      end: new Date(feature_end),
                      location: feature_location
                    };
                    featuresTemp.push(feature);
                }
                setFeatures(featuresTemp)
                console.log(featuresTemp);
                console.log(features);
            });
          }
        }, [loading]);
  useEffect(() => {setLoading(false) }, [features]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const handleChangeStart = (newStart: Dayjs | null) => {
    setStart(newStart);
  };
  const [end, setEnd] = React.useState<Dayjs | null>(
    dayjs(new Date()),
  );

  const handleChangeEnd = (newEnd: Dayjs | null) => {
    setEnd(newEnd);
  };

  const toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum/1000;
  }

  const [formInput, setFormInput] = React.useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      title: "", 
      desc: "", 
      time_start: start.toDate(),
      time_end: end.toDate(), 
      longitude: 0.0, 
      latitude: 0.0
    }
  );

  const handleInput = evt => {
    const name = evt.target.name;
    const newValue = evt.target.value;
    setFormInput({ [name]: newValue });
  };

  const handleSubmit = evt => {
    evt.preventDefault();

    let data = formInput;

    createEvents(uuidv4(), data.title,
    data.desc, data.time_start, data.time_end, 9521,
    'Seattle', data.longitude, data.latitude).then(function() {
      setLoading(true)
    });

    // fetch("https://pointy-gauge.glitch.me/api/form", {
    //   method: "POST",
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Content-Type": "application/json"
    //   }
    // })
    //   .then(response => response.json())
    //   .then(response => console.log("Success:", JSON.stringify(response)))
    //   .catch(error => console.error("Error:", error));
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
        {features.map(eventData => {
          return (
          <EventBox 
            title={eventData.title} 
            description={eventData.description} 
            profile={eventData.profile} 
            partySize={eventData.partySize} 
            time={eventData.time} 
            end={eventData.end}
            location={eventData.location}/> 
          )
        })}
      </Box>
      <IconButton 
      className={classes.customHoverFocus}
      aria-label="delete"
      onClick={handleOpen}
      sx={{
        position: "absolute",
        top: '73vh',
        left: 340,
      }}
      >
        <AddIcon/>
      </IconButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Create Event</Typography>
            <TextField
              required
              id="Title"
              name="title"
              label="Title"
              defaultValue=""
              onChange={handleInput}
              sx={{ margin: 2}}
            />
            <TextField
              id="Description"
              name="desc"
              label="Description"
              defaultValue=""
              onChange={handleInput}
              sx={{ margin: 2}}
            />
            <Box sx={{ margin: 2}}>
            <DateTimePicker
              label="Start Time"
              value={start}
              onChange={handleChangeStart}
              renderInput={(params) => <TextField {...params} />}
              
            />
            </Box>
            <Box sx={{ margin: 2}}>
            <DateTimePicker
              label="End Time"
              value={end}
              onChange={handleChangeEnd}
              renderInput={(params) => <TextField {...params} />}
            />
            </Box>
            <TextField
              
              id="Location"
              label="Location"
              defaultValue=""
              sx={{ margin: 2}}
            />
            <TextField
              required
              id="Long"
              name="longitude"
              label="Long"
              defaultValue=""
              onChange={handleInput}
              sx={{ margin: 2}}
            />
            <TextField
              required
              id="Lat"
              name="latitude"
              label="Lot"
              defaultValue=""
              onChange={handleInput}
              sx={{ margin: 2}}
            />
            <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ margin: 2}}
          >
            Create Event
          </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
}

export default EventsContainer