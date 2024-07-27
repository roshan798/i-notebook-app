import type { Notes } from 'notes'
class NotesDTO {
    id: string
    title: string
    content: string
    tags: string[]
    createdAt: Date
    updatedAt?: Date

    constructor(notes: Notes) {
        this.id = notes._id!.toString()
        this.title = notes.title
        this.content = notes.content
        this.tags = notes.tags
        this.createdAt = notes.createdAt
        this.updatedAt = notes.updatedAt
    }
}
export default NotesDTO
