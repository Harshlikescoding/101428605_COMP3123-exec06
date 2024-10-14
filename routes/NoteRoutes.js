const express = require('express');
const router = express.Router();
const Note = require('../models/NotesModel'); // Import the Note model

// Create a new Note
router.post('/notes', async (req, res) => {
    try {
        const { noteTitle, noteDescription, priority } = req.body;
        const newNote = new Note({
            noteTitle,
            noteDescription,
            priority,
            dateAdded: new Date(),
            dateUpdated: new Date()
        });
        await newNote.save();
        res.status(201).send(newNote);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Retrieve all Notes
router.get('/notes', async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).send(notes);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Retrieve a single Note with noteId
router.get('/notes/:noteId', async (req, res) => {
    try {
        const note = await Note.findById(req.params.noteId);
        if (!note) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.status(200).send(note);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

// Update a Note with noteId
router.put('/notes/:noteId', async (req, res) => {
    try {
        const { noteTitle, noteDescription, priority } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.noteId,
            { noteTitle, noteDescription, priority, dateUpdated: new Date() },
            { new: true }
        );
        if (!updatedNote) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.status(200).send(updatedNote);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Delete a Note with noteId
router.delete('/notes/:noteId', async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.noteId);
        if (!deletedNote) {
            return res.status(404).send({ message: "Note not found" });
        }
        res.status(200).send({ message: "Note deleted successfully" });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
});

module.exports = router;
