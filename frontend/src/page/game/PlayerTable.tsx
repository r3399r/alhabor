import { Paper, Table, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

export default function PlayerTable(props: any) {
  // const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>警長</TableCell>
            <TableCell>死亡</TableCell>
            <TableCell>放逐加權</TableCell>
            <TableCell>ID</TableCell>

            <TableCell align="left">玩家</TableCell>
            <TableCell align="right">角色</TableCell>
            <TableCell align="right">投票</TableCell>
            <TableCell align="center">帥警長</TableCell>
            <TableCell align="center">放逐</TableCell>
            <TableCell align="right">上線</TableCell>
          </TableRow>
        </TableHead>
        {/* <TableBody>
            {props.data.map((row) => (
              <CollapseSell {...props} row={row} key={row.id} />
            ))}
          </TableBody> */}
      </Table>
    </TableContainer>
  );
}
