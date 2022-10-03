import "./App.css";
import React, { useState } from "react";
import { AutoComplete } from "./components/AutoComplete/AutoComplete";

interface IProduct {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const onChangeSearchValue = async (value: string) => {
    setSearchValue(value);
    const results = await getResults(value);
    setSuggestions(results);
  };

  const getResults = async (value: string) => {
    const results = await fetch(
      `https://dummyjson.com/products/search?q=${value}`
    ).then((res) => res.json());
    return results?.products?.map((item: IProduct) => item.title);
  };

  return (
    <div className="App">
      <header>
        <h1>Auto Complete Component Demo</h1>
      </header>
      <main>
        <AutoComplete
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          suggestions={suggestions}
        />
      </main>
    </div>
  );
}

export default App;
