import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { Fragment } from 'react';

const processData = (data: any) => {
  let total = 0;

  const result: any = [];

  data.forEach((d: any) => {
    const { number } = d;
    if (number) {
      total += number;
      result.push(d);
    }
  });

  return { total, data: result };
};

const RoleTable = (props: any) => {
  // const classes = useStyles();

  const { total, data } = processData(props.data);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table" size="small">
        <TableHead>
          <TableRow>
            <TableCell>角色</TableCell>

            <TableCell align="right">人數</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row: any) => (
            <Fragment key={row.name}>
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.number}</TableCell>
              </TableRow>
              {row.players ? (
                <TableRow component="th" align="left">
                  {row.players.map((v: any, idx: any) => (
                    <div
                      style={{ fontSize: 22, marginLeft: 45 }}
                      key={idx}
                    >{`${v.id} : ${v.name}`}</div>
                  ))}
                </TableRow>
              ) : null}
            </Fragment>
          ))}
          <TableRow>
            <TableCell align="right">總人數</TableCell>
            <TableCell align="right">{total}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RoleTable;
