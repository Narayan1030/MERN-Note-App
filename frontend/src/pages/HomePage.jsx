import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import toast from "react-hot-toast";
import { Link } from "react-router";
import api from "../../lib/axios";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search , setSearch] = useState("");

  // console.log(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log(res);

        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
      }
    };
    fetchNotes();
  }, []);



  const filteredNotes = notes.filter((notes) =>
    notes.title.toLowerCase().includes(search.toLowerCase()) ||
    notes.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleNoteDelete = async (e, _id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete it?")) return;

    try {
      await api.delete(`/notes/${_id}`);
      setNotes((prev) => prev.filter((note) => note._id !== _id));
      toast.success("Note Deleted");
    } catch (error) {
      console.log(error);
    }
  };

  // Function to format createdAt date
  const formatDateOnly = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString(); // e.g., "10/17/2025"
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-gray-400">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      {/* Search Bar */}
      <div className="flex justify-center mt-6 mb-4">
        <input
          type="text"
          value={search}
          placeholder="Search Notes..."
          onChange={(e) => setSearch(e.target.value)}
          className="w-72 sm:w-96 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-[#101014] text-white placeholder-gray-400"
        />
      </div>

      <div className="pt-3 w-full h-50 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 text-green-300 flex flex-col justify-center items-center">
        {filteredNotes.map((note) => {
          return (
            <Link to={`note/${note._id}`} key={note._id}>
              <div className="border-t-2 rounded-lg w-[300px] md:w-[350px] lg:w-[300px] xl:w-[350px] h-[150px] bg-[#101014] flex-col p-3 mt-3 mx-4 relative">
                <h1 className="text-2xl pb-2 font-bold text-white">
                  {note.title}
                </h1>
                <p className="my-3">{note.content}</p>
                
                {/* Display createdAt date in top-right corner */}
                <span className="absolute top-2 right-3 text-gray-400 text-xs italic">
                  Created: {formatDateOnly(note.createdAt)}
                </span>

                <div className="flex mx-3 justify-end gap-3">
                  <span>
                    <FaEdit className="hover:cursor-pointer" />
                  </span>
                  <span
                    className="text-red-800 hover:cursor-pointer"
                    onClick={(e) => handleNoteDelete(e, note._id)}
                  >
                    <RiDeleteBin6Line />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default HomePage;
