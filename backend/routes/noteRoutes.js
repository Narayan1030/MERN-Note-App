import express from "express"
import notes from "../models/Note.js"
import { deleteNote, getAllRecords, getRecord, insertRecord, updateNote } from "../controller/notesController.js"

const router = express.Router()


router.get('/', getAllRecords)

router.get('/:id', getRecord)

router.post('/', insertRecord)

router.put('/:id', updateNote)

router.delete('/:id', deleteNote)

export default router