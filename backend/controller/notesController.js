import notes from "../models/Note.js";

export const getAllRecords = async (req, res) => {
  try {
    const data = await notes.find();
    console.log("data fetched successfully");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
export const getRecord = async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await notes.findById(noteId);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const insertRecord = async (req, res) => {
  try {
    const data = req.body;
    const newNotes = new notes(data);
    const response = await newNotes.save();
    console.log("note saved");
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const updatedNote = req.body;
    const response = await notes.findByIdAndUpdate(noteId, updatedNote, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json({ error: "record not found" });
    }
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteId = req.params.id;
    const response = await notes.findByIdAndDelete(noteId);
    if (!response) {
      res.status(404).json({ error: "record not found" });
    }
    res.status(200).json({ success: "record deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal server error" });
  }
};
