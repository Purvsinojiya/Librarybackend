import React from "react";
import BookCard from "./Card";
import data from "./BOOKDATA";

function showBooks(entry) {
  return (
    <div className="flex-container p-2 mt-5">
      <BookCard imageURL={entry.imageURL} title={entry.title} />
    </div>
  );
}

function IssueBook() {
  return (
    <div>
      <div className="center flex flex-wrap items-center justify-center ">
        {data.map(showBooks)}
      </div>
    </div>
  );
}

export default IssueBook;
