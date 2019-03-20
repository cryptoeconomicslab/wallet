import * as React from 'react'
import Link from 'next/link'
import { FONT_SIZE, PADDING, BOX_SHADOW, FONT_WEIGHT } from '../constants/size'
import colors from '../constants/colors'

const Heading = ({ balance }) => {
  return (
    <section className="heading">
      <Link prefetch href="/">
        <button className="back-button">←</button>
      </Link>
      <div className="balance-section">
        <h3 className="balance-title">Balance</h3>
        <span className="balance-value">
          {balance.toNumber().toLocaleString()}
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
      `}</style>
    </section>
  )
}

export default Heading
