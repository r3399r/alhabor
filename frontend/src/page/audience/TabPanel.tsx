import { Box } from '@mui/material';

const TabPanel = ({ children, value, index, ...props }: any) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`full-width-tabpanel-${index}`}
    aria-labelledby={`full-width-tab-${index}`}
    {...props}
  >
    {value === index && <Box p={3}>{children}</Box>}
  </div>
);

export default TabPanel;
