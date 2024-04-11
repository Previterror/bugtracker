import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { BugSchema } from '../models/Bug.js';
import { TrackedBugSchema } from '../models/TrackedBug.js';
import { NoteSchema } from '../models/Note.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Bug = mongoose.model('Bug', BugSchema)
  TrackedBug = mongoose.model('TrackedBug', TrackedBugSchema)
  Note = mongoose.model('Note', NoteSchema)
}

export const dbContext = new DbContext()
