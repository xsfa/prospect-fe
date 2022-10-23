import * as React from 'react';
import Box from '@mui/material/Box';
import { Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@mui/material';
import {ThumbUpOffAltIcon, ThumbUpAltIcon, ShareIcon} from '@mui/icons-material;


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

let options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit' }
function EventBox(eventData: EventData) {
  return (
    <Card sx={{
      width: 300,
      height: '15vh',
      maxHeight: '100vh',
      border: "1px solid black",
      borderRadius: 8
    }}>
      <CardActions disableSpacing>
        <IconButton aria-label="Going">
          <ThumbUpOffAltIcon />
        </IconButton>
        <IconButton aria-label="Share">
          <ShareIcon />
        </IconButton>
      </CardActions>
      <CardActionArea>
        <CardContent>
          <Typography variant="h6" align="left">{eventData.title}</Typography>
          {/* <Typography variant="h5" align="left">{eventData.description}</Typography> */}
          <Typography variant="body2" align="left">{eventData.time.toLocaleTimeString("en-US", { options })}</Typography>
          <Typography variant="body1" align="left">People Attending: {eventData.partySize}</Typography>
        </CardContent>
      </CardActionArea></>
    </Card>
  );
}

export default EventBox