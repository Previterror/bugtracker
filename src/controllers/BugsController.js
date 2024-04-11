import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugService.js";




export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createBug)
    }


    async createBug(request, response, next) {
        try {
            const bugData = request.body
            const userInfo = request.userInfo
            bugData.creatorId = userInfo.id
            //
            const bug = await bugsService.createBug(bugData)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }
}