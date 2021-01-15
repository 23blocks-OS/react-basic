import { makeStyles } from '@material-ui/core';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCartContent, updateCartAsync } from '../../redux/order/order.actions';
import { selectOrderitems } from '../../redux/order/order.selectors';
import { selectUserId } from '../../redux/user/user.selectors';
import CartItem from './CartItem';
import CartSummary from './CartSummary';

export default function CartView() {
  const useStyles = makeStyles({
    contentContainer: {
      display: 'flex',
      justifyContent: 'center',
    },
    itemContainer: {
      width: '100%',
      marginLeft: '1rem',
    },
    summaryContainer: {
      width: '100%',
      marginRight: '1rem',
    },
  });
  const classes = useStyles();

  const cart = useSelector(selectOrderitems);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();

  const handleAddOne = (prod) => {
    dispatch(
      updateCartAsync(userId, prod, 1, {
        name: prod.categoryName,
        uniqueId: prod.categoryUniqueId,
      })
    );
  };

  const handleRemoveOne = (prod) => {
    dispatch(
      updateCartAsync(userId, prod, -1, {
        name: prod.categoryName,
        uniqueId: prod.categoryUniqueId,
      })
    );
  };
  const handleRemoveAll = (prod) => {
    const existingItem = cart.find((item) => item.sku === prod.sku);
    if (!existingItem) return;
    const qty = existingItem.quantity;
    dispatch(
      updateCartAsync(userId, prod, -qty, {
        name: prod.categoryName,
        uniqueId: prod.categoryUniqueId,
      })
    );
  };

  const handleCheckout = () => {
    console.log('checking out');
  };

  const handleDeleteCart = () => {
    dispatch(deleteCartContent(userId));
  };
  return (
    <>
      <h3 style={{ marginLeft: '15px' }}>Cart View</h3>
      <div className={classes.contentContainer}>
        <div className={classes.itemContainer}>
          {cart && cart.length ? (
            cart.map((item) => (
              <CartItem
                key={item.sku}
                product={item}
                addToCart={handleAddOne}
                removeFromCart={handleRemoveOne}
                removeAll={handleRemoveAll}
              />
            ))
          ) : (
            <p>Cart is empty!</p>
          )}
        </div>
        <div className={classes.summaryContainer}>
          {cart.length ? (
            <CartSummary
              cart={cart}
              checkout={handleCheckout}
              deleteCart={handleDeleteCart}
            />
          ) : null}
        </div>
      </div>
    </>
  );
}
