import React from "react";
import { BookOpen, User, Calendar } from "lucide-react";

const BookGrid = ({ books }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <div
          key={book._id}
          className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
        >
          {/* Book Cover Image Placeholder */}
          <div className="h-48 bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-white opacity-75" />
          </div>

          {/* Book Info */}
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                {book.title}
              </h3>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${
                  book.status === "available"
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {book.status}
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <User className="w-4 h-4 mr-2" />
                <span className="text-sm">{book.author}</span>
              </div>

              <div className="flex items-center text-gray-600">
                <Calendar className="w-4 h-4 mr-2" />
                <span className="text-sm">
                  Added {new Date(book.createdAt).toLocaleDateString()}
                </span>
              </div>

              {book.category && (
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                  {book.category}
                </span>
              )}
            </div>

            {/* Action Button */}
            {book.status === "available" && (
              <button
                className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg 
                          transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                <span>Borrow Book</span>
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookGrid;
