"use client"

import React, { useState } from "react";
import { db, auth } from "../../firebase.config";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [savedQuotes, setSavedQuotes] = useState([]);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://type.fit/api/quotes");
      if (!response.ok) {
        throw new Error("Failed to fetch quote");
      }
      const quotes = await response.json();
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setQuote(randomQuote.text);
      setAuthor(randomQuote.author || "Unknown");
    } catch (error) {
      console.error("Error fetching quote:", error);
      // Handle error state or feedback to the user
    }
  };


  const saveQuote = async () => {
    try {
      await db.collection("savedQuotes").add({
        text: quote,
        author: author,
        createdAt: new Date()
      });
      // Update savedQuotes state with the new quote
      setSavedQuotes([...savedQuotes, { text: quote, author }]);
      // Clear the quote and author fields
      setQuote("");
      setAuthor("");
    } catch (error) {
      console.error("Error saving quote:", error);
      // Handle error state or feedback to the user
    }
  };
  
  

  return (
    <div className="max-w-md p-4 mx-auto space-y-4 bg-white shadow-md rounded-xl">
      <div>
        <p className="text-xl font-semibold text-cyan-700">{quote}</p>
        <p className="text-right text-cyan-500">{author}</p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={fetchQuote}
          className="px-4 py-2 text-white rounded-lg bg-cyan-500 hover:bg-cyan-700"
        >
          Generate Quote
        </button>
        <button
          onClick={saveQuote}
          className="px-4 py-2 text-white rounded-lg bg-cyan-500 hover:bg-cyan-700"
        >
          Save Quote
        </button>
      </div>
      <div>
        <h2 className="text-lg font-bold text-cyan-700">Saved Quotes</h2>
        <ul className="list-disc list-inside">
          {savedQuotes.map((q, index) => (
            <li key={index} className="text-cyan-600">
              &quot{q.text}&quot - {q.author}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
