import React from 'react';
import { Card } from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ProfileCard = ({ classes, profileData }) => {
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Profile
        </Typography>
        <Typography variant="body2" component="p">
          BirthDate: {profileData.birthdate}
        </Typography>
        <Typography variant="body2" component="p">
          Children: {profileData.children}
        </Typography>
        <Typography variant="body2" component="p">
          Ethnicity: {profileData.ethnicity}
        </Typography>
        <Typography variant="body2" component="p">
          Gender: {profileData.gender}
        </Typography>
        <Typography variant="body2" component="p">
          Marital Status: {profileData.maritalStatus}
        </Typography>
        <Typography variant="body2" component="p">
          Phone Number: {profileData.phoneNumber}
        </Typography>
        <Typography variant="body2" component="p">
          Zip Code: {profileData.zipcode}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
