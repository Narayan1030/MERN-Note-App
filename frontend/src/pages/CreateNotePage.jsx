import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../lib/axios";

const CreateNotePage = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // console.log(title);

  const handleFromSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error("Fields cannot be empty")
    }
    setLoading(true);
    try {
      await api.post("/notes", { title, content });
      toast.success("Note Created");
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col text-gray-200 mx-4 sm:mx-20 sm:pt-20 lg:mx-40">
      <div className="back_btn">
        <Link
          to="/"
          className="text-sm hover:bg-[#181818] flex  items-center gap-0.5 rounded-3xl px-2 py-1 w-[120px] mt-5"
        >
          <FaArrowLeft />
          Back to Notes
        </Link>
      </div>
      <div className="flex flex-col bg-[#181818] mt-5 h-auto px-4 py-7 rounded-xl">
        <h1 className="pb-5 font-bold text-xl lg:text-2xl">Create New Note</h1>
        <form
          onSubmit={handleFromSubmit}
          className="flex flex-col w-full gap-3"
        >
          <label className="lg:text-lg">Title:</label>
          <input
            type="text"
            id="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Note Title"
            className="bg-[#282828] rounded-2xl text-sm lg:text-lg px-2 h-8 w-full"
          />
          <label className="lg:text-lg">Content:</label>
          <textarea
            name="content"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="bg-[#282828] rounded-2xl text-sm lg:text-lg px-2 h-20 lg:h-40 w-full"
            placeholder="Write your note here"
          ></textarea>



          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-black px-4 my-3 py-2 rounded-3xl"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNotePage;
