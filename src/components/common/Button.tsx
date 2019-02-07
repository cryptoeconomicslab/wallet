import * as React from 'react'
import colors from '../../constants/colors'
import { FONT_SIZE, PADDING, RADIUS } from '../../constants/size'

export default (props: React.HTMLProps<HTMLButtonElement>) => {
  const { children } = props
  return (
    <button {...props}>
      {children}
      <style jsx>{`
        color: ${colors.TEXT_MAIN};
        border: solid 2px ${colors.BORDER_COLOR_LIGHT};
        background: transparent;
        font-size: ${FONT_SIZE.MEDIUM};
        padding: ${PADDING.MEDIUM};
        border-radius: ${RADIUS.NORMAL};
      `}</style>
    </button>
  )
}
