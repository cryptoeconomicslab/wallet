import * as React from 'react'
import { PADDING, BOX_SHADOW } from '../../constants/size'

const Card = ({ children }) => (
  <div>
    {children}
    <style jsx>{`
      div {
        padding: ${PADDING.MEDIUM};
        box-shadow: ${BOX_SHADOW.NORMAL};
      }
    `}</style>
  </div>
)

export default Card
