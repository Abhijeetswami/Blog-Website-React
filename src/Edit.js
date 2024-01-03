// Edit.js
import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import useFetch from "./useFetch";

const Edit = () => {
  const { id } = useParams();
  const { data: blog, error, isPending } = useFetch(`http://localhost:8000/blogs/${id}`);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setBody(blog.body);
    }
  }, [blog]);

  const handleSave = (e) => {
    e.preventDefault();

    setIsSaving(true);

    fetch(`http://localhost:8000/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, body }),
    })
      .then(() => {
        console.log("Blog updated");
        setIsSaving(false);
        history.push(`/blogs/${id}`);
      })
      .catch((error) => {
        console.error("Error updating blog:", error);
        setIsSaving(false);
      });
  };

  return (
    <div className="edit">
      {isPending && <div>Loading...</div>}
      {error && <div>{error}</div>}
      {blog && (
        <form onSubmit={handleSave}>
          <label>Blog Title:</label>
          <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
          <label>Blog Body:</label>
          <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
          {!isSaving && <button>Save Changes</button>}
          {isSaving && <button disabled>Saving...</button>}
        </form>
      )}
    </div>
  );
};

export default Edit;
