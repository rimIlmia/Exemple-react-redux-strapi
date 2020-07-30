import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../store/books";

const Books = (props) => {
  const dispatch = useDispatch();
  const books = useSelector((state) => state.books.collection);
  const booksAreLoading = useSelector((state) => state.books.isLoading);
  const [currentFilter, setCurrentFilter] = useState("");

  useEffect(() => {
    dispatch(getBooks());
  }, []);

  if (booksAreLoading)
    return <span className="f1 font-bold text-green">Fetching books...</span>;

  const handleFilter = (event) => {
    dispatch(getBooks(event.target.value));
    setCurrentFilter(event.target.value);
  };

  return (
    <section>
      <header>
        <select value={currentFilter} onChange={handleFilter}>
          <option value={""}>Tous</option>
          <option value={"?_sort=titre:ASC"}>Titre alphabetique</option>
          <option value={"?_sort=created_at:ASC"}>Date de création</option>
          <option value={"?dispo=false"}>Livre(s) disponible(s)</option>
        </select>
      </header>

      <ul className="flex flex-col">
        {books && books.length > 0 ? (
          books.map((book) => {
            const date = new Date(book.created_at);

            return (
              <li className="" key={book.id}>
                <div className="p-4">
                  <span className="font-bold uppercases f4">{book.titre}</span>
                  <p className="lh-4">{book.resume}</p>
                  <span className="text-blue font-bold">{`Date d'ajout : ${date.toLocaleDateString(
                    "fr-FR"
                  )}`}</span>
                </div>
                <hr className="m-0" />
              </li>
            );
          })
        ) : (
          <span>No books</span>
        )}
      </ul>
    </section>
  );
};

export default Books;
