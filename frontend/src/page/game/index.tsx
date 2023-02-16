import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { AppBar, Box, Container, IconButton, Toolbar, Typography } from '@mui/material';
import { Fragment } from 'react';
import God from './God';

const Game = () => (
  <Fragment>
    <AppBar position="absolute">
      <Toolbar>
        <Typography variant="h6">
          <div
            style={{
              width: 70,
              margin: 'auto',
              borderRadius: '50%',
              backgroundColor: '#D1ECB7',
            }}
          >
            <div style={{ margin: 2, width: 50 }}>
              <div style={{ marginLeft: 6, width: 55 }}>wolf</div>
            </div>
          </div>
        </Typography>
        <IconButton
          aria-label="delete"
          size="large"
          onClick={() => {
            // logoff();
            //setIsValidPlayerStatus(false);
          }}
        >
          <ExitToAppIcon fontSize="large" />
        </IconButton>
      </Toolbar>
    </AppBar>

    <div style={{ marginTop: 100 }}>
      <Container maxWidth={'md'}>
        <God
          id={0}
          pass={''}
          name={''}
          //   setDarkMode={props.setDarkMode}
        />
      </Container>
    </div>

    <Box pt={4}>
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  </Fragment>
);

export default Game;
