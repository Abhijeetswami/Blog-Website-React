// Create.js
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./App.css";
const Create = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("mario");
  const [content, setContent] = useState("");
  const [isPending, setIsPending] = useState(false);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    const blog = { title, author, body: content };

    setIsPending(true);

    fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    })
      .then(() => {
        console.log("New blog added");
        setIsPending(false);
        history.push("/");
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        setIsPending(false);
      });
  };

  return (
    <div className="create animated">
      <h2>Add a new Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog Author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="mario">Mario</option>
          <option value="yoshi">Yoshi</option>
        </select>
        <label>Blog Content:</label>
        <textarea
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        {!isPending && <button>Add Blog</button>}
        {isPending && <button disabled>Adding Blog...</button>}
      </form>
    </div>
  );
};

export default Create;
