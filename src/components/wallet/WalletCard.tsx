import * as React from 'react'
import { BigNumber } from 'ethers/utils'
import colors from '../../constants/colors'
import { DEPOSIT_STATUS } from '../../redux/modules/chamberWallet/deposit'
import { FONT_SIZE, PADDING } from '../../constants/size'
import { Button, LoadingSpinner } from '../common'
import { MarginHorizontal } from '../utility'

interface Props {
  walletName: string
  balance: BigNumber
  depositStatus: DEPOSIT_STATUS
  handleDeposit: (e: React.SyntheticEvent) => void
}

export default class WalletCard extends React.Component<Props> {
  public render() {
    const { walletName, balance, depositStatus } = this.props

    return (
      <main className="container">
        <section className="title-section">
          <h2 className="wallet-title">{walletName}</h2>
        </section>
        <section className="balance-section">
          {/* Balance section */}
          <h3 className="balance-title">Balance</h3>
          <div>
            <span className="balance-value">
              {balance.toNumber().toLocaleString()}
            </span>
          </div>
        </section>
        <section>{/* UTXO List section */}</section>
        <section className="control-section">
          {/* Control section */}
          <div className="deposit-control">
            <Button
              disabled={depositStatus === DEPOSIT_STATUS.LOADING}
              onClick={this.props.handleDeposit}
            >
              Deposit 1eth
            </Button>
            {depositStatus === DEPOSIT_STATUS.LOADING && (
              <>
                <MarginHorizontal />
                <LoadingSpinner size="medium" />
              </>
            )}
          </div>
        </section>
        <style jsx>{`
          .container {
            width: calc(100% - 2.4rem);
            height: 80vh;
            padding: 1.2rem;
            border-radius: 8px;
            background: linear-gradient(
              to right bottom,
              ${colors.BG_GRADIENT_FROM},
              ${colors.BG_GRADIENT_TO}
            );
            color: ${colors.TEXT_MAIN};
            margin: auto;
          }

          .title-section {
            border-bottom: solid 1px ${colors.BORDER_COLOR_LIGHT};
            padding-bottom: ${PADDING.TINY};
          }

          .wallet-title {
            font-size: ${FONT_SIZE.SEMI_LARGE};
            text-transform: uppercase;
          }

          .balance-section {
            height: 25vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .balance-title {
            text-transform: uppercase;
            font-size: ${FONT_SIZE.SEMI_LARGE};
          }

          .balance-value {
            font-size: ${FONT_SIZE.VERY_LARGE};
          }

          .deposit-control {
            display: flex;
            align-items: center;
          }
        `}</style>
      </main>
    )
  }
}
