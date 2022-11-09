import { MessageBuilder } from '../shared/message'

const messageBuilder = new MessageBuilder()

// Bare bones method to create a create a complete response
const fetchDataMin = async (ctx) => {
  ctx.response({
    data: { result: {
      text: "SOME DATA"
    }},
  })
}

const fetchData = async (ctx) => {
  try {
    const response = await fetch("https://catfact.ninja/fact")

    // Need following check because running on simulator returns a string response.body,
    // whereas on actual device it is directly an Object
    let received = ""
    if (typeof(response.body) === "string"){
      received = JSON.parse(response.body)
    } else {
      received = response.body
    }
    ctx.response({
      data: {result: {
        // text: response.body.toString() + ";" + typeof(response.body)+";" + JSON.parse(response.body).fact
        text: received.fact
      }},
    })
  } catch (error) {
    // ctx.response({
    //   data: {result: {
    //     text: error.toString()
    //   }}
    // })
    ctx.response({
      data: { result: 'ERROR' },
    })
  }
}

AppSideService({
  onInit() {
    messageBuilder.listen(() => {})

    messageBuilder.on('request', (ctx) => {
      const jsonRpc = messageBuilder.buf2Json(ctx.request.payload)
      if (jsonRpc.method === 'GET_DATA') {
        return fetchDataMin(ctx)
      }
    })
  },

  onRun() {
  },

  onDestroy() {
  }
})
