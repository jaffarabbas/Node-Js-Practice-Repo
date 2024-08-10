const client = require('./client')

async function init() {
    await client.set("darklord:1","jaffaasdasr")
    const res = await client.get('darklord:1')
    console.log("res: "+res)
}

init()