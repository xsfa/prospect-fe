import * as React from 'react';
import Box from '@mui/material/Box';
import { Accordion, AccordionDetails, AccordionSummary, Card, CardActionArea, CardActions, CardContent, Grid, IconButton, ToggleButton, Typography } from '@mui/material';
import {ThumbUpOffAlt, ThumbUpAlt, Share} from '@mui/icons-material';


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


function EventBox(eventData: EventData) {
  const [selected, setSelected] = React.useState(false);
  return (
    <Card 
      elevation={6}
      sx={{
        margin: 2
      }}
    >
      <CardContent sx={{paddingBottom: 0}}>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Grid container>
              <Grid item xs={12}>
                <Typography variant="h6" align="left">{eventData.title}</Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" align="left" sx={{width: "100%"}}>{eventData.time.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</Typography>
                <Typography variant="body2" align="left" sx={{width: "100%"}}>to</Typography>
                <Typography variant="body2" align="left" sx={{width: "100%"}}>{eventData.end.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute:'2-digit'})}</Typography>
                <Typography variant="body2" align="left" sx={{width: "100%"}}>@ {eventData.location}</Typography>
              </Grid>
              <Grid item xs={4}>
                {/* <Typography variant="body1" align="left" sx={{width: "100%"}}>People Attending: {eventData.partySize}</Typography> */}
              </Grid>
            </Grid>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="h5" align="left">{eventData.description}</Typography>
          </AccordionDetails>
        </Accordion>
      </CardContent>
      <CardActions disableSpacing>
      <ToggleButton
        value="check"
        color='primary'
        selected={selected}
        onChange={() => {
          setSelected(!selected);
        }}
        sx={{marginLeft: 1}}
      >
        {selected ? (<Typography>Going</Typography>) : (<Typography>Not going</Typography>)}
      </ToggleButton>
        <IconButton sx={{marginLeft: "auto"}} aria-label="Share">
          <Share/>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default EventBox