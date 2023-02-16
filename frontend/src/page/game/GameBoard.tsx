import ContactMailIcon from '@mui/icons-material/ContactMail';
import HowToVoteIcon from '@mui/icons-material/HowToVote';
import InfoIcon from '@mui/icons-material/Info';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import UndoIcon from '@mui/icons-material/Undo';
import {
  Badge,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControlLabel,
  IconButton,
  TextField,
  Tooltip,
} from '@mui/material';
import { useState } from 'react';
import PlayerTable from './PlayerTable';

const GameBoard = (props: any) => {
  const { gameInfo } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [gameEndedIsOpen, setGameEndedIsOpen] = useState(false);

  // if (props.isDark) {
  //     return (
  //         <DarkPlayerTable
  //             data={props.players}
  //             chiefId={props.chiefId}
  //             voteWeightedId={props.voteWeightedId}
  //         />
  //     );
  // }
  const hasChief = props.chiefId !== -1;

  return (
    <>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      >
        <DialogTitle id="form-dialog-title">{hasChief ? `放逐開始` : `競選警長`}</DialogTitle>
        {/* <VoteAction
                    players={props.players}
                    onClose={() => {
                        setIsOpen(false);
                    }}
                    hasChief={hasChief}
                    hasVoteTarget={props.hasVoteTarget}
                /> */}
      </Dialog>
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={gameEndedIsOpen}
        onClose={() => {
          setGameEndedIsOpen(false);
        }}
      >
        <DialogTitle id="form-dialog-title">
          {`確認結束遊戲 並公布此局資訊？`}
          <DialogActions>
            {
              <Button
                onClick={() => {
                  // endGame();
                  setGameEndedIsOpen(false);
                }}
                color="primary"
              >
                確認
              </Button>
            }
            {
              <Button
                onClick={() => {
                  setGameEndedIsOpen(false);
                }}
                color="secondary"
              >
                取消
              </Button>
            }
          </DialogActions>
        </DialogTitle>
      </Dialog>
      <Box display="flex">
        <Tooltip title="產生角色" placement="top">
          <IconButton
            aria-label="delete"
            // onClick={() => {
            //     generateRole({
            //         variables: { isCovertWolfToHuman: state.isCovertWolfToHuman },
            //     });
            // }}
          >
            <PeopleAltIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        <Tooltip title="刪除玩家" placement="top">
          <IconButton
            aria-label="delete"
            // onClick={() => {
            //     removeAllPlayer();
            // }}
          >
            <PersonAddDisabledIcon fontSize="large" />
          </IconButton>
        </Tooltip>
        {hasChief ? (
          <Tooltip title="放逐投票" placement="top">
            <IconButton
              aria-label="delete"
              onClick={() => {
                //voteStart();
                setIsOpen(true);
              }}
            >
              <HowToVoteIcon fontSize="large" />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="警長選舉" placement="top">
            <IconButton
              aria-label="delete"
              onClick={() => {
                //voteStart();
                setIsOpen(true);
              }}
            >
              <Badge
                badgeContent={gameInfo.repeatTimes + 1 === 1 ? 0 : gameInfo.repeatTimes + 1}
                color="primary"
              >
                <ContactMailIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Tooltip>
        )}

        <Tooltip title="重置選舉" placement="top">
          <IconButton
            disabled={gameInfo.repeatTimes === 0 && !gameInfo.isEventBusy}
            aria-label="delete"
            // onClick={() => {
            //     resetEvent();
            // }}
          >
            <UndoIcon fontSize="large" />
          </IconButton>
        </Tooltip>

        <Tooltip title="覆盤公布資訊" placement="top">
          <IconButton
            disabled={gameInfo.gameEnded}
            aria-label="delete"
            onClick={() => {
              setGameEndedIsOpen(true);
              // resetEvent();
            }}
          >
            <InfoIcon fontSize="large" />
          </IconButton>
        </Tooltip>
      </Box>
      <Box display="flex">
        <FormControlLabel
          control={
            <Checkbox
              // checked={state.isCovertWolfToHuman}
              // onChange={handleChange}
              name="isCovertWolfToHuman"
            />
          }
          label="轉化狼人變成人類"
        />
      </Box>
      <Box display="flex">
        <TextField
          autoComplete="off"
          color="secondary"
          id="standard-basic"
          label="姓名"
          variant="outlined"
          margin="dense"
          value={name}
          // onChange={(e) => {
          //     setValue(e.target.value);
          //     setName(e.target.value);
          // }}
        />
      </Box>
      <PlayerTable
        data={props.players}
        chiefId={props.chiefId}
        voteWeightedId={props.voteWeightedId}
      />
    </>
  );
};

export default GameBoard;
