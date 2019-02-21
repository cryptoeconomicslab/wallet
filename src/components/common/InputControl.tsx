import * as React from 'react'
import { MARGIN, FONT_SIZE, FONT_WEIGHT } from '../../constants/size'
import colors from '../../constants/colors'

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: any
  label: string
}

const InputControl = ({ onChange, value, label }: Props) => {
  return (
    <div>
      <label>{label}</label>
      <input onChange={onChange} value={value} />
      <style jsx>{`
        div {
          margin-bottom: ${MARGIN.MEDIUM};
        }

        label {
          display: block;
          margin-bottom: ${MARGIN.TINY};
          font-size: ${FONT_SIZE.TINY};
          font-weight: ${FONT_WEIGHT.BOLD};
        }

        input {
          display: block;
          width: 100%;
          margin: auto;
          border: solid 1px ${colors.BORDER_COLOR_INVERSE};
        }
      `}</style>
    </div>
  )
}

export default InputControl
