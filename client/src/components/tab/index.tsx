import * as React from 'react';
import { Box, Tab } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import './style.css';
import { PropsTabList } from '../../interfaces';

function Tabs({ tablist }: PropsTabList) {
  const [value, setValue] = React.useState(tablist[0].label);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (

    <div className="table">
      <Box>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: '#eee' }}>
            <TabList onChange={handleChange}>
              {tablist.map(({ label }) => (
                <Tab label={label} value={label} key={label} />
              ))}
            </TabList>
          </Box>
          {tablist.map(({ label, child }) => (
            <TabPanel value={label} key={label}>
              {child}
            </TabPanel>
          ))}
        </TabContext>
      </Box>
    </div>

  );
}

export default Tabs;
