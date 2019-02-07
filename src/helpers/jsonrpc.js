// TODO: typescriptify
export class JsonRpcClient {

  constructor(endpoint) {
    this.endpoint = endpoint
    this.id = 0
  }

  request(
    methodName,
    args
  ) {
    this.id++
    return fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },    
      body: JSON.stringify({
        'jsonrpc': '2.0',
        'id': this.id,
        'method': methodName,
        'params': args
      })
    })
    .then(response => {
      return response.json()
    });
  }

}
