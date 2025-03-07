import { Button, Card, Container, Grid, Typography } from '@mui/material';
import * as Icons from '@mui/icons-material'
import * as React from 'react';
import Router from 'next/router';

const Home = () => {
  const [games, setGames] = React.useState([0, 1, 2, 3]);
  return (
    <Container sx={{mt: 3}}>
      <div className="flex-row">
        <Button sx={{mb: 2, mx: 2}} variant="outlined" color="primary">
          <Icons.AddCard></Icons.AddCard>
          <Typography sx={{mx: 2}}>New Game</Typography>
        </Button>
        <Button sx={{mb: 2}} variant="outlined" color="primary" onClick={() => Router.push('/Character/Create')}>
          <Icons.AddReaction></Icons.AddReaction>
          <Typography sx={{mx: 2}}>New Character</Typography>
        </Button>
      </div>
      <Grid container spacing={2}>
        {games.map((g, idx) => {
          return (
            <Grid key={idx} item xs={3}>
              <Card 
                elevation={4} 
                sx={{ "&:hover": {backgroundColor: "primary.dark"}, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 300}}
                >
                {g}
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Container>
  );
}

export default Home;