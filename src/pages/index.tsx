import * as React from 'react'
import { Dispatch, bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { AppState } from '../redux/modules'
import {
  loadWallet,
  State as ChamberWalletState
} from '../redux/modules/chamberWallet'

interface StateProps {
  chamberWallet: ChamberWalletState
}

interface DispatchProps {
  loadWallet: () => void
}

class App extends React.Component<StateProps & DispatchProps> {
  public componentDidMount() {
    const { chamberWallet, loadWallet } = this.props
    if (!chamberWallet.initialized) {
      loadWallet()
    }
  }

  public render() {
    return <div>Hello</div>
  }
}

export default connect(
  (state: AppState): StateProps => ({
    chamberWallet: state.chamberWallet
  }),
  (dispatch: Dispatch): DispatchProps => ({
    loadWallet: bindActionCreators(loadWallet, dispatch)
  })
)(App)
