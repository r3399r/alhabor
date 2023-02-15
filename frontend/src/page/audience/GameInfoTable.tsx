import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const GameInfoTable = () => {
  const players = [
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
  ];

  return (
    <TableContainer component={Paper}>
      <Table className="GameReport" aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">玩家</TableCell>
            <TableCell align="center">警長</TableCell>
            <TableCell align="center">放逐</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {players.map((row: any) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id === 0 ? (
                  <div style={{ width: 30 }}>Infinity</div>
                ) : row.isDie ? (
                  <span aria-label="paw" style={{ fontSize: 30 }}>
                    🐾
                  </span>
                ) : (
                  <span aria-label="paw" style={{ fontSize: 30 }}>
                    {row.id}
                  </span>
                )}
                {row.isChief && row.id !== 0 && (
                  <span aria-label="paw" style={{ fontSize: 30 }}>
                    🌟
                  </span>
                )}
                {row.chiefVoteState &&
                  row.chiefVoteState.isCandidate === true &&
                  row.chiefVoteState.isDropout === false && (
                    <span aria-label="paw" style={{ fontSize: 30, marginLeft: 5 }}>
                      🗳️
                    </span>
                  )}
                {row.chiefVoteState &&
                  row.chiefVoteState.isCandidate === true &&
                  row.chiefVoteState.isDropout === true && (
                    <span aria-label="paw" style={{ fontSize: 30, marginLeft: 5 }}>
                      🚫
                    </span>
                  )}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="right">{row.chiefVote.toString()}</TableCell>
              <TableCell align="right">{row.vote.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default GameInfoTable;
