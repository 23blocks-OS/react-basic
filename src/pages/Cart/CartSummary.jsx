import {
  Button,
  Card,
  CardActions,
  CardContent,
  makeStyles,
  Typography,
} from '@material-ui/core';
import React from 'react';

export default function CartSummary({ cart, checkout, deleteCart }) {
  const subtotal = cart.reduce((acc, item) => acc + Number(item.subtotal), 0);
  const tax = cart.reduce((acc, item) => acc + Number(item.tax), 0);
  const total = subtotal + tax;

  const useStyles = makeStyles({
    root: {
      marginLeft: '1rem',
      minWidth: 275,
      maxWidth: '40vw',
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)',
    },
    title: {
      fontSize: 14,
    },
    name: {
      marginTop: '16px',
    },
    content: {
      paddingLeft: '16px',
      paddingRight: '16px',
    },
    cardActions: {
      justifyContent: 'center',
    },
    pos: {
      marginBottom: 0,
    },
  });
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.content}>
          <Typography variant="h5" component="h2" className={classes.name}>
            Cart Summary
          </Typography>
          <Typography variant="body2" component="p">
            <b>Subtotal:</b> ${subtotal.toFixed(2)}
            <br />
            <b>Tax:</b> ${tax.toFixed(2)}
            <br />
            <b>Total:</b> ${total.toFixed(2)}
          </Typography>
        </div>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button size="small" variant="contained" color="primary" onClick={checkout}>
          Checkout
        </Button>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={deleteCart}
        >
          Delete Cart
        </Button>
      </CardActions>
    </Card>
  );
}
