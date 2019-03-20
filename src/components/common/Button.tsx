import * as React from 'react'
import colors from '../../constants/colors'
import { FONT_SIZE, PADDING, RADIUS, BORDER } from '../../constants/size'

type Size = 'small' | 'meduim' | 'large'

interface Props {
  customSize?: Size
}

function getSizeStyle(size?: Size) {
  switch (size) {
    case 'small':
      return `
      font-size: ${FONT_SIZE.TINY};
      padding: ${PADDING.TINY};
    `
    case 'meduim':
      return `
      font-size: ${FONT_SIZE.MEDIUM};
      padding: ${PADDING.MEDIUM};
    `
    case 'large':
      return `
      font-size: ${FONT_SIZE.LARGE};
      padding: ${PADDING.LARGE};
    `
    default:
      return `
      font-size: ${FONT_SIZE.MEDIUM};
      padding: ${PADDING.MEDIUM};
    `
  }
}

function filterGenericProps(props: any) {
  const domProps = {
    ...props
  }

  delete domProps.customSize
  return domProps
}

export default (props: React.HTMLProps<HTMLButtonElement> & Props) => {
  const { children, customSize, disabled } = props
  const domProps = filterGenericProps(props)
  const sizeStyle = getSizeStyle(customSize)

  return (
    <button {...domProps}>
      {children}
      <style jsx>{`
        button {
          align-items: center;
          color: ${colors.TEXT_PRIMARY};
          border: solid ${BORDER.THICK} ${colors.BORDER_COLOR_LIGHT};
          background: ${colors.BG_WHITE};
          border-radius: ${RADIUS.NORMAL};
          ${sizeStyle}
          ${disabled && `color: ${colors.TEXT_DISABLED};`}
        }
      `}</style>
    </button>
  )
}
