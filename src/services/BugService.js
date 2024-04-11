import { dbContext } from "../db/DbContext.js"




class BugsService {
    async createBug(bugData, userInfo) {
        const bug = (await dbContext.Bug.create(bugData)).populate('creator')
        return bug
    }

}


export const bugsService = new BugsService()