import { useEffect, useState } from "react";
import "./AutoComplete.css";

interface Props {
  searchValue: string;
  onChangeSearchValue: (value: string) => void;
  suggestions: any;
}
function AutoComplete({
  searchValue,
  onChangeSearchValue,
  suggestions,
}: Props) {
  useEffect(() => {
    let list = [...suggestions];
    if (searchValue) {
      list = list.filter((item) => item.includes(searchValue));
    } else list = [];
    setMatchedSuggestions(list);
  }, [searchValue]);

  const [matchedSuggestions, setMatchedSuggestions] = useState(suggestions);
  return (
    <div className="AutoComplete">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => onChangeSearchValue(e.currentTarget.value)}
      />
      {matchedSuggestions.length ? (
        <ul className="search-suggestions">
          {matchedSuggestions.map((suggestion: string, index: number) => (
            <li
              key={index}
              onClick={() => onChangeSearchValue(suggestion)}
              dangerouslySetInnerHTML={{
                __html: suggestion.replace(
                  searchValue,
                  `<b>${searchValue}</b>`
                ),
              }}
            />
          ))}
        </ul>
      ) : null}
      {!matchedSuggestions.length && searchValue ? (
        <label className="search-message">No matching results</label>
      ) : null}
    </div>
  );
}

export { AutoComplete };
