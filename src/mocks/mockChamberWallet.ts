// mock chamber wallet instance
// remove this file when chamber-wallet is available

import { BigNumber } from 'ethers/utils'
import { TransactionReceipt } from 'ethers/providers'
import delay from '../utils/delay'

// mock chamber wallet instance
export class MockChamberWallet {
  private balance: BigNumber = new BigNumber(100)

  public getBalance(): BigNumber {
    return this.balance
  }

  public async deposit(): Promise<TransactionReceipt> {
    await delay(1500)

    // test data from https://github.com/ethereum/wiki/wiki/JavaScript-API#example-43
    const receipt = {
      transactionHash:
        '0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b',
      transactionIndex: 0,
      blockHash:
        '0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46',
      blockNumber: 3,
      contractAddress: '0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b',
      cumulativeGasUsed: new BigNumber(314159),
      gasUsed: new BigNumber(30234),
      logs: [],
      status: 1,
      byzantium: false
    }

    return Promise.resolve(receipt)
  }
}
