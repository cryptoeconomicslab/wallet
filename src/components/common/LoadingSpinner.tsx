type Size = 'large' | 'small' | 'medium'

interface Props {
  size?: Size
}

function getScale(size: Size) {
  switch (size) {
    case 'large':
      return 0.8
    case 'medium':
      return 0.4
    case 'small':
      return 0.3
    default:
      return 0.3
  }
}

// using pure css loading
// https://loading.io/css/
export default ({ size }: Props) => {
  const scale = getScale(size)

  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
      <style>{`
.lds-ring {
  display: inline-block;
  position: relative;
  width: calc(64px * ${scale});
  height: calc(64px * ${scale});
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: calc(51px * ${scale});
  height: calc(51px * ${scale});
  margin: calc(6px * ${scale});
  border: calc(6px * ${scale}) solid #fff;
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  border-color: #fff transparent transparent transparent;
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
`}</style>
    </div>
  )
}
