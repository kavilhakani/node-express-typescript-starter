import * as dotenv from 'dotenv'
import * as session from 'express-session'
import * as express from 'express'
import * as morgan from 'morgan'

import { WelcomeControllerRoute } from './controller/welcome.controller'
import { appLogger } from './helper/winston-logger'

export class App {
    public express: express.Application

    //Keep adding Controller routes to this map
    private routeMap: Map<any, express.Router[]> = new Map<any, express.Router[]>([
        ['/', [WelcomeControllerRoute]]
    ])

    constructor() {
        dotenv.config()
        this.express = express()
        this.setupMiddleware()
        this.setupSession()
        this.mountRoutes()
    }

    private setupMiddleware() {
        this.express.use(morgan('tiny', {stream :appLogger}))
    }

    private setupSession() {
        this.express.use(session({ secret: process.env.SECRET || 'mys3cr3TKey', resave: false, saveUninitialized: false }))
    }

    private mountRoutes(): void {
        const router = express.Router()

        this.routeMap.forEach((router: express.Router[], path: any) => {
            this.express.use(path, router);
        })

        this.express.use('/', router)
    }
}