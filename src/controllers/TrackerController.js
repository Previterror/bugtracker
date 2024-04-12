import { Auth0Provider } from "@bcwdev/auth0provider";
import { trackerService } from "../services/TrackerService.js";
import BaseController from "../utils/BaseController.js";


export class TrackerController extends BaseController {
    constructor() {
        super('api/trackedbugs')
        this.router
            .post('', this.createTrackedBug)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .delete('/:bugId', this.deleteTracker)

    }


    async deleteTracker(request, response, next) {
        try {
            const bugId = request.params.bugId
            const userInfo = request.userInfo.id
            const message = await trackerService.deleteTracker(bugId, userInfo)
            response.send(message)
        } catch (error) {
            next(error)
        }
    }
    async createTrackedBug(request, response, next) {
        try {
            const bugToTrack = request.body
            const trackedBug = await trackerService.createTrackedBug(bugToTrack)
            response.send(trackedBug)
        } catch (error) {
            next(error)
        }
    }


}