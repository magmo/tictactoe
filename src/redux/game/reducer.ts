import { Reducer } from 'redux';

import * as actions from './actions';
import * as states from './state';
import * as results from '../../core/results';

import { positions, Player, isDraw, isWinningMarks, Position } from '../../core';
import { MessageState, sendMessage } from '../message-service/state';

import hexToBN from '../../utils/hexToBN';
import bnToHex from '../../utils/bnToHex';


export interface JointState {
  gameState: states.GameState;
  messageState: MessageState;
}

const emptyJointState: JointState = { messageState: {}, gameState: states.noName({ myAddress: '', libraryAddress: '' })};

export const gameReducer: Reducer<JointState> = (state = emptyJointState, action: actions.GameAction) => {
  state = singleActionReducer(state, action);
  return state;
}

function singleActionReducer(state: JointState, action: actions.GameAction) {
  const { messageState, gameState } = state;
  switch(gameState.name){
    case states.StateName.XsPickMove: 
      if (action.type == actions.XS_MOVE_CHOSEN) {
        return xsPickMoveReducer(gameState, messageState, action)
      } else return state;
    case states.StateName.OsPickMove: 
      if (action.type == actions.OS_MOVE_CHOSEN) {
        return osPickMoveReducer(gameState, messageState, action)
      } else return state;
    default:
      return state;
  }
};

function favorA(balances: [string, string], roundBuyIn): [string, string] {
  const aBal: string = bnToHex(hexToBN(balances[0]).add(hexToBN(roundBuyIn)));
  const bBal: string = bnToHex(hexToBN(balances[1]).sub(hexToBN(roundBuyIn)));
  return [aBal, bBal];
}

function favorB(balances: [string, string], roundBuyIn): [string, string] {
  const aBal: string = bnToHex(hexToBN(balances[0]).sub(hexToBN(roundBuyIn)));
  const bBal: string = bnToHex(hexToBN(balances[1]).add(hexToBN(roundBuyIn)));
  return [aBal, bBal];
}

function xsPickMoveReducer(gameState: states.XsPickMove, messageState: MessageState, action: actions.XsMoveChosen): JointState {
  const { player, balances, roundBuyIn, noughts, crosses, turnNum } = gameState;
  const new_crosses = crosses + action.crosses;
  let newBalances: [string, string] = balances;

  const opponentAddress = states.getOpponentAddress(gameState);
  let pos: Position = positions.draw({...gameState, crosses: new_crosses, balances: newBalances}); // default
  let newGameState: states.GameState = states.playAgain({...gameState, turnNum: turnNum + 1, crosses: new_crosses, result: results.Result.Tie});; //default
 
  // if draw
  if (isDraw(noughts, new_crosses)) {
    switch(player){
      case Player.PlayerA: {
        newBalances = favorA(balances,roundBuyIn);
        break;
      }
      case Player.PlayerB: {  
        newBalances = favorB(balances,roundBuyIn);
        break;
      }
    }
    newGameState = states.playAgain({...gameState, turnNum: turnNum + 1, crosses: new_crosses, result: results.Result.Tie});
    pos = positions.draw({...newGameState, crosses: new_crosses, balances: newBalances});
    messageState = sendMessage(pos, opponentAddress, messageState);
    return { gameState: newGameState, messageState };
  };

  // if not draw then full swing to current player, unless its the first turn in a round
  switch(player){
    case Player.PlayerA: {
      if (noughts != 0 && crosses != 0) {
        newBalances = favorA(favorA(balances,roundBuyIn),roundBuyIn); // usually enact a full swing to current player
      } else {
        newBalances = favorA(balances, roundBuyIn); // if first move of a round, simply assign roundBuyIn to current player.
      }
      break;
    }
    case Player.PlayerB: {
      if (noughts != 0 && crosses != 0) {
        newBalances = favorB(favorB(balances,roundBuyIn),roundBuyIn);
      } else {
        newBalances = favorB(balances,roundBuyIn);
      }
      break;
    }
  }

  // if inconclusive
  if (!isDraw(noughts, new_crosses) && !isWinningMarks(new_crosses)){
    newGameState = states.xsWaitForOpponentToPickMove({...gameState, turnNum: turnNum + 1, crosses: new_crosses});
    pos = positions.Xplaying({...newGameState, crosses: new_crosses, balances: newBalances});
  }

  // if winning move
  if (isWinningMarks(new_crosses)) {
    newGameState = states.playAgain({...gameState, turnNum: turnNum + 1, crosses: new_crosses, result: results.Result.YouWin});
    pos = positions.victory({...newGameState, crosses: new_crosses, balances: newBalances})
  };

  messageState = sendMessage(pos, opponentAddress, messageState);
  return { gameState: newGameState, messageState }; 

};

function osPickMoveReducer(gameState: states.OsPickMove, messageState: MessageState, action: actions.OsMoveChosen): JointState {
  const { player, balances, roundBuyIn, noughts, crosses, turnNum } = gameState;
  const new_noughts = noughts + action.noughts;
  let newBalances: [string, string] = balances;

  const opponentAddress = states.getOpponentAddress(gameState);
  let pos: Position = positions.draw({...gameState, noughts: new_noughts, balances: newBalances}); // default
  let newGameState: states.GameState = states.playAgain({...gameState, turnNum: turnNum + 1, noughts: new_noughts, result: results.Result.Tie});; //default
 
  // if draw
  if (isDraw(new_noughts, crosses)) {
    switch(player){
      case Player.PlayerA: {
        newBalances = favorA(balances,roundBuyIn);
        break;
      }
      case Player.PlayerB: {  
        newBalances = favorB(balances,roundBuyIn);
        break;
      }
    }
    newGameState = states.playAgain({...gameState, turnNum: turnNum + 1, noughts: new_noughts, result: results.Result.Tie});
    pos = positions.draw({...newGameState, noughts: new_noughts, balances: newBalances});
    messageState = sendMessage(pos, opponentAddress, messageState);
    return { gameState: newGameState, messageState };
  };

  // if not draw then full swing to current player, unless its the first turn in a round
  switch(player){
    case Player.PlayerA: {
      if (noughts != 0 && crosses != 0) {
        newBalances = favorA(favorA(balances,roundBuyIn),roundBuyIn); // usually enact a full swing to current player
        console.log('full swing!');
      } else {
        newBalances = favorA(balances, roundBuyIn); // if first move of a round, simply assign roundBuyIn to current player.
        console.log('single swing!');
      }
      break;
    }
    case Player.PlayerB: {
      if (noughts > 0 || crosses > 0) {
        newBalances = favorB(favorB(balances,roundBuyIn),roundBuyIn);
      } else {
        console.log('first move of the round')
        newBalances = favorB(balances,roundBuyIn);
      }
      break;
    }
  }

  // if inconclusive
  if (!isDraw(new_noughts, crosses) && !isWinningMarks(new_noughts)){
    newGameState = states.osWaitForOpponentToPickMove({...gameState, turnNum: turnNum + 1, noughts: new_noughts});
    pos = positions.Oplaying({...newGameState, noughts: new_noughts, balances: newBalances});
  }

  // if winning move
  if (isWinningMarks(new_noughts)) {
    newGameState = states.playAgain({...gameState, turnNum: turnNum + 1, noughts: new_noughts, result: results.Result.YouWin});
    pos = positions.victory({...newGameState, noughts: new_noughts, balances: newBalances})
  };

  messageState = sendMessage(pos, opponentAddress, messageState);
  return { gameState: newGameState, messageState }; 

};

// function osPickMoveReducer(gameState: states.OsPickMove, messageState: MessageState, action: actions.OsMoveChosen): JointState {
//   const { player, balances, roundBuyIn, noughts,  turnNum } = gameState;
//   const new_noughts = noughts + action.noughts;

//   let newBalances: [string, string] = balances;

//   switch(player){
//     case Player.PlayerA: {
//       newBalances = favorA(favorA(balances,roundBuyIn),roundBuyIn);
//       break;
//     }
//     case Player.PlayerB: {
//       newBalances = favorB(favorB(balances,roundBuyIn),roundBuyIn);
//       break;
//     }
//   }

//   const newGameState = states.osWaitForOpponentToPickMove({...gameState, turnNum: turnNum + 1, noughts: new_noughts});
//   const opponentAddress = states.getOpponentAddress(gameState);
//   const oplaying = positions.Oplaying({...newGameState, noughts: new_noughts, balances: newBalances})
//   messageState = sendMessage(oplaying, opponentAddress, messageState);
//   return { gameState: newGameState, messageState };
// };

