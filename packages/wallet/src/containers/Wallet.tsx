import React from 'react';
import { PureComponent } from 'react';
import { connect } from 'react-redux';

import * as states from '../states';
import FundingContainer from './Funding';
import RespondingContainer from './Responding';
import ChallengingContainer from './Challenging';
import WithdrawingContainer from './Withdrawing';
import ClosingContainer from './Closing';

interface WalletProps {
  state: states.WalletState;
}

class Wallet extends PureComponent<WalletProps> {

  render() {
    const { state } = this.props;
    console.log(state);
    switch (state.stage) {
      case states.FUNDING:
        return <FundingContainer state={state} />;
      case states.CHALLENGING:
        return <ChallengingContainer state={state} />;
      case states.WITHDRAWING:
        return <WithdrawingContainer state={state} />;
      case states.RESPONDING:
        return <RespondingContainer state={state} />;
      case states.CLOSING:
        return <ClosingContainer state={state} />;
      default:
        return null;
    }
  }
}

const mapStateToProps = (state: states.WalletState): WalletProps => ({
  state,
});

export default connect(mapStateToProps)(Wallet);
