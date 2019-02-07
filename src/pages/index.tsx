import * as React from 'react'
import WalletCard from '../components/wallet/WalletCard'
import { FONT_SIZE } from '../constants/size'

export default class App extends React.Component {
  public render() {
    return (
      <div>
        <h1 className="title">Wallets</h1>
        <WalletCard walletName="Chamber Wallet" />
        <style jsx>{`
          .title {
            font-size: ${FONT_SIZE.LARGE};
            padding: 1.2rem;
          }
        `}</style>
      </div>
    )
  }
}
