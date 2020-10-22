import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const useStyles = makeStyles((theme) => ({
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
  pos: {
    marginBottom: 0,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Products({ products, handleSelected, isLoading }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        {!isLoading ? (
          <>
            <Typography className={classes.title} color="textSecondary" gutterBottom>
              {products.length ? 'Products' : 'No Products in this category'}
            </Typography>
            <div className={classes.demo}>
              <List dense={false}>
                {products.map((elem) => (
                  <ListItem
                    key={elem.uniqueId}
                    style={{ width: '300px', cursor: 'pointer' }}
                    onClick={() => handleSelected(elem)}
                  >
                    <ListItemText primary={elem.name} secondary={elem.description} />
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        ) : (
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            Loading products...
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
