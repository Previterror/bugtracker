import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { bugsService } from "../services/BugService.js";




export class BugsController extends BaseController {
    constructor() {
        super('api/bugs')
        this.router
            .get('', this.getBugs)
            .get('/:bugId', this.getBugById)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .put('/:bugId', this.updateBug)
            .post('', this.createBug)
            .delete('/:bugId', this.deleteBug)
    }
    async deleteBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const userInfo = request.userInfo
            const message = await bugsService.deleteBug(bugId, userInfo.id)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async updateBug(request, response, next) {
        try {
            const bugId = request.params.bugId
            const updateData = request.body
            const userInfo = request.userInfo
            updateData.creatorId = userInfo.id
            const bugToUpdate = await bugsService.updateBug(bugId, updateData)
            response.send(bugToUpdate)

        } catch (error) {
            next(error)
        }
    }


    async getBugById(request, response, next) {
        try {
            const bugId = request.params.bugId
            const bug = await bugsService.getBugById(bugId)
            response.send(bug)
        } catch (error) {
            next(error)
        }
    }


    async getBugs(request, response, next) {
        try {
            const bugs = await bugsService.getBugs()
            response.send(bugs)
        } catch (error) {
            next(error)
        }
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