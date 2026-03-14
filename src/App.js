import React, { useState, useEffect } from "react";
import Loader from "./components/Loader";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=8&_page=${page}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await res.json();

      setPosts((prev) => [...prev, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">Search Results</h1>

      {/* Error UI */}
      {error && (
        <div className="text-center text-red-500 mb-5">
          <p>{error}</p>
          <button
            onClick={fetchPosts}
            className="mt-3 px-4 py-2 bg-red-500 text-white rounded"
          >
            Retry
          </button>
        </div>
      )}

      {/* Empty State */}
      {!loading && posts.length === 0 && !error && (
        <p className="text-center text-gray-500">
          No results found
        </p>
      )}

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-xl p-5 hover:shadow-xl transition"
          >
            <h3 className="font-semibold">{post.title}</h3>
            <p className="text-gray-600 mt-2">{post.body}</p>
          </div>
        ))}
      </div>

      {/* Loader */}
      {loading && <Loader />}

      {/* Load More */}
      {!loading && posts.length > 0 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

