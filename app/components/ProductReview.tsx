import React from 'react';
import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';

const reviews = [
  { name: 'Jannie Schumm', rating: 4.7, time: '3 years ago', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.' },
  { name: 'Joe Kenan', rating: 4.7, time: '5 years ago', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.' },
  { name: 'Jenifer Tulio', rating: 4.7, time: '3 years ago', review: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius massa id ut mattis. Facilisis vitae gravida egestas ac account.' },
];

const ProductReviews = () => {
  return (
    <Card>
      <CardContent>
        <List>
          {reviews.map((review, index) => (
            <ListItem key={index} alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={review.name} />
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1" component="div">
                    {review.name}
                  </Typography>
                }
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.primary">
                      {`Rating: ${review.rating} • ${review.time}`}
                    </Typography>
                    <Typography component="p" variant="body2" color="text.secondary">
                      {review.review}
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ProductReviews;
