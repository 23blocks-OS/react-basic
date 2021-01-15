import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: '40vw',
    marginBottom: '0.5rem',
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

export default function CartItem({
  product,
  isLoading,
  removeAll,
  removeFromCart,
  addToCart,
}) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        {!isLoading ? (
          <>
            <div className={classes.content}>
              <Typography variant="h5" component="h2" className={classes.name}>
                {product.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Category:</b> {product.categoryName}
                <br />
                <b>Qty:</b> {product.quantity}
                <br />
                <b>Price:</b> ${product.subtotal}
                <br />
                <b>Tax:</b> ${product.tax}
                <br />
                <b>Subtotal:</b> ${product.subtotal}
                <br />
                <b>Subtotal Tax:</b> ${product.subtotalTax}
                <br />
                <b>Sku:</b> {product.sku}
              </Typography>
            </div>
          </>
        ) : (
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Loading details...
          </Typography>
        )}
      </CardContent>

      {!isLoading && (
        <CardActions className={classes.cardActions}>
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={() => addToCart(product)}
          >
            +
          </Button>
          <Button
            size="medium"
            variant="contained"
            color="secondary"
            onClick={() => removeFromCart(product)}
          >
            -
          </Button>
          <Button
            size="small"
            variant="contained"
            color="primary"
            onClick={() => removeAll(product)}
          >
            Remove All
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
