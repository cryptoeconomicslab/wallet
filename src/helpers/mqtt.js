import mqtt from 'mqtt'

export class MQTTClient {

  constructor(endpoint) {
    this.client = mqtt.connect(endpoint)
    this.client.on('connect', (e) => {
      console.log('connect', e)
    })
  }

  publish(
    topic,
    message
  ) {
    console.log('publish', topic)
    this.client.publish(topic, message)
    return true
  }

  subscribe(
    topic,
    handler
  ) {
    console.log('subscribe', topic)
    this.client.subscribe(topic, (err) => {
      console.log('subscribed', err)
    })
    this.client.on('message', function (_topic, message) {
      console.log('message', _topic, message.toString())
      handler(message.toString())
    })
  }
}