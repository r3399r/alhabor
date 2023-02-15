import { TextField, Typography } from '@mui/material';
import RoleTable from './RoleTable';

const EnabledTemplate = () => {
  const enabledTemplate = {
    name: '十二人守衛狼王局',
    description:
      '女巫不自救 守衛不連守 同守同救失效\n狼人可連刀 狼王不自爆\n狼王獵人自行選擇是否開槍\n',
    roles: [
      {
        name: '守衛 🛡',
        id: 6,
        number: 1,
        __typename: 'Role',
      },
      {
        name: '狼人 🐺',
        id: 1,
        number: 3,
        __typename: 'Role',
      },
      {
        name: '女巫 🧪⚗️',
        id: 5,
        number: 1,
        __typename: 'Role',
      },
      {
        name: '預言家 🔮',
        id: 7,
        number: 1,
        __typename: 'Role',
      },
      {
        name: '獵人 🏹',
        id: 3,
        number: 1,
        __typename: 'Role',
      },
      {
        name: '狼王 🐺👑',
        id: 4,
        number: 1,
        __typename: 'Role',
      },
      {
        name: '村民 👨‍🌾',
        id: 2,
        number: 4,
        __typename: 'Role',
      },
    ],
    __typename: 'Template',
  };

  return (
    <div>
      <Typography variant="h2" gutterBottom>
        {enabledTemplate.name}
      </Typography>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={6}
        fullWidth
        value={enabledTemplate.description || ''}
        variant="outlined"
        label="規則"
        disabled
      />
      <RoleTable data={enabledTemplate.roles} />
    </div>
  );
};

export default EnabledTemplate;
