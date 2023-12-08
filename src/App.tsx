import { useEffect, useState } from "react";
import { List } from "./components/List";
import "./App.css";

interface IPost {
  content: string;
  id: string;
}

export const App = () => {
  const [post, setPost] = useState<IPost[]>([]);
  const [form, setForm] = useState({
    content: "",
  });

  const url = "http://localhost:7070/notes";

  const getAllPosts = async () => {
    const response = await fetch(url, {
      method: "GET",
    });

    const result = await response.json();

    setPost(result);
  };

  const createPost = async (content: any) => {
    const post = {
      content,
    };

    await fetch(url, {
      method: "POST",
      body: JSON.stringify(post),
    });

    getAllPosts();
  };

  const deletePost = async (id: string) => {
    await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    getAllPosts();
  };

  const loadData = () => {
    getAllPosts();
  };

  useEffect(loadData, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onAddHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    createPost(target.closest("form").querySelector("input").value);
    setForm({ content: "" });
  };

  const onDeleteHandler = (e: any) => {
    e.preventDefault();
    const target = e.target;
    deletePost(target.closest("li").id);
  };

  const onRefreshHandler = (e: { target: any }) => {
    getAllPosts();
  };

  return (
    <div className="container">
      <div className="title">
        <h1 className="title-text">Notes</h1>
        <button className="title-button" onClick={onRefreshHandler}></button>
      </div>
      <List items={post} onClick={onDeleteHandler} />
      <form>
        <div>New Note </div>
        <input
          type="text"
          value={form.content}
          onChange={handleInput}
          name="content"
        />
        <button className="add-button" onClick={onAddHandler}></button>
      </form>
    </div>
  );
};
