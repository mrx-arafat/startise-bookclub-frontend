import React, { useState, useEffect } from "react";
import axios from "axios";

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    // Fetch books from your API
    axios
      .get("http://localhost:3000/api/books")
      .then((response) => {
        if (response.data.success) {
          setBooks(response.data.data);
        }
      })
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Book Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded-lg shadow">
            <h2 className="text-xl font-semibold">{book.title}</h2>
            <p className="text-gray-600">{book.author}</p>
            <p className="mt-2">
              <span
                className={`px-2 py-1 rounded-full text-sm ${
                  book.status === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {book.status}
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Books;
