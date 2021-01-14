/* MEMOIZATION */
import { createSelector } from 'reselect';

const user = (state) => state.user;

export const selectIsUserLoaded = createSelector([user], (user) => user.isLoaded);

export const selectIsUserAuth = createSelector(
  [user],
  (user) => user.isAuthenticated
);

export const selectCurrentAuthUser = createSelector([user], (user) => user.user);

export const selectUserProfile = createSelector([user], (user) => user.userProfile);

export const selectUserId = createSelector([selectCurrentAuthUser], (user) =>
  user ? user.uniqueId : null
);
