import * as React from 'react'
import Button from '../common/Button'
import { BigNumber } from 'ethers/utils'
import colors from '../../constants/colors'

interface Props {
  balance: BigNumber
  handleDeposit: (e: React.SyntheticEvent) => void
}

export default class Card extends React.Component<Props> {
  public render() {
    const { balance } = this.props

    return (
      <div className="container">
        <h1>Wallet</h1>
        <div>
          {/* Balance section */}
          <h2>Balance</h2>
          <div>
            <span>{balance.toNumber().toLocaleString()}</span>
          </div>
        </div>
        <div>
          {/* Control section */}
          <Button onClick={this.props.handleDeposit}>Deposit 1eth</Button>
        </div>
        <style jsx>{`
          .container {
            width: 100%;
            min-height: 80vh;
            padding: 1.2rem;
            border-radius: 4px;
            background: linear-gradient(
              to right bottom,
              ${colors.BG_GRADIENT_FROM},
              ${colors.BG_GRADIENT_TO}
            );
            color: ${colors.TEXT_MAIN};
          }
        `}</style>
      </div>
    )
  }
}
