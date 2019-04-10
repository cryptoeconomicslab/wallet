import {
  BigNumber,
  formatEther,
  formatUnits,
  parseEther,
  parseUnits,
  commify
} from 'ethers/utils'

const ETH = 'ETH'
const TEST = 'TEST'
const DAI = 'DAI'

let tokenDecimalMeta = {}
tokenDecimalMeta[ETH] = 'gwei'
tokenDecimalMeta[TEST] = 1
tokenDecimalMeta[DAI] = 18

function format(amount, tokenId, type){
  if(type!=='max' && type!=='min') throw new Error("type must be max or min")
  let decimalOrName = tokenDecimalMeta[getTokenName(tokenId)]
  let input = amount.toString()

  if(decimalOrName==='gwei'){
    if(type==='max'){
      return commify(formatUnits(parseEther(input), decimalOrName))
    } else {
      return commify(formatEther(parseUnits(input, decimalOrName)))
    }
  }else{
    return commify(formatUnits(input, decimalOrName))
  }
}

// TODO: make it inside sdk
export function getTokenName(tokenId: number) {
  switch (tokenId) {
    case 0:
      return ETH
    case 1:
      return TEST
    case 2:
      return DAI
    default:
      throw new Error("This func requires TokenId arg.")
  }
}

// TODO: create for general
// TODO: support a decimal
export function getTokenMinDigits(tokenId: number, amount: BigNumber): string {
  if(!tokenId && tokenId !== 0) throw new Error("This func requires TokenId arg.")
  return format(amount, tokenId, 'min')
}

export function getTokenMaxDigits(tokenId: number, amount: number): string {
  if(!tokenId && tokenId !== 0) throw new Error("This func requires TokenId arg.")
  return format(amount, tokenId, 'max')
}