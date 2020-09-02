import React, { useContext, useState } from 'react';
import { LoginContext } from '../../context';
import { makeStyles } from '@material-ui/core/styles';

import normalize from 'json-api-normalizer';
import build from 'redux-object';

import { getFrom, setCompanyToken } from '../../api/api';

import ProfileCard from './profileCard';
import UserCard from './userCard';

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 16,
  },
  subtitle: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const Profile = () => {
  const [loginData, setLoginData] = useContext(LoginContext);
  const [profileData, setProfileData] = useState(null);
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleClick = () => {
    // Set company-token header for axios request
    setCompanyToken();
    getFrom(`/users/${loginData.uniqueId}/profile`).then(
      (response) => {
        // Standard Response from service
        console.log(response);
        const normalizedDataObject = normalize(response.data);
        const serializedData = build(normalizedDataObject, 'userProfile');
        setProfileData(serializedData[0]);
        // Serialized Data
        console.log(serializedData[0]);
      },
      (error) => console.log(error)
    );
  };

  return (
    <>
      <UserCard
        classes={classes}
        loginData={loginData}
        handleClick={handleClick}
        profileData={profileData}
      />
      {profileData && <ProfileCard classes={classes} profileData={profileData} />}
    </>
  );
};

export default Profile;
