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

export default function ProductDetails({ product, isLoading, handleSelected }) {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        {!isLoading ? (
          <>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              Product Details
            </Typography>
            <div className={classes.content}>
              <Typography variant="h5" component="h2" className={classes.name}>
                {product.name}
              </Typography>
              <Typography className={classes.pos} color="textSecondary">
                {product.description}
              </Typography>
              <Typography variant="body2" component="p">
                <b>Price:</b> ${product.price}
                <br />
                <b>Discount:</b> ${product.discount}
                <br />
                <b>Tax:</b> ${product.tax}
                <br />
                <b>Sku:</b> {product.sku}
                <br />
                <b>Status:</b> {product.status}
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
            size="small"
            variant="contained"
            color="primary"
            onClick={() => handleSelected(product)}
          >
            Get suggestions
          </Button>
        </CardActions>
      )}
    </Card>
  );
}
