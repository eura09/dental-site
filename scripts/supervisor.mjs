#!/usr/bin/env node
/**
 * Kleiner Prozess-Wächter für das Hosting bei Infomaniak.
 *
 * Startbefehl im Infomaniak Manager:   node supervisor.mjs
 * Ausführungsordner:                  <DEPLOY_PATH>   (dort liegt diese Datei)
 *
 * - lädt shared/.env
 * - startet current/server.js (Next.js standalone)
 * - startet den Server automatisch neu, wenn ein Deploy die Datei CURRENT_RELEASE ändert
 *   oder wenn der Server abstürzt
 */
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const envFile = path.join(root, 'shared', '.env')
const releaseFile = path.join(root, 'CURRENT_RELEASE')
const currentDir = path.join(root, 'current')

const log = (...args) => console.log(new Date().toISOString(), '[supervisor]', ...args)

if (fs.existsSync(envFile)) process.loadEnvFile(envFile)
process.env.NODE_ENV = 'production'

let child = null
let stopping = false
let restarts = 0

function start() {
  const server = path.join(fs.realpathSync(currentDir), 'server.js')
  log('starte', server)
  child = spawn(process.execPath, [server], {
    cwd: path.dirname(server),
    env: process.env,
    stdio: 'inherit',
  })
  child.on('exit', (code, signal) => {
    child = null
    if (stopping) return
    restarts += 1
    const delay = Math.min(30_000, 1000 * 2 ** Math.min(restarts, 5))
    log(`Server beendet (code=${code}, signal=${signal}) – Neustart in ${delay / 1000}s`)
    setTimeout(start, delay)
  })
  setTimeout(() => (restarts = 0), 60_000)
}

function restart() {
  if (!child) return start()
  log('Neuer Release erkannt – Neustart')
  const old = child
  old.removeAllListeners('exit')
  old.once('exit', () => {
    child = null
    setTimeout(start, 200)
  })
  old.kill('SIGTERM')
}

let lastRelease = fs.existsSync(releaseFile) ? fs.readFileSync(releaseFile, 'utf8').trim() : ''
fs.watchFile(releaseFile, { interval: 2000 }, () => {
  const next = fs.existsSync(releaseFile) ? fs.readFileSync(releaseFile, 'utf8').trim() : ''
  if (next && next !== lastRelease) {
    lastRelease = next
    restart()
  }
})

for (const sig of ['SIGINT', 'SIGTERM']) {
  process.on(sig, () => {
    stopping = true
    fs.unwatchFile(releaseFile)
    if (child) child.kill('SIGTERM')
    setTimeout(() => process.exit(0), 3000).unref()
  })
}

start()
