"use client"
import React from 'react';
import {Stack, Grid, Card, CardContent, Typography, CardMedia, Box, Button, Tabs, Tab, Rating } from '@mui/material';
import { useEffect } from 'react';
import DescReviewTab from "@/app/components/DescReviewTab"
import MainLayout from '@/app/layouts/MainLayout'
import {ProductPageTypes} from '@/app/types'
import { useProductStore } from '@/app/stores/product';
import useCreateBucketUrl from "@/app/hooks/useCreateBucketUrl"

const ProductCard = ({ params }: ProductPageTypes) => {

  let { productById, setProductById } = useProductStore()
  useEffect(() => {
    setProductById(params?.productId)
  }, [])
  
  if (!productById) {
    return null;
  }
  
  return (
    <>
    <MainLayout>
    <Stack>
    <Box display="flex" justifyContent="center" alignItems="center">
      <Card sx={{ maxWidth: 600 }}>
        <CardMedia
          component="img"
          height="300"
          image={useCreateBucketUrl(productById?.image)}// Replace with your image source
          alt={productById?.image}
          sx={{ objectFit: 'contain' }}
        />
        <CardContent>
            <Typography variant="h5" component="h2">
                {productById?.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
                Brand: {productById?.brand}
            </Typography>
            <Rating name="read-only" value={productById?.rating || 0} readOnly />
            <Typography variant="h6" style={{color: "rgb(210, 63, 87)"}}>
              {productById?.price}
            </Typography>
            <Button variant="contained" style={{backgroundColor: "rgb(210, 63, 87)"}}>Add to Cart</Button>
        </CardContent>
    </Card>
    </Box>
    <Box>
        <DescReviewTab description={productById?.description}/>
    </Box>
    </Stack>
    </MainLayout>
    </>
  );
};

export default ProductCard;
