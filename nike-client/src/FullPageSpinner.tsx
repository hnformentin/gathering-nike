import React from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  parent: {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
  },
});

export const FullPageSpinner = () => {
  const classes = useStyles();

  return (
    <div className={classes.parent}>
      <CircularProgress />
    </div>
  );
};
