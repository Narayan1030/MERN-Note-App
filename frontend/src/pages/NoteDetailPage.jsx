import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa6";
import api from "../../lib/axios";

const NoteDetailPage = () => {
  const [note, setNote] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { id } = useParams();
  // console.log(id);
  const handleNoteDelete = async () => {
    if (!window.confirm("are you sure you want to delete this note?")) return;
    try {
      await api.delete(`/notes/${id}`);
      navigate("/");
      toast.success("note deleted");
    } catch (error) {
      console.log(error);
      toast.error("Failed to delete note.");
    }
  };

  const handleUpdateNote = async () => {
    setSaving(true);
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields required");
      return;
    }
    try {
      await api.put(`/notes/${id}`, note);
      toast.success("Saved Changes");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  const handleFromSubmit = async (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`);
        setNote(res.data);
        // console.log(note);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);

  return (
    <div>
      <div className="flex flex-col text-gray-200 mx-4 sm:mx-20 sm:pt-20 lg:mx-40 pt-5">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-sm hover:bg-[#181818] flex  items-center gap-0.5 rounded-3xl px-2 py-2 w-[120px] "
          >
            <FaArrowLeft />
            Back to Notes
          </Link>
          <div className="text-sm hover:cursor-pointer hover:bg-[#181818] flex items-center border px-3 py-2 rounded-3xl gap-1">
            <RiDeleteBin6Line className="text-red-800 size-3.5" />
            <span className="text-green-800 font-bold" onClick={handleNoteDelete}>
              Delete Note
            </span>
          </div>
        </div>
        <div className="flex flex-col bg-[#181818] mt-5 h-auto px-4 py-7 rounded-xl">
          <h1 className="pb-5 font-bold text-xl lg:text-2xl">
            Create New Note
          </h1>
          <form
            onSubmit={handleFromSubmit}
            className="flex flex-col w-full gap-3"
          >
            <label className="lg:text-lg">Title:</label>
            <input
              type="text"
              id="text"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              placeholder="Note Title"
              className="bg-[#282828] rounded-2xl text-sm lg:text-lg px-2 h-8 w-full"
            />
            <label className="lg:text-lg">Content:</label>
            <textarea
              name="content"
              id="content"
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              className="bg-[#282828] rounded-2xl text-sm lg:text-lg px-2 h-20 lg:h-40 w-full"
              placeholder="Write your note here"
            ></textarea>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-black px-4 my-3 py-2 rounded-3xl"
                onClick={handleUpdateNote}
                disabled={saving}
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NoteDetailPage;
