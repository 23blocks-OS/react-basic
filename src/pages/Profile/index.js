import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProfileCard from './profileCard';
import UserCard from './userCard';
import {
  selectCurrentAuthUser,
  selectUserProfile,
} from '../../redux/user/user.selectors';
import { useDispatch, useSelector } from 'react-redux';
import { getProfile } from '../../redux/user/user.actions';

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
  const [profileData, setProfileData] = useState(null);

  const dispatch = useDispatch();
  const user = useSelector(selectCurrentAuthUser);
  const userProfile = useSelector(selectUserProfile);

  useEffect(() => {
    setProfileData(userProfile);
  }, [userProfile]);

  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  const handleClick = () => {
    dispatch(getProfile(user.uniqueId));
  };

  return (
    <>
      <UserCard
        classes={classes}
        loginData={user}
        handleClick={handleClick}
        profileData={profileData}
      />
      {profileData && <ProfileCard classes={classes} profileData={profileData} />}
    </>
  );
};

export default Profile;
