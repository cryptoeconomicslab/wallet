import * as React from 'react'
import Link from 'next/link'
import useEffectOnce from 'react-use/lib/useEffectOnce'
import {
  FONT_SIZE,
  PADDING,
  BOX_SHADOW,
  FONT_WEIGHT,
  MARGIN
} from '../constants/size'
import colors from '../constants/colors'
import { ChamberWallet } from '@layer2/wallet'
import { getTokenName, getTokenMinDigits } from '../helpers/utils'

// TODO: subscribe wallet polling
const Heading = ({
  balance,
  wallet,
  tokenId
}: {
  balance: number
  wallet: ChamberWallet
  tokenId: number
}) => {
  const [balanceInner, setBalanceInner] = React.useState(balance)
  React.useEffect(() => {
    function updater() {
      setBalanceInner(getTokenMinDigits(tokenId, wallet.getBalance(tokenId)))
    }
    wallet.addListener('updated', updater)
    return () => {
      wallet.removeListener('updated', updater)
    }
  }, [balance])

  useEffectOnce(() => {
    wallet
      .syncChildChain()
      .then(() => setBalanceInner(getTokenMinDigits(tokenId, wallet.getBalance(tokenId))))
  })

  return (
    <section className="heading">
      <Link prefetch href="/">
        <button className="back-button">←</button>
      </Link>
      <div className="balance-section">
        <h3 className="balance-title">Balance</h3>
        <span className="balance-value">
          {balanceInner}
          <span className="balance-unit">{getTokenName(tokenId)}</span>
        </span>
      </div>
      <style jsx>{`
        .back-button {
          font-size: ${FONT_SIZE.SEMI_LARGE};
          font-weight: ${FONT_WEIGHT.NORMAL};
          padding: ${PADDING.MEDIUM};
        }

        .heading {
          background-color: ${colors.BG_WHITE};
          color: ${colors.TEXT_MAIN};
          box-shadow: ${BOX_SHADOW.VERTICAL_NORMAL};
        }

        .balance-section {
          height: 14vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 ${PADDING.VERY_LARGE} ${PADDING.LARGE};
        }

        .balance-title {
          font-size: ${FONT_SIZE.MEDIUM};
        }

        .balance-value {
          font-size: ${FONT_SIZE.LARGE};
        }

        .balance-unit {
          font-size: ${FONT_SIZE.SEMI_LARGE};
          margin-left: ${MARGIN.MEDIUM};
        }
      `}</style>
    </section>
  )
}

export default Heading
