import React from 'react'
import Head from 'next/head'
import NavBar from '../components/Header'
import EventsContainer from '../components/EventsContainer'
import { Grid, Typography } from '@mui/material'
import { spacing } from '@mui/system'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
        />
      ) : (
      <Grid container spacing={2}>
        <Grid xs={4}>
          <EventsContainer></EventsContainer>
        </Grid>
        <Grid xs={8}>
          <Typography>xs=4</Typography>
        </Grid>
        <Grid xs={4}>
          <Typography>xs=4</Typography>
        </Grid>
        <Grid xs={8}>
          <Typography>xs=8</Typography>
        </Grid>
      </Grid>
      )}
    </div>
  )
}

export default Home