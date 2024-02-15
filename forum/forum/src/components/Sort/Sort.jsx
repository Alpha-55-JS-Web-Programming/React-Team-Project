import { useState } from "react";

export default function Sort({ onSortChange }) {
  const [sort, setSort] = useState('choose-sort'); // newest, most-liked, most-commented

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select onChange={handleSortChange} name="sort" id="sort" value={sort}>
      <option value="choose-sort">---</option>
        <option value="newest">newest</option>
        <option value="most-liked">most likes</option>
        <option value="most-commented">most comments</option>
      </select>
    </div>
  );
}