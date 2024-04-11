import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"




class BugsService {


    async deleteBug(bugId, id) {
        const bugToDelete = await this.getBugById(bugId)
        if (bugToDelete.creatorId != id) throw new Forbidden('Naughty deleting other peoples bugs')
        await bugToDelete.deleteOne()
        return bugToDelete
    }


    async updateBug(bugId, updateData) {
        const bugToUpdate = await this.getBugById(bugId)


        if (bugToUpdate.creatorId != updateData.creatorId) throw new Forbidden('Naughty changing other peoples bugs')



        bugToUpdate.title = updateData.title ?? bugToUpdate.title
        bugToUpdate.description = updateData.description ?? bugToUpdate.description
        bugToUpdate.save()
        return bugToUpdate
    }


    async getBugById(bugId) {
        const bug = (await dbContext.Bug.findById(bugId)).populate('creator')
        if (!bugId) throw new Error('That, sir, is not a bug local to this ecosystem.')

        return bug
    }


    async getBugs() {
        const bugs = await dbContext.Bug.find()
        return bugs
    }


    async createBug(bugData, userInfo) {
        const bug = (await dbContext.Bug.create(bugData)).populate('creator')
        return bug
    }

}


export const bugsService = new BugsService()