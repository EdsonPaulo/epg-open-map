import Grid from '@material-ui/core/Grid/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

import FisgarForm from './form';
import FisgarMap from './map';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(4),
    },
  }),
);

const Fisgar: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.paper}>
            <FisgarForm />
          </Paper>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper className={classes.paper}>
            <FisgarMap />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Fisgar;
