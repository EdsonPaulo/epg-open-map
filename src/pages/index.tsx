import AppBar from '@material-ui/core/AppBar/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import React, { FC } from 'react';

import Fisgar from '../components/fisgar';

const App: FC = () => (
  <div>
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h5">Fisgar Open Map - Edson Gregório</Typography>
      </Toolbar>
    </AppBar>
    <main className="main">
      <Fisgar />
    </main>
  </div>
);

export default App;
