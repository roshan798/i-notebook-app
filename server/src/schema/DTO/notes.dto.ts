import type { Notes } from '../types/notes'
class NotesDTO {
    id: string
    title: string
    content: string
    tags: string[]
    pinned: boolean
    createdAt: Date
    updatedAt?: Date
    pinnedAt?: Date
    constructor(notes: Notes) {
        this.id = notes._id!.toString()
        this.title = notes.title
        this.content = notes.content
        this.tags = notes.tags
        this.pinned = notes.pinned
        this.createdAt = notes.createdAt
        this.updatedAt = notes.updatedAt
        if (this.pinned) this.pinnedAt = notes.pinnedAt!
    }
}
export default NotesDTO
