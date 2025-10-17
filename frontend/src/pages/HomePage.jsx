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

  // console.log(notes);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get("/notes");
        // console.log(res);

        setNotes(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error fetching data");
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

  return (
    <div>
      <Navbar />
      <div className="pt-3 w-full h-50 sm:grid sm:grid-cols-2 lg:grid lg:grid-cols-3 text-green-300 flex flex-col justify-center items-center">
        {notes.map((note) => {
          return (
            <Link to={`note/${note._id}`}>
              <div
                key={note._id}
                className="border-t-2 rounded-lg w-[300px] md:w-[350px] lg:w-[300px] xl:w-[350px] h-[150px] bg-[#101014] flex-col p-3 mt-3 mx-4"
              >
                <h1 className="text-2xl pb-2 font-bold text-white">
                  {note.title}
                </h1>
                <p className="my-3">{note.content}</p>
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
