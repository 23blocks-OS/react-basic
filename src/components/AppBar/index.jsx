import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectOrderItemsCount } from '../../redux/order/order.selectors';
import { selectIsUserAuth } from '../../redux/user/user.selectors';
import { userLogout } from '../../redux/user/user.actions';

export default function NavBar() {
  const cartItemsCount = useSelector(selectOrderItemsCount);
  const isAuth = useSelector(selectIsUserAuth);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (history) => {
    console.log('logout');
    dispatch(userLogout(history));
  };

  return (
    <AppBar position="static">
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Toolbar>
          {!isAuth && (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
          {isAuth && (
            <>
              <Button color="inherit" onClick={() => handleLogout(history)}>
                Logout
              </Button>

              <Button color="inherit" component={Link} to="/profile">
                Profile
              </Button>

              <Button color="inherit" component={Link} to="/countries">
                Counties
              </Button>
              <Button color="inherit" component={Link} to="/products">
                Products
              </Button>
            </>
          )}
        </Toolbar>
        <Toolbar>
          {isAuth && (
            <Button color="inherit" component={Link} to="/cart">
              Go to Cart{cartItemsCount > 0 ? '(' + cartItemsCount + ')' : null}
            </Button>
          )}
        </Toolbar>
      </div>
    </AppBar>
  );
}
