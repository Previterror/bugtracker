import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js";




class NotesService {


    async deleteNotes(noteId, userInfo) {
        const noteToDelete = await dbContext.Note.findById(noteId)

        if (noteToDelete.creatorId != userInfo) throw new Forbidden('You shall not passsss');

        await noteToDelete.deleteOne()
        return `${noteToDelete} was deleted. Huzzah!`
    }


    async getNotesByBugId(bugId) {
        const notes = await dbContext.Note.find({ bugId: bugId })
        return notes
    }


    async createNote(noteData) {
        const newNote = (await dbContext.Note.create(noteData)).populate('creator')
        return newNote
    }

}


export const notesService = new NotesService