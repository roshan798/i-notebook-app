import type { Notes } from '../types/notes'
class NotesDTO {
    id: string
    title: string = ""
    content: string = ""
    checklist: { text: string; completed: boolean }[] = []
    tags: string[]
    type: "note" | "list"
    pinned: boolean
    createdAt: Date
    updatedAt?: Date
    pinnedAt?: Date
    color: string
    constructor(notes: Notes) {
        this.id = notes._id!.toString()
        this.tags = notes.tags
        this.pinned = notes.pinned
        this.createdAt = notes.createdAt
        this.updatedAt = notes.updatedAt
        this.type = notes.type
        this.color = notes.color
        if (notes.title !== undefined) this.title = notes.title
        if (notes.content !== undefined) this.content = notes.content
        if (notes.pinnedAt) this.pinnedAt = notes.pinnedAt
        if (notes.checklist) this.checklist = notes.checklist
    }
}
export default NotesDTO
