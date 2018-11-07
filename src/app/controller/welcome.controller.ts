import { Router, Request, Response, NextFunction } from 'express'


export class WelcomeController {
    public route: Router = Router();

    constructor() {
        this.route.get('/', this.get.bind(this))
    }

    get(req: Request, res: Response, next: NextFunction) {
        res.send({
            message: "Hey! I'm awake! :)"
        })
    }
}


export const WelcomeControllerRoute: Router = new WelcomeController().route;