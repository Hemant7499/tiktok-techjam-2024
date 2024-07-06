import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ProductDescription = (params : any) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" component="div">
          Specification:
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {params?.description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductDescription;
