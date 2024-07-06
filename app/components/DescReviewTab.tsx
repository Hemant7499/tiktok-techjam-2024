'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import ProductDescription from './ProductDescription'
import ProductReview from './ProductReview'

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(params) {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
        <Tabs value={value} onChange={handleChange} indicatorColor='secondary'>
          <Tab label="Description" {...a11yProps(0)} style={{color: "rgb(210, 63, 87)"}} />
          <Tab label="Reviews" {...a11yProps(1)} style={{color: "rgb(210, 63, 87)"}} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value}  index={0}>
        <ProductDescription description={params?.description}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <ProductReview />
      </CustomTabPanel>
    </Box>
  );
}
