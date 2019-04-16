import * as React from 'react'
import { FONT_SIZE, PADDING, BORDER } from '../../constants/size'
import colors from '../../constants/colors'
import { Exit } from '@layer2/wallet/dist/models'
import { Button } from '../common'

interface Props {
  exits: Exit[]
  finalizeExit: (id: string) => any
}

export default class ExitList extends React.Component<Props> {
  public renderListItem = (exit: Exit) => {
    const segment = exit.segment
    const exitableAt = new Date(exit.getExitableAt())

    return (
      <div className="item" key={exit.id.toHexString()}>
        <div>
          {segment.start.toNumber().toLocaleString()} →{' '}
          {segment.end.toNumber().toLocaleString()}
        </div>
        <div>{exitableAt.toISOString()}</div>
        <div>
          <Button onClick={() => this.props.finalizeExit(exit.id.toString())}>
            Finalize
          </Button>
        </div>
        <style jsx>{`
          .item {
            padding: ${PADDING.MEDIUM} 0;
            border-bottom: solid ${BORDER.THIN} ${colors.BORDER_COLOR_LIGHT};
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
        `}</style>
      </div>
    )
  }

  public render() {
    const { exits } = this.props

    return (
      <section className="container">
        <div className="title-section">
          <h3 className="title">Exit List</h3>
        </div>
        <div className="list-container">
          {exits.length === 0 ? (
            <div>You don't have exits yet</div>
          ) : (
            exits
              .map((_, idx) => exits[exits.length - idx - 1])
              .slice(0, 10)
              .map(utxo => this.renderListItem(utxo))
          )}
        </div>
        <style jsx>{`
          .container {
            padding-top: ${PADDING.MEDIUM};
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
        `}</style>
      </section>
    )
  }
}
