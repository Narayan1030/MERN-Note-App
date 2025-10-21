import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiPlus } from "react-icons/fi";
import toast from "react-hot-toast";
import { Link } from "react-router";
import api from "../../lib/axios";

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);

  // console.log(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const res = await api.get("/notes");
        // console.log(res);

        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error fetching data", error);
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

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

  // Function to truncate content
  const truncateContent = (content, maxLength = 80) => {
    if (!content) return "";
    return content.length > maxLength ? content.substring(0, maxLength) + "..." : content;
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-300"></div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      
      {/* Header Section */}
      <div className="px-6 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">My Notes</h1>
            <p className="text-gray-400">
              {notes.length === 0 ? "No notes yet" : `${notes.length} note${notes.length !== 1 ? 's' : ''} found`}
            </p>
          </div>
        </div>

        {/* Notes Grid */}
        {notes.length === 0 ? (
          <div className="flex flex-col justify-center items-center py-20">
            <div className="text-center">
              <div className="w-24 h-24 mx-auto mb-6 bg-[#101014] border-t-2 border-green-300 rounded-lg flex items-center justify-center">
                <FiPlus className="text-3xl text-green-300" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No notes yet</h3>
              <p className="text-gray-400 mb-6">Start by creating your first note</p>
              <Link 
                to="/create" 
                className="bg-[#101014] border-t-2 border-green-300 hover:bg-green-300 hover:text-black text-green-300 px-6 py-3 rounded-lg inline-flex items-center gap-2 transition-all duration-200 font-medium"
              >
                <FiPlus className="text-lg" />
                Create Note
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 text-green-300 flex flex-col justify-center items-center">
            {notes.map((note) => {
              return (
                <Link to={`note/${note._id}`} key={note._id} className="group">
                  <div className="border-t-2 border-green-300 rounded-lg w-[300px] md:w-[350px] lg:w-[300px] xl:w-[350px] h-[180px] bg-[#101014] flex-col p-4 mt-3 mx-4 relative hover:shadow-lg hover:shadow-green-300/20 transition-all duration-200 hover:scale-105">
                    
                    {/* Header with title and date */}
                    <div className="flex justify-between items-start mb-3">
                      <h1 className="text-xl font-bold text-white truncate pr-2 group-hover:text-green-300 transition-colors duration-200">
                        {note.title || "Untitled"}
                      </h1>
                      <span className="text-gray-400 text-xs whitespace-nowrap">
                        {formatDateOnly(note.createdAt)}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 mb-4">
                      <p className="text-green-300 text-sm leading-relaxed">
                        {truncateContent(note.content)}
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-2 border-t border-gray-700">
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          // Handle edit navigation if needed
                        }}
                        className="p-2 text-gray-400 hover:text-green-300 hover:bg-gray-800 rounded-md transition-all duration-200"
                        title="Edit note"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={(e) => handleNoteDelete(e, note._id)}
                        className="p-2 text-gray-400 hover:text-red-400 hover:bg-gray-800 rounded-md transition-all duration-200"
                        title="Delete note"
                      >
                        <RiDeleteBin6Line className="text-sm" />
                      </button>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
