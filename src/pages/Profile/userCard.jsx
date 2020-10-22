import React from 'react';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const UserCard = ({ classes, loginData, handleClick, profileData }) => {
  return (
    <Card className={classes.root}>
      {loginData ? (
        <>
          <CardContent>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              User Info
            </Typography>
            <Typography variant="h5" component="h2" className={classes.pos}>
              {loginData.name}
            </Typography>
            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
            >
              Email
            </Typography>
            <Typography variant="body2" component="p" className={classes.pos}>
              {loginData.email}
            </Typography>
            <Typography
              className={classes.subtitle}
              color="textSecondary"
              gutterBottom
            >
              Last Sign In
            </Typography>
            <Typography variant="body2" component="p">
              {loginData.lastSignInAt}
            </Typography>
          </CardContent>
          <CardActions>
            {!profileData && (
              <Button size="small" onClick={handleClick}>
                See User Profile
              </Button>
            )}
          </CardActions>
        </>
      ) : (
        <Typography variant="h5" component="h2">
          No User Logged In
        </Typography>
      )}
    </Card>
  );
};

export default UserCard;
