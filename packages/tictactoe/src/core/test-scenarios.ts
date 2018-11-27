import BN from "bn.js";
// import { Move } from './moves'; 
// import { Result } from './results';
import * as positions from './positions';
// import { randomHex } from "../utils/randomHex";
import bnToHex from "../utils/bnToHex";

const libraryAddress = '0x' + '1'.repeat(40);
const channelNonce = 4;
const asAddress = '0x' + 'a'.repeat(40);
const bsAddress = '0x' + 'b'.repeat(40);
const participants: [string, string] = [asAddress, bsAddress];
const roundBuyIn = bnToHex(new BN(1));
const fiveFive = [new BN(5), new BN(5)].map(bnToHex) as [string, string];
const sixFour = [new BN(6), new BN(4)].map(bnToHex) as [string, string];
const fourSix = [new BN(4), new BN(6)].map(bnToHex) as [string, string];

const base = {
  libraryAddress,
  channelNonce,
  participants,
  roundBuyIn,
};

const shared = {
  ...base,
  asAddress,
  twitterHandle: "twtr",
  bsAddress,
  myName: 'Tom',
  opponentName: 'Alex',
};

// TODO crosses should go first. we get injected directly to playing state from postFundSetup. final playing state is actually a draw position type. 
export const standard = {
  ...shared,
  preFundSetupA: positions.preFundSetupA({ ...base, turnNum: 0, balances: fiveFive, stateCount: 0 }),
  preFundSetupB: positions.preFundSetupB({ ...base, turnNum: 1, balances: fiveFive, stateCount: 1 }),
  postFundSetupA: positions.postFundSetupA({ ...base, turnNum: 2, balances: fiveFive, stateCount: 0 }),
  postFundSetupB: positions.postFundSetupB({ ...base, turnNum: 3, balances: fiveFive, stateCount: 1 }),
  propose:  positions.propose({ ...base, turnNum: 4, balances: fiveFive}),
  accept:   positions.accept({ ...base, turnNum:  5, balances: fiveFive}),
  playing1: positions.playing({...base, turnNum:  6, noughts:0b000000000, crosses:0b100000000, balances:fourSix}),
  playing2: positions.playing({...base, turnNum:  7, noughts:0b000010000, crosses:0b100000000, balances:sixFour}),
  playing3: positions.playing({...base, turnNum:  8, noughts:0b000010000, crosses:0b100000001, balances:fourSix}),
  playing4: positions.playing({...base, turnNum:  9, noughts:0b000011000, crosses:0b100000001, balances:sixFour}),
  playing5: positions.playing({...base, turnNum: 10, noughts:0b000011000, crosses:0b100100001, balances:fourSix}),
  playing6: positions.playing({...base, turnNum: 11, noughts:0b000011100, crosses:0b100100001, balances:sixFour}),
  playing7: positions.playing({...base, turnNum: 12, noughts:0b000011100, crosses:0b101100001, balances:fourSix}),
  playing8: positions.playing({...base, turnNum: 13, noughts:0b010011100, crosses:0b101100001, balances:sixFour}),
  draw:     positions.draw({...base, turnNum: 14, noughts:0b010011100, crosses:0b101100011, balances:fiveFive}),
  resting:  positions.resting({ ...base, turnNum: 15, balances: fiveFive}),

  preFundSetupAHex:  '0x000000000000000000000000111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
  preFundSetupBHex:  '0x000000000000000000000000111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
  postFundSetupAHex: '0x000000000000000000000000111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
  postFundSetupBHex: '0x000000000000000000000000111111111111111111111111111111111111111100000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000002000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001',
  
  proposeHex:    '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'0000000000000000000000000000000000000000000000000000000000000004' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000005' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000005' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001', // [GameAttributes: roundBuyIn]

  acceptHex:     '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'0000000000000000000000000000000000000000000000000000000000000005' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000005' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000005' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000002' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001', // [GameAttributes: roundBuyIn]

  playing1Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'0000000000000000000000000000000000000000000000000000000000000006' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000004' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000006' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'0000000000000000000000000000000000000000000000000000000000000000' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000100', // [GameAttributes: crosses]

  playing2Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'0000000000000000000000000000000000000000000000000000000000000007' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000006' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000004' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'0000000000000000000000000000000000000000000000000000000000000010' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000100', // [GameAttributes: crosses]

  playing3Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'0000000000000000000000000000000000000000000000000000000000000008' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000004' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000006' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'0000000000000000000000000000000000000000000000000000000000000010' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000101', // [GameAttributes: crosses]

  playing4Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'0000000000000000000000000000000000000000000000000000000000000009' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000006' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000004' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'0000000000000000000000000000000000000000000000000000000000000018' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000101', // [GameAttributes: crosses]

  playing5Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'000000000000000000000000000000000000000000000000000000000000000a' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000004' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000006' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'0000000000000000000000000000000000000000000000000000000000000018' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000121', // [GameAttributes: crosses]

  playing6Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'000000000000000000000000000000000000000000000000000000000000000b' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000006' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000004' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'000000000000000000000000000000000000000000000000000000000000001c' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000121', // [GameAttributes: crosses]

  playing7Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'000000000000000000000000000000000000000000000000000000000000000c' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000004' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000006' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'000000000000000000000000000000000000000000000000000000000000001c' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000161', // [GameAttributes: crosses]

  playing8Hex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'000000000000000000000000000000000000000000000000000000000000000d' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000006' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000004' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000003' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'000000000000000000000000000000000000000000000000000000000000009c' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000161', // [GameAttributes: crosses]

  drawHex:       '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'000000000000000000000000000000000000000000000000000000000000000e' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000005' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000005' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000005' // [GameAttributes: GamePositionType]
                     +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                     +'000000000000000000000000000000000000000000000000000000000000009c' // [GameAttributes: noughts
                     +'0000000000000000000000000000000000000000000000000000000000000163', // [GameAttributes: crosses]

  restingHex:    '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                     +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                     +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                     +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                     +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                     +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                     +'000000000000000000000000000000000000000000000000000000000000000f' // turnNum
                     +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                     +'0000000000000000000000000000000000000000000000000000000000000005' // aResolution
                     +'0000000000000000000000000000000000000000000000000000000000000005' // bResolution
                     +'0000000000000000000000000000000000000000000000000000000000000000' // [GameAttributes: GamePositionType = {resting propose accept playing victory draw}
                     +'0000000000000000000000000000000000000000000000000000000000000001', // [GameAttributes: roundBuyIn]
};

export const aResignsAfterOneRound = {
  ...standard,
  conclude: positions.conclude({...base, turnNum:  8, balances:fourSix}),
  concludeHex:       '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
  +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
  +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
  +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
  +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
  +'0000000000000000000000000000000000000000000000000000000000000003' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
  +'0000000000000000000000000000000000000000000000000000000000000008' // turnNum
  +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
  +'0000000000000000000000000000000000000000000000000000000000000004' // aResolution
  +'0000000000000000000000000000000000000000000000000000000000000006', // bResolution
};

export const noughtsvictory = {
  ...standard,
  playing1: positions.playing({...base, turnNum:  7, noughts:0b100000000, crosses:0b000000000, balances:fourSix}),
  playing2: positions.playing({...base, turnNum:  8, noughts:0b100000000, crosses:0b000010000, balances:sixFour}),
  playing3: positions.playing({...base, turnNum:  9, noughts:0b110000000, crosses:0b000010000, balances:fourSix}),
  playing4: positions.playing({...base, turnNum: 10, noughts:0b110000000, crosses:0b000011000, balances:sixFour}),
  victory:  positions.victory({...base, turnNum: 11, noughts:0b111000000, crosses:0b000011000, balances:fourSix}),
  victoryHex:   '0x'+'0000000000000000000000001111111111111111111111111111111111111111' // libraryAdress
                    +'0000000000000000000000000000000000000000000000000000000000000004' // channelNonce
                    +'0000000000000000000000000000000000000000000000000000000000000002' // number of participants
                    +'000000000000000000000000aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' // asAddress
                    +'000000000000000000000000bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb' // bsAddress
                    +'0000000000000000000000000000000000000000000000000000000000000002' // StateType (PreFundSetup, PostFundSetup, Game, Conclude)
                    +'000000000000000000000000000000000000000000000000000000000000000b' // turnNum
                    +'0000000000000000000000000000000000000000000000000000000000000000' // stateCount ?
                    +'0000000000000000000000000000000000000000000000000000000000000004' // aResolution
                    +'0000000000000000000000000000000000000000000000000000000000000006' // bResolution
                    +'0000000000000000000000000000000000000000000000000000000000000004' // [GameAttributes: GamePositionType = {resting propose accept playing victory draw}
                    +'0000000000000000000000000000000000000000000000000000000000000001' // [GameAttributes: roundBuyIn]
                    +'00000000000000000000000000000000000000000000000000000000000001c0' // [GameAttributes: noughts
                    +'0000000000000000000000000000000000000000000000000000000000000018', // [GameAttributes: crosses]
};


// export const bResignsAfterOneRound = {
//   ...standard,
//   conclude: positions.conclude({ ...base, turnNum: 7, balances: sixFour }),
//   conclude2: positions.conclude({ ...base, turnNum: 8, balances: sixFour }),
// };

// export const insufficientFunds = {
//   preFundSetupA: positions.preFundSetupB({ ...base, turnNum: 0, balances: nineOne, stateCount: 0 }),
//   preFundSetupB: positions.preFundSetupB({ ...base, turnNum: 1, balances: nineOne, stateCount: 1 }),
//   postFundSetupA: positions.postFundSetupA({ ...base, turnNum: 2, balances: nineOne, stateCount: 0 }),
//   postFundSetupB: positions.postFundSetupB({ ...base, turnNum: 3, balances: nineOne, stateCount: 1 }),
//   asMove,
//   bsMove,
//   propose: positions.proposeFromSalt({ ...base, turnNum: 4, balances: nineOne, asMove, salt }),
//   accept: positions.accept({ ...base, turnNum: 5, balances: eightTwo, preCommit, bsMove }),
//   reveal: positions.reveal({ ...base, turnNum: 6, balances: tenZero, bsMove, asMove, salt }),
//   conclude: positions.conclude({ ...base, turnNum: 7, balances: tenZero }),
//   conclude2: positions.conclude({ ...base, turnNum: 8, balances: tenZero }),
// };

export function build(customLibraryAddress: string, customAsAddress: string, customBsAddress: string) {
  const customParticipants: [string, string] = [customAsAddress, customBsAddress];
  const customBase = {
    libraryAddress: customLibraryAddress,
    channelNonce,
    participants: customParticipants,
    roundBuyIn,
  };

  const customShared = {
    ...customBase,
    asAddress: customAsAddress,
    bsAddress: customBsAddress,
    myName: 'Tom',
    opponentName: 'Alex',
  };

  return {
    ...customShared,
    preFundSetupA: positions.preFundSetupA({ ...base, turnNum: 0, balances: fiveFive, stateCount: 0 }),
    preFundSetupB: positions.preFundSetupB({ ...base, turnNum: 1, balances: fiveFive, stateCount: 1 }),
    postFundSetupA: positions.postFundSetupA({ ...base, turnNum: 2, balances: fiveFive, stateCount: 0 }),
    postFundSetupB: positions.postFundSetupB({ ...base, turnNum: 3, balances: fiveFive, stateCount: 1 }),
    // aResult: Result.YouWin,
    // bResult: Result.YouLose,
    propose: positions.propose({ ...base, turnNum: 4, balances: fiveFive}),
    // accept: positions.accept({ ...base, turnNum: 5, balances: fourSix, preCommit, bsMove }),
    // reveal: positions.reveal({ ...base, turnNum: 6, balances: sixFour, bsMove, asMove, salt }),
    // resting: positions.resting({ ...base, turnNum: 7, balances: sixFour }),
  };
}
