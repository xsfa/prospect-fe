import React from 'react'
import Head from 'next/head'
import NavBar from '../components/Header'
import EventsContainer from '../components/EventsContainer'
import { Grid, Typography } from '@mui/material'
import { spacing } from '@mui/system'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import MapBox from '../components/MapBox'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div>
      {!session? (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            theme="dark"
          />
        </div>
      ) : (
        <>
        <NavBar></NavBar>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MapBox></MapBox>
        <EventsContainer></EventsContainer>
        </LocalizationProvider>
        </>
      )}
    </div>
  )
}

export default Home