import * as React from 'react'
import { FONT_SIZE, PADDING, BORDER } from '../../constants/size'
import colors from '../../constants/colors'

interface Props {
  actions: any[]
}

export default class UserActionSection extends React.Component<Props> {
  public renderListItem = action => {
    return (
      <div className="item" key={action.id}>
        {action.type}:{action.amount}
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
    const { actions } = this.props

    return (
      <section className="container">
        <div className="title-section">
          <h3 className="title">History</h3>
        </div>
        <div className="list-container">
          {actions.length === 0 ? (
            <div>You don't have actions yet</div>
          ) : (
            actions.map(this.renderListItem)
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

          .list-container {
            min-height: 200px;
            overflow-y: scroll;
          }
        `}</style>
      </section>
    )
  }
}
