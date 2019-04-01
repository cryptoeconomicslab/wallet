import * as React from 'react'
import { connect } from 'react-redux'
import { createWallet } from '../../redux/modules/chamberWallet/wallet'
import { Button, InputControl } from '../common'
import colors from '../../constants/colors'
import { FONT_SIZE } from '../../constants/size'
interface DispatchProps {
  createWallet: (privateKey: string) => void
}

interface State {
  privateKey: string
}

interface Props {
  error: Error | undefined
}

class CreateWalletSection extends React.Component<
  Props & DispatchProps,
  State
> {
  public state = {
    privateKey: ''
  }

  public render() {
    const { error } = this.props

    return (
      <div className="container">
        <h3>Create Wallet</h3>
        <InputControl
          label="private key"
          value={this.state.privateKey}
          onChange={e => {
            this.setState({ privateKey: e.target.value })
          }}
        />
        <Button onClick={this.handleCreateWallet}>Create Wallet</Button>
        {error && <p className="error">{error.message}</p>}
        <style jsx>
          {`
            .container {
              width: calc(100% - 2.4rem);
              height: 90vh;
              padding: 1.2rem;
              border-radius: 8px;
              margin: auto;
              overflow-y: scroll;
            }

            .error {
              color: ${colors.TEXT_ERROR};
              font-size: ${FONT_SIZE.MEDIUM};
            }
          `}
        </style>
      </div>
    )
  }
  private handleCreateWallet = () => {
    this.props.createWallet(this.state.privateKey)
  }
}

export default connect(
  null,
  { createWallet }
)(CreateWalletSection)
