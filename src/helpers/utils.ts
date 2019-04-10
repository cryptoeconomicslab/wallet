import {
  BigNumber,
  formatEther,
  parseUnits
} from 'ethers/utils'

// TODO: make it inside sdk
export function getTokenName(tokenId: number) {
  switch (tokenId) {
    case 0:
      return 'ETH'
    case 1:
      return 'TEST'
    case 2:
      return 'DAI'
    default:
      return 'ETH'
  }
}

export function changeUnit(tokenId: number, amount: BigNumber): number {
  switch (tokenId) {
    case 0:
      return parseInt(formatEther(parseUnits(amount.toString(), 'gwei')))
    default:
      return amount.toNumber()
  }
}
