import * as React from 'react'
import COLORS from '../../constants/colors'

interface Props {
  balance: number
}

export default class Card extends React.Component<Props> {
  public render() {
    return (
      <div className="container">
        <h1>Wallet</h1>
        <style jsx>{`
          .container {
            width: 100%;
            min-height: 80vh;
            padding: 1.2rem;
            border-radius: 4px;
            background: linear-gradient(
              to right bottom,
              ${COLORS.BG_GRADIENT_FROM},
              ${COLORS.BG_GRADIENT_TO}
            );
            color: ${COLORS.TEXT_MAIN};
          }
        `}</style>
      </div>
    )
  }
}
