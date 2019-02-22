import * as React from 'react'
import { SignedTransactionWithProof } from '@layer2/core'
import { FONT_SIZE, PADDING, BORDER } from '../../constants/size'
import colors from '../../constants/colors'
import { Button } from '../common'
import { ChamberWallet } from '@layer2/wallet'

interface Props {
  utxos: SignedTransactionWithProof[]
  wallet: ChamberWallet
}

export default class UTXOList extends React.Component<Props> {
  public renderListItem = (utxo: SignedTransactionWithProof) => {
    const segment = utxo.getOutput().getSegment(0)
    const wallet = this.props.wallet

    return (
      <div className="item" key={utxo.getTxHash()}>
        <div>
          {segment.start.toNumber().toLocaleString()} →{' '}
          {segment.end.toNumber().toLocaleString()}
        </div>
        <Button
          customSize="small"
          onClick={() => {
            wallet
              .exit(utxo)
              .then(console.log)
              .catch(console.error)
          }}
        >
          EXIT
        </Button>
        <style jsx>{`
          .item {
            padding: ${PADDING.MEDIUM} 0;
            border-bottom: solid ${BORDER.THIN}
              ${colors.BORDER_COLOR_VERY_LIGHT};
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }

  public render() {
    const { utxos } = this.props

    return (
      <section className="container">
        <div className="title-section">
          <h3 className="title">Latest UTXOs</h3>
          <span className="link-text">SHOW ALL</span>
        </div>
        <div className="list-container">
          {utxos.length === 0 ? (
            <div>You don't have utxos yet</div>
          ) : (
            utxos
              .map((_, idx) => utxos[utxos.length - idx - 1])
              .slice(0, 10)
              .map(utxo => this.renderListItem(utxo))
          )}
        </div>
        <style jsx>{`
          .container {
            padding-top: ${PADDING.MEDIUM};
            border-top: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
          }

          .title-section {
            display: flex;
            justify-content: space-between;
          }

          .title {
            font-size: ${FONT_SIZE.MEDIUM};
          }

          .link-text {
            font-size: ${FONT_SIZE.TINY};
            text-decoration: underline;
          }

          .list-container {
            height: 140px;
            overflow-y: scroll;
          }
        `}</style>
      </section>
    )
  }
}
