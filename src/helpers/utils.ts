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
  let decimalOrName = tokenDecimalMeta[getTokenName(tokenId)]

  if(type==='max'){
    if(decimalOrName==='gwei'){
      //ETH
      return commify(formatUnits(parseEther(amount.toString()), decimalOrName))
    }else{
      //ERC-20
      return commify(formatUnits(parseUnits(amount.toString()), decimalOrName))
    }
  } else if (type==='min'){
    if(decimalOrName==='gwei'){
      //ETH
      return commify(formatEther(parseUnits(amount.toString(), decimalOrName)))
    }else{
      //ERC-20
      return commify(formatUnits(parseUnits(amount.toString()), decimalOrName))
    }

  } else {
    throw new Error("This func requires type arg.")
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