import React, { useEffect } from "react";
import {
  fade,
  withStyles,
  makeStyles,
  createMuiTheme,
} from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import PlayerTable from "./PlayerTable";
import DarkPlayerTable from "./DarkPlayerTable";
import { RoleTable } from "./RoleTable";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import SaveIcon from "@material-ui/icons/Save";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import Admin from "./Admin";
import Typography from "@material-ui/core/Typography";
import EnabedTemplateInfo from "./EnabledTemplateInfo";
import { useDebounce, useDebounceCallback } from "@react-hook/debounce";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import Radio from "@material-ui/core/Radio";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";
import Badge from "@material-ui/core/Badge";
import voteLogo from "./ballot-box-with-ballot.png";
import GroupAddIcon from "@material-ui/icons/GroupAdd";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Tooltip from "@material-ui/core/Tooltip";
import PersonAddDisabledIcon from "@material-ui/icons/PersonAddDisabled";
import ContactMailIcon from "@material-ui/icons/ContactMail";
import InfoIcon from '@material-ui/icons/Info';
import UndoIcon from "@material-ui/icons/Undo";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
const GET_ROLES = gql`
  {
    templates {
      isEnabled
      name
    }
    enabledTemplate {
      name
      description
      roles {
        name
        id
        number
      }
    }
    players {
      pass
      isTarget
      id
      name
      roleName
      vote
      chiefVote
      isEmpty
      isDie
      isVoteFinish
      isValidCandidate
      votedNumber
      isChief
      chiefVoteState {
        isDropout
        isCandidate
        type
      }
    }
    gameInfo(id: 0) {
      isVoteFinish
      chiefId
      isDark
      voteWeightedId
      hasVoteTarget
      hasChief
      isChiefCandidateConfirmed
      repeatTimes
      isEventBusy
      gameEnded
    }
  }
`;

const RESET_EVENT = gql`
  mutation ResetEvent {
    resetEvent
  }
`;

const UPDATE_PLAYER_NAME = gql`
  mutation UpdatePlayerName($id: Int!, $name: String!) {
    updatePlayerName(id: $id, name: $name)
  }
`;

const GENERATE_TEMPLATE_ROLE = gql`
  mutation GenerateTemplateRole($isCovertWolfToHuman: Boolean!) {
    generateTemplateRole(isCovertWolfToHuman: $isCovertWolfToHuman)
  }
`;

const GENERATE_TEMPLATE_PLAYER = gql`
  mutation GenerateTemplatePlayer {
    generateTemplatePlayer
  }
`;

const REMOVE_ALL_PLAYER = gql`
  mutation RemoveAllPlayer {
    removeAllPlayer
  }
`;
//enableTemplate(name:"777")

const VOTE_START = gql`
  mutation VoteStart($targets: [Int]) {
    voteStart(targets: $targets)
  }
`;

const VOTE_CHIEF_START = gql`
  mutation VoteChiefStart {
    voteChiefStart
  }
`;

const SET_GAME_ENDED = gql`
  mutation SetGameEnded {
    setGameEnded
  }
`;

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  table: {
    minWidth: 250,
  },
  title: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  repeatTimes: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
}

const parseData = (data) => {
  const playerGroup = {};

  data.players.forEach((p) => {
    const { roleName, name, id } = p;
    if (playerGroup[roleName]) {
      playerGroup[roleName].push({ name: name || "", id });
    } else {
      playerGroup[roleName] = [{ name: name || "", id }];
    }
  });

  const result = [];

  data.enabledTemplate.roles.forEach((r) => {
    const { name } = r;
    result.push({ ...r, players: playerGroup[name] });
  });

  return result;
};

function TemplateRoleTable(props) {
  return <RoleTable data={props.data} />;

  /*
  return (
    <RoleTable

      query={GET_ENABLED_TEMPLATE}
      variables={{}}
      parseData={(data) => {
        const playerGroup = {};

        data.players.forEach((p) => {
          const { roleName, name, id } = p;
          if (playerGroup[roleName]) {
            playerGroup[roleName].push({ name: name || "", id });
          } else {
            playerGroup[roleName] = [{ name: name || "", id }];
          }
        });

        console.log(playerGroup);

        const result = [];

        data.enabledTemplate.roles.forEach((r) => {
          console.log("r", r);

          const { name } = r;
          result.push({ ...r, players: playerGroup[name] });
        });

        console.log(result);

        return result;
      }}
      pollInterval={500}
    />
  );
  */
}

function VoteAction(props) {
  const [targetList, setTargetList] = React.useState([]);
  const [voteStart] = useMutation(
    props.hasChief || props.hasVoteTarget ? VOTE_START : VOTE_CHIEF_START,
    {
      onCompleted: () => {
        props.onClose();
      },
    }
  );
  //const [submitVote, { called }] = useMutation(SUBMIT_VOTE);

  const isLock = props.hasTarget || props.hasChief;

  return (
    <>
      <DialogContent>
        <DialogContentText id="alert-dialog-slide-description">
          {`${
            props.hasChief ? `請選擇放逐的目標` : `請選擇警長候選人`
          }, 目標必須多於一人, 投票人數也必須多於一人`}
        </DialogContentText>
        {props.players
          .filter((p) => p.isValidCandidate)
          .map((player) => (
            <div key={player.id}>
              <Radio
                checked={targetList.includes(player.id)}
                name="radio-button-demo"
                inputProps={{ "aria-label": "B" }}
                onClick={() => {
                  if (
                    !targetList.includes(player.id) &&
                    targetList.length + 1 !==
                      props.players.filter((p) => !p.isDie && p.id !== 0).length
                  ) {
                    setTargetList([...targetList, player.id]);
                  }
                }}
              />
              {` ${player.id} : ${player.name || ""}`}
            </div>
          ))}
        <Radio
          checked={targetList.length === 0}
          name="radio-button-demo"
          inputProps={{ "aria-label": "B" }}
          onClick={() => {
            if (!isLock) {
              setTargetList([]);
            }
          }}
        />
        {`所有人`}
      </DialogContent>
      <DialogActions>
        {(targetList.length === 0 || targetList.length > 1) && (
          <Button
            onClick={() => {
              voteStart({ variables: { targets: targetList } });
              //submitVote({variables:{id:props.id, target}})
            }}
            color="primary"
          >
            確認
          </Button>
        )}
      </DialogActions>
    </>
  );
}

function Game(props) {
  const { gameInfo } = props;
  const classes = useStyles();

  const [resetEvent] = useMutation(RESET_EVENT);

  const [generateRole] = useMutation(GENERATE_TEMPLATE_ROLE);
  const [generatePlayer] = useMutation(GENERATE_TEMPLATE_PLAYER);
  const [removeAllPlayer] = useMutation(REMOVE_ALL_PLAYER);
  const [voteStart] = useMutation(VOTE_START);
  const [endGame] = useMutation(SET_GAME_ENDED);
  //const [roleId, setRoleId] = React.useState(-1);
  //const [roleNumber, setRoleNumber] = React.useState(0);
  const [isOpen, setIsOpen] = React.useState(false);
  const [gameEndedIsOpen, setGameEndedIsOpen] = React.useState(false);
  const [value, setValue] = useDebounce(props.name, 500);
  const [name, setName] = React.useState(props.name || "");
  const [updatePlayerName, { called }] = useMutation(UPDATE_PLAYER_NAME);
  const [state, setState] = React.useState({
    isCovertWolfToHuman: false,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  React.useEffect(() => {
    if (value && (value !== props.name || called)) {
      updatePlayerName({
        variables: { id: 0, name: value },
      });
    }
  }, [value]);
  /*
  const handleRoleChange = (event, newValue) => {
    setRoleId(newValue.id);
  };
  */

  const hasChief = props.chiefId !== -1;

  if (props.isPlayerMode) {
    if (props.isDark) {
      return (
        <DarkPlayerTable
          data={props.players}
          chiefId={props.chiefId}
          voteWeightedId={props.voteWeightedId}
        />
      );
    }

    return (
      <>
        <Dialog
          aria-labelledby="simple-dialog-title"
          open={isOpen}
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <DialogTitle id="form-dialog-title">
            {hasChief ? `放逐開始` : `競選警長`}
          </DialogTitle>
          <VoteAction
            players={props.players}
            onClose={() => {
              setIsOpen(false);
            }}
            hasChief={hasChief}
            hasVoteTarget={props.hasVoteTarget}
          />
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
          {(
            <Button
              onClick={() => {
                endGame();
                setGameEndedIsOpen(false);
              }}
              color="primary"
            >
              確認
            </Button>
          )}
          {(
            <Button
              onClick={() => {
                setGameEndedIsOpen(false);
              }}
              color="secondary"
            >
              取消
            </Button>
          )}
      </DialogActions>
          </DialogTitle>
        </Dialog>
        <Box display="flex">
          <Tooltip title="產生角色" placement="top">
            <IconButton
              aria-label="delete"
              onClick={() => {
                generateRole({
                  variables: { isCovertWolfToHuman: state.isCovertWolfToHuman },
                });
              }}
            >
              <PeopleAltIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          <Tooltip title="刪除玩家" placement="top">
            <IconButton
              aria-label="delete"
              onClick={() => {
                removeAllPlayer();
              }}
            >
              <PersonAddDisabledIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          {hasChief ? (
            <Tooltip title="放逐投票" placement="top">
              <IconButton aria-label="delete" onClick={() => {
                  //voteStart();
                  setIsOpen(true);
                }}>
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
                  badgeContent={
                    gameInfo.repeatTimes + 1 === 1
                      ? 0
                      : gameInfo.repeatTimes + 1
                  }
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
              onClick={() => {
                resetEvent();
              }}
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
                resetEvent();
              }}
            >
              <InfoIcon fontSize="large" />
            </IconButton>
          </Tooltip>
          {/*<Button
            variant="outlined"
            color="primary"
            onClick={() => {
              generateRole({
                variables: { isCovertWolfToHuman: state.isCovertWolfToHuman },
              });
            }}
          >
            <div style={{ fontWeight: 800 }}>產生角色</div>
          </Button>*/}

          {/*<Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              removeAllPlayer();
            }}
          >
            <div style={{ fontWeight: 800 }}>刪除玩家</div>
          </Button>*/}

          {/*<Button
            variant="contained"
            color="secondary"
            onClick={() => {
              //voteStart();
              setIsOpen(true);
            }}
            disabled={gameInfo.isChiefCandidateConfirmed === false}
            endIcon={
              <Badge
                badgeContent={
                  gameInfo.repeatTimes + 1 === 1 ? 0 : gameInfo.repeatTimes + 1
                }
                color="primary"
              >
                <Avatar className={classes.repeatTimes}>
                  <img src={voteLogo} style={{ height: 20, width: 20 }} />
                </Avatar>
              </Badge>
            }
          >
            {hasChief ? `放逐` : `警長`}
          </Button>*/}

          {/*<Button
            variant="contained"
            color="secondary"
            disabled={gameInfo.repeatTimes === 0 && !gameInfo.isEventBusy}
            onClick={() => {
              resetEvent();
            }}
          >
            重置選舉
          </Button>*/}
        </Box>
        <Box display="flex">
          <FormControlLabel
            control={
              <Checkbox
                checked={state.isCovertWolfToHuman}
                onChange={handleChange}
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
            onChange={(e) => {
              setValue(e.target.value);
              setName(e.target.value);
            }}
          />
        </Box>
        <PlayerTable
          data={props.players}
          chiefId={props.chiefId}
          voteWeightedId={props.voteWeightedId}
        />
      </>
    );
  }

  return (
    <div style={{}}>
      <Box display="flex">

      <Tooltip title="加入玩家" placement="top">
              <IconButton aria-label="delete" onClick={() => {
                  //voteStart();
                  generatePlayer();
                }}>
                <PersonAddIcon fontSize="large" />
              </IconButton>
            </Tooltip>


        {/*<Button
          variant="contained"
          color="primary"
          onClick={() => {
            generatePlayer();
          }}
        >
          加入玩家
        </Button>*/}
      </Box>

      <EnabedTemplateInfo data={props.data} />
    </div>
  );
}

export default function God(props) {
  const history = useHistory();
  const [value, setValue] = React.useState(0);
  const [getRole, { loading, data, error, called }] = useLazyQuery(GET_ROLES, {
    fetchPolicy: "network-only",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  let isMounted = true;
  useEffect(() => {
    if (isMounted) {
      getRole();
    }

    const interval = setInterval(() => {
      if (isMounted) {
        getRole();
      }
    }, 500);

    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, []);

  React.useEffect(() => {
    if (error && !loading) {
      error.graphQLErrors.forEach((e) => {
        const { extensions } = e;
        if (extensions.code === "UNAUTHENTICATED") {
          console.log("no access!!!");
          history.push("/");
        }
      });

      console.log("set dark");

      if (data && data.gameInfo.isDark) {
        props.setDarkMode(true);
      }
    }
  }, [error, loading, data]);

  React.useEffect(() => {
    if (data) {
      props.setDarkMode(data.gameInfo.isDark);
    }
  }, [data]);

  if (!called || !data) {
    return <div>Loading</div>;
  }

  const { id, pass, name } = props;

  const isPlayerMode = data.players.length > 1 ? true : false;
  console.log(data);
  return (
    <Container maxWidth={isPlayerMode && value === 0 ? "lg" : "sm"}>
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
          <Tab label={isPlayerMode ? "黑夜視野" : "模式選擇"} />
          {isPlayerMode && <Tab label="模式" />}
        </Tabs>
        <TabPanel value={value} index={0}>
          <Game
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
          {isPlayerMode ? (
            <TemplateRoleTable data={parseData(data)} />
          ) : (
            <Admin data={parseData(data)} tData={data} />
          )}
        </TabPanel>

        {isPlayerMode && (
          <TabPanel value={value} index={2}>
            <EnabedTemplateInfo data={data} />
          </TabPanel>
        )}
      </Paper>
    </Container>
  );
}
