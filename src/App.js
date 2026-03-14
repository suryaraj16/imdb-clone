import React, { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchPosts = async () => {
    setLoading(true);

    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=8&_page=${page}`
    );

    const data = await res.json();

    setPosts((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, [page]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition duration-500">

        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Search Results
          </h1>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Toggle Mode
          </button>
        </div>

        {/* Cards */}
        <div className="grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 hover:shadow-xl hover:scale-105 transition duration-300"
            >
              <h3 className="font-semibold text-lg text-gray-800 dark:text-white">
                {post.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mt-2">
                {post.body}
              </p>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center pb-10">
          <button
            onClick={() => setPage(page + 1)}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition shadow-lg"
          >
            Load More
          </button>
        </div>

        {loading && (
          <p className="text-center text-gray-700 dark:text-gray-200 pb-5">
            Loading...
          </p>
        )}

      </div>
    </div>
  );
}

export default App;
