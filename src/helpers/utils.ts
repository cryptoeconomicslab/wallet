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
