import Grid from '@material-ui/core/Grid/Grid';
import React from 'react';

import { useStyles } from './fisgar.helpers';
import FisgarForm from './form';
import FisgarMap from './map';

const Fisgar: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} lg={6} className={classes.formContainer}>
        <FisgarForm />
      </Grid>
      <Grid item xs={12} lg={6}>
        <FisgarMap />
      </Grid>
    </Grid>
  );
};

export default Fisgar;
