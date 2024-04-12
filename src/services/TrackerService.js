import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class TrackerService {
    async deleteTracker(bugId, userInfo) {
        let trackerToDelete = await dbContext.TrackedBug.findById(bugId)
        if (trackerToDelete.accountId != userInfo) throw new Forbidden(`You're not allowed to delete tracker for ${trackerToDelete}`)

        await trackerToDelete.deleteOne()
        return trackerToDelete
    }


    async getMyBugs(user) {
        const bugs = await dbContext.TrackedBug.find({ accountId: user }).populate('tracker').populate('bug')
        return bugs
    }


    async getUsersByBug(bugId) {
        const users = await dbContext.TrackedBug.find({ bugId: bugId }).populate('tracker').populate('bug')
        return users
    }

    async createTrackedBug(bugToTrack) {
        const bug = (await dbContext.TrackedBug.create(bugToTrack))
        await bug.populate('tracker')
        await bug.populate('bug')
        return bug
    }

}

export const trackerService = new TrackerService()