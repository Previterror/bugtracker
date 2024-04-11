import { Schema } from "mongoose"

export const BugSchema = new Schema({
    title: { type: String, minLength: 10, maxLength: 50, required: true },
    description: { type: String, minLength: 10, maxLength: 500, required: true },
    priority: { type: Number, min: 1, max: 5, required: true },
    closed: { type: Boolean, default: false, required: true },
    closedData: { type: Date, required: true },
    creatorId: { type: Schema.ObjectId, ref: 'Account', required: true },
},
    {
        toJSON: { virtuals: true }
    })

BugSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})
