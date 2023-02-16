import { Container, Paper, Tab, Tabs } from '@mui/material';
import { useState } from 'react';
import EnabledTemplate from 'src/page/audience/EnabledTemplate';
import RoleTable from 'src/page/audience/RoleTable';
import TabPanel from 'src/page/audience/TabPanel';
import GameBoard from './GameBoard';

const parseData = (data: any) => {
  const playerGroup: any = {};

  data.players.forEach((p: any) => {
    const { roleName, name, id } = p;
    if (playerGroup[roleName]) playerGroup[roleName].push({ name: name || '', id });
    else playerGroup[roleName] = [{ name: name || '', id }];
  });

  const result: any = [];

  data.enabledTemplate.roles.forEach((r: any) => {
    const { name } = r;
    result.push({ ...r, players: playerGroup[name] });
  });

  return result;
};

const God = (props: any) => {
  const data = {
    templates: [
      {
        isEnabled: false,
        name: '10人預女獵',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '12人夢魘魔術師',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '12人守墓局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '12人守衛惡魔局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '12人陰陽師',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '13人狼王攝夢人混血兒',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '13人通靈師機械狼混',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '13人陰陽師混血兒',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '13人預女獵白混',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '9人預女獵',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '九尾妖狐 （狐狸代替）',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '偵探怪盜',
        __typename: 'Template',
      },
      {
        isEnabled: true,
        name: '十二人守衛狼王局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '十二人通靈師機械狼局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '十二人魔術師狼王局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '夢魘局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '天狼守衛',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '孫悟空三打白骨精',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '帝尊魔皇九天聖人',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '惡靈騎士局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '攝夢人夢魘局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '永序之輪',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '混沌之魔',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '烏鴉隱狼局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '熊隱狼',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '狐狸守衛',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '狼兄弟守衛',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '狼王 攝夢人',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '狼美人騎士',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '狼美 老流氓 預女獵白',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '盜賊測試',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '盜賊魅魔',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '種狼隱狼',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '純白之女狼巫',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '老流氓局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '血月獵魔人',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '雙邊白痴局',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '預女獵白',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '預女獵白混',
        __typename: 'Template',
      },
      {
        isEnabled: false,
        name: '黑市商人 (守衛是黑市)',
        __typename: 'Template',
      },
    ],
    enabledTemplate: {
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
    },
    players: [
      {
        pass: 'midautumn',
        isTarget: null,
        id: 0,
        name: 'god',
        roleName: 'God 😇',
        vote: [],
        chiefVote: [],
        isEmpty: null,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: false,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: false,
          isCandidate: null,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: 'hiro',
        isTarget: null,
        id: 1,
        name: 'Hiroshi',
        roleName: '狼王 🐺👑',
        vote: [],
        chiefVote: ['T'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: true,
        chiefVoteState: {
          isDropout: false,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '123',
        isTarget: null,
        id: 2,
        name: '安仔',
        roleName: '獵人 🏹',
        vote: [],
        chiefVote: ['DO'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: true,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '1',
        isTarget: null,
        id: 3,
        name: 'Kellie',
        roleName: '守衛 🛡',
        vote: [],
        chiefVote: ['1'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: false,
          isCandidate: false,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '',
        isTarget: null,
        id: 4,
        name: '👍',
        roleName: '村民 👨‍🌾',
        vote: [],
        chiefVote: ['T'],
        isEmpty: false,
        isDie: true,
        isVoteFinish: true,
        isValidCandidate: false,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: false,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: 'qwer',
        isTarget: null,
        id: 5,
        name: 'Luis',
        roleName: '女巫 🧪⚗️',
        vote: [],
        chiefVote: ['DO'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: true,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: 'cookie',
        isTarget: null,
        id: 6,
        name: 'Li-Hsin',
        roleName: '村民 👨‍🌾',
        vote: [],
        chiefVote: ['DO'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: true,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '00070',
        isTarget: null,
        id: 7,
        name: '007',
        roleName: '狼人 🐺',
        vote: [],
        chiefVote: ['DO'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: true,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '',
        isTarget: null,
        id: 8,
        name: '0800',
        roleName: '村民 👨‍🌾',
        vote: [],
        chiefVote: ['DO'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: true,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '111',
        isTarget: null,
        id: 9,
        name: 'Nini',
        roleName: '村民 👨‍🌾',
        vote: [],
        chiefVote: ['DO'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: true,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '123456',
        isTarget: null,
        id: 10,
        name: '1010',
        roleName: '狼人 🐺',
        vote: [],
        chiefVote: ['1'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: false,
          isCandidate: false,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: 'winwin2022',
        isTarget: null,
        id: 11,
        name: 'David',
        roleName: '預言家 🔮',
        vote: [],
        chiefVote: ['T'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: false,
          isCandidate: true,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
      {
        pass: '123',
        isTarget: null,
        id: 12,
        name: '榮茵',
        roleName: '狼人 🐺',
        vote: [],
        chiefVote: ['1'],
        isEmpty: false,
        isDie: false,
        isVoteFinish: true,
        isValidCandidate: true,
        votedNumber: null,
        isChief: false,
        chiefVoteState: {
          isDropout: false,
          isCandidate: false,
          type: null,
          __typename: 'ChiefVoteState',
        },
        __typename: 'Player',
      },
    ],
    gameInfo: {
      isVoteFinish: true,
      chiefId: 1,
      isDark: false,
      voteWeightedId: -1,
      hasVoteTarget: false,
      hasChief: false,
      isChiefCandidateConfirmed: true,
      repeatTimes: 0,
      isEventBusy: false,
      __typename: 'GameInfo',
    },
  };
  const [value, setValue] = useState(0);
  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };
  const { id, pass, name } = props;
  const isPlayerMode = data.players.length > 1 ? true : false;

  return (
    <Container maxWidth={isPlayerMode && value === 0 ? 'lg' : 'sm'}>
      <Paper elevation={3}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          variant="fullWidth"
        >
          <Tab label="遊戲" />
          <Tab label={isPlayerMode ? '黑夜視野' : '模式選擇'} />
          {isPlayerMode && <Tab label="模式" />}
        </Tabs>
        <TabPanel value={value} index={0}>
          <GameBoard
            isPlayerMode={isPlayerMode}
            id={id}
            pass={pass}
            name={name}
            players={data.players}
            chiefId={data.gameInfo.chiefId}
            isDark={data.gameInfo.isDark}
            voteWeightedId={data.gameInfo.voteWeightedId}
            gameInfo={data.gameInfo}
            data={data}
          />
        </TabPanel>
        <TabPanel value={value} index={1}>
          {/* {isPlayerMode ? ( */}
          <RoleTable data={parseData(data)} />
          {/* ) : (
                <Admin data={parseData(data)} tData={data} />
              )} */}
        </TabPanel>

        {isPlayerMode && (
          <TabPanel value={value} index={2}>
            <EnabledTemplate />
          </TabPanel>
        )}
      </Paper>
    </Container>
  );
};

export default God;
