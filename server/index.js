'use strict';

import Koa from 'koa'
import IO from 'socket.io'
import http from 'http'
import koaLogger from 'winston-koa-logger'
import convert from 'koa-convert'
import compress from 'koa-compress'
import staticFiles from 'koa-static'
import body from 'koa-body'
import json from 'koa-json'
import views from 'koa-views'

import config from './config'
import db from './db'
import router from './router'
import catchException from './lib/exception'
import socketio_controller from './controllers/socketio'

const app = new Koa()
const server = http.createServer(app.callback())
app.io = new IO(server)

app.use(convert(koaLogger(config.logger)))

app.use(compress(config.compress))

app.use(body(config.body))

app.use(convert(staticFiles(config.location.public)))

app.use(convert(json(config.jsonPretty)));

app.use(views(config.views.rootDir), config.views.engine)

app.use(catchException)

app.use(router.routes())

app.use(router.allowedMethods())

app.io.on('connection', socketio_controller.handler)

server.listen(config.port, config.banner)

export default app
