// sample file to run on a native machine using systemd:
// https://blog.r0b.io/post/running-node-js-as-a-systemd-service/
// deno run -Ar 
import { listenAndServe } from "https://deno.land/std/http/server.ts"

const boot = new Date().toJSON()
let counter = 0

console.log("Listening on http://localhost:8080")

await listenAndServe(":8080", (req) => {
  if (req.url.endsWith("/throw")) throw "error"
  
  const memory = Object.entries(Deno.memoryUsage()).map(([a, b]) => [a, Math.round(b/1024, 2)])
  const body = `counter: ${counter++}. boot: ${boot}. Memory: ${memory}`
  
  return new Response(body, {
    headers: { "content-type": "text/plain" },
  })
})
