import { Container, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import EnabledTemplate from './EnabledTemplate';
import GameInfoTable from './GameInfoTable';
import TabPanel from './TabPanel';

const Audience = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <Container maxWidth={'sm'}>
      <Paper elevation={3}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="玩家" />
          <Tab label="模式" />
        </Tabs>
        <TabPanel value={value} index={0}>
          <GameInfoTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <EnabledTemplate />
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Audience;
