import { create } from 'domain';

// FUNDING
// =======

export const FUNDING_SUCCESS = 'WALLET.FUNDING.SUCCESS';
export const FUNDING_FAILURE = 'WALLET.FUNDING.FAILURE';

export const fundingSuccess = (channelId, position: string) => ({
  type: FUNDING_SUCCESS as typeof FUNDING_SUCCESS,
  channelId,
  position,
});
export const fundingFailure = (channelId, reason) => ({
  type: FUNDING_FAILURE as typeof FUNDING_FAILURE,
  channelId,
  reason,
});

export type FundingSuccess = ReturnType<typeof fundingSuccess>;
export type FundingFailure = ReturnType<typeof fundingFailure>;
export type FundingResponse = FundingSuccess | FundingFailure;

// CHANNELS
// ========

export const CHANNEL_OPENED = 'WALLET.CHANNEL.OPENED';
export const CHANNEL_CLOSED = 'WALLET.CHANNEL.CLOSED';

export const channelOpened = (channelId: string) => ({
  type: CHANNEL_OPENED as typeof CHANNEL_OPENED,
  channelId,
});
export const channelClosed = (walletId: string) => ({
  type: CHANNEL_CLOSED as typeof CHANNEL_CLOSED,
  walletId,
});

export type ChannelOpened = ReturnType<typeof channelOpened>;
export type ChannelClosed = ReturnType<typeof channelClosed>;

// VALIDATION
// ==========

export const VALIDATION_SUCCESS = 'WALLET.VALIDATION.SUCCESS';
export const VALIDATION_FAILURE = 'WALLET.VALIDATION.FAILURE';

export const validationSuccess = () => ({
  type: VALIDATION_SUCCESS as typeof VALIDATION_SUCCESS,
});
export const validationFailure = (reason: "WalletBusy" | "InvalidSignature" | "Other", error?: string) => ({
  type: VALIDATION_FAILURE as typeof VALIDATION_FAILURE,
  reason,
  error,
});

export type ValidationSuccess = ReturnType<typeof validationSuccess>;
export type ValidationFailure = ReturnType<typeof validationFailure>;
export type ValidationResponse = ValidationSuccess | ValidationFailure;


// SIGNATURE
// =========

export const SIGNATURE_SUCCESS = 'WALLET.SIGNATURE.SUCCESS';
export const SIGNATURE_FAILURE = 'WALLET.SIGNATURE.FAILURE';

export const signatureSuccess = (signature: string) => ({
  type: SIGNATURE_SUCCESS as typeof SIGNATURE_SUCCESS,
  signature,
});

export const signatureFailure = (reason: "WalletBusy" | "Other", error?: string) => ({
  type: SIGNATURE_FAILURE as typeof SIGNATURE_FAILURE,
  reason,
  error,
});

export type SignatureSuccess = ReturnType<typeof signatureSuccess>;
export type SignatureFailure = ReturnType<typeof signatureFailure>;
export type SignatureResponse = SignatureSuccess | SignatureFailure;


// WITHDRAWAL
// ==========

export const WITHDRAWAL_SUCCESS = 'WALLET.WITHDRAWAL.SUCCESS';
export const WITHDRAWAL_FAILURE = 'WALLET.WITHDRAWAL.FAILURE';

export const withdrawalSuccess = transaction => ({
  type: WITHDRAWAL_SUCCESS as typeof WITHDRAWAL_SUCCESS,
  transaction,
});
export const withdrawalFailure = (reason) => ({
  type: WITHDRAWAL_FAILURE as typeof WITHDRAWAL_FAILURE,
  reason,
});

export type WithdrawalSuccess = ReturnType<typeof withdrawalSuccess>;
export type WithdrawalFailure = ReturnType<typeof withdrawalFailure>;
export type WithdrawalResponse = WithdrawalSuccess | WithdrawalFailure;


// INITIALIZATION
// ==============

export const INITIALIZATION_SUCCESS = 'WALLET.INITIALIZATION.SUCCESS';
export const INITIALIZATION_FAILURE = 'WALLET.INITIALIZATION.FAILURE';

export const initializationSuccess = address => ({
  type: INITIALIZATION_SUCCESS as typeof INITIALIZATION_SUCCESS,
  address,
});

export const initializationFailure = (message: string) => ({
  type: INITIALIZATION_FAILURE as typeof INITIALIZATION_FAILURE,
  message,
});

export type InitializationSuccess = ReturnType<typeof initializationSuccess>;

// CONCLUDE
// ==============

export const CONCLUDE_SUCCESS = 'WALLET.CONCLUDE.SUCCESS';
export const CONCLUDE_FAILURE = 'WALLET.CONCLUDE.FAILURE';

export const concludeSuccess = () => ({
  type: CONCLUDE_SUCCESS as typeof CONCLUDE_SUCCESS,
});

export const concludeFailure = (message: string) => ({
  type: CONCLUDE_FAILURE as typeof CONCLUDE_FAILURE,
  message,
});

export type ConcludeSuccess = ReturnType<typeof concludeSuccess>;
export type ConcludeFailure = ReturnType<typeof concludeFailure>;

export const CLOSE_SUCCESS = 'WALLET.CLOSE.SUCCESS';
export const closeSuccess = () => ({
  type: CLOSE_SUCCESS as typeof CLOSE_SUCCESS,
});
export type CloseSuccess = ReturnType<typeof closeSuccess>;


// DISPLAY
export const SHOW_WALLET = 'WALLET.DISPLAY.SHOW_WALLET';
export const showWallet = () => ({
  type: SHOW_WALLET as typeof SHOW_WALLET,
});
export type ShowWallet = ReturnType<typeof showWallet>;

export const HIDE_WALLET = 'WALLET.DISPLAY.HIDE_WALLET';
export const hideWallet = () => ({
  type: HIDE_WALLET as typeof HIDE_WALLET,
});
export type HideWallet = ReturnType<typeof hideWallet>;

// MESSAGING
// =========
export const MESSAGE_REQUEST = 'WALLET.MESSAGING.MESSAGE_REQUEST';

export const messageRequest = (to: string, data: string, signature: string) => ({
  type: MESSAGE_REQUEST as typeof MESSAGE_REQUEST,
  to,
  data,
  signature,
});

export type MessageRequest = ReturnType<typeof messageRequest>;




export const CHALLENGE_POSITION_RECEIVED = 'WALLET.MESSAGING.CHALLENGE_POSITION_RECEIVED';
export const challengePositionReceived = (positionData: string) => ({
  type: CHALLENGE_POSITION_RECEIVED as typeof CHALLENGE_POSITION_RECEIVED,
  positionData,
});
export type ChallengePositionReceived = ReturnType<typeof challengePositionReceived>;

export const CHALLENGE_REJECTED = 'WALLET.CHALLENGING.CHALLENGE_REJECTED';
export const challengeRejected = (reason) => ({
  type: CHALLENGE_REJECTED as typeof CHALLENGE_REJECTED,
  reason,
});
export type ChallengeRejected = ReturnType<typeof challengeRejected>;

export const CHALLENGE_RESPONSE_REQUESTED = 'WALLET.CHALLENGING.CHALLENGE_RESPONSE_REQUESTED';
export const challengeResponseRequested = () => ({
  type: CHALLENGE_RESPONSE_REQUESTED as typeof CHALLENGE_RESPONSE_REQUESTED,
});
export type ChallengeResponseRequested = ReturnType<typeof challengeResponseRequested>;

export const CHALLENGE_COMPLETE = 'WALLET.CHALLENGING.CHALLENGE_COMPLETE';
export const challengeComplete = () => ({
  type: CHALLENGE_COMPLETE as typeof CHALLENGE_COMPLETE,
});
export type ChallengeComplete = ReturnType<typeof challengeComplete>;

export type ResponseActionTypes =
  typeof CHALLENGE_COMPLETE |
  typeof CHALLENGE_RESPONSE_REQUESTED |
  typeof CHALLENGE_REJECTED |
  typeof CHALLENGE_POSITION_RECEIVED |
  typeof MESSAGE_REQUEST |
  typeof CLOSE_SUCCESS |
  typeof CONCLUDE_FAILURE |
  typeof CONCLUDE_SUCCESS |
  typeof WITHDRAWAL_FAILURE |
  typeof WITHDRAWAL_SUCCESS |
  typeof SIGNATURE_FAILURE |
  typeof SIGNATURE_SUCCESS |
  typeof VALIDATION_FAILURE |
  typeof VALIDATION_SUCCESS |
  typeof FUNDING_FAILURE |
  typeof FUNDING_SUCCESS |
  typeof CHANNEL_OPENED |
  typeof CHANNEL_CLOSED;

export type DisplayAction = ShowWallet | HideWallet;

// TODO: This could live exclusively in the wallet
export type ResponseAction =
  InitializationSuccess |
  ConcludeSuccess |
  CloseSuccess |
  ValidationSuccess |
  ValidationFailure |
  FundingSuccess |
  FundingFailure |
  SignatureSuccess |
  SignatureFailure |
  ChallengePositionReceived |
  ChallengeRejected |
  ChallengeResponseRequested |
  ChallengeComplete |
  MessageRequest;