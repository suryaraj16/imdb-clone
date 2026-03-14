import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
    );
    const data = await res.json();

    setPosts((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Search Results</h2>

      {posts.map((post) => (
        <div key={post.id} style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}>
          <h4>{post.title}</h4>
          <p>{post.body}</p>
        </div>
      ))}

      {loading && <p>Loading...</p>}

      <button onClick={() => setPage(page + 1)}>Load More</button>
    </div>
  );
}

export default App;
