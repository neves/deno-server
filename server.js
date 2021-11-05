// sample file to run on a native machine using systemd:
// https://blog.r0b.io/post/running-node-js-as-a-systemd-service/
// deno run -Ar 
import { listenAndServe } from "https://deno.land/std@0.113.0/http/server.ts"

const boot = new Date().toJSON()
let counter = 0

console.log("Listening on http://localhost:8080")

await listenAndServe(":8080", (_req) => {
  const body = `counter: ${counter++}. boot: ${boot}`
  
  return new Response(body, {
    headers: { "content-type": "text/plain" },
  })
})
