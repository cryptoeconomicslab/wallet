import {
  BigNumber,
  formatUnits,
  commify
} from 'ethers/utils'



const ETH = 'ETH'
const TEST = 'TEST'
const DAI = 'DAI'
enum TokenDecimalMetas {
  ETH = 9, // because `gwei` has 9 digits
  TEST = 1,
  DAI = 18
}
enum FormatTypes {
  ABBREVIATED = 0,
  VERBOSE = 1
}

function format(amount:BigNumber, tokenId:number, formatType:FormatTypes):string{
  if( !(tokenId || tokenId === 0) ) throw new Error("This func requires TokenId arg.") // 0 is false in JS
  let decimalOrName = TokenDecimalMetas[getTokenName(tokenId)]
  let input = amount.toString()

  switch(formatType){
    case FormatTypes.ABBREVIATED:
      return parseInt(formatUnits(input, decimalOrName))+''
    case FormatTypes.VERBOSE:
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

export function getTokenMinDigits(tokenId: number, amount: BigNumber): string {
  return format(amount, tokenId, FormatTypes.ABBREVIATED)
}
export function getTokenMaxDigits(tokenId: number, amount: BigNumber): string {
  return format(amount, tokenId, FormatTypes.VERBOSE)
}