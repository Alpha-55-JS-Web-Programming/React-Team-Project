import { useState } from "react";
import './Sort.css';

export default function Sort({ onSortChange }) {
  const [sort, setSort] = useState('choose-sort'); // newest, most-liked, most-commented

  const handleSortChange = (e) => {
    const selectedSort = e.target.value;
    setSort(selectedSort);
    onSortChange(selectedSort);
  };

  return (
    <div className="sort-container">
      <select className="sort-select" onChange={handleSortChange} name="sort" id="sort" value={sort}>
        <option value="choose-sort">Sort by:</option>
        <option value="newest">Newest</option>
        <option value="most-liked">Most Likes</option>
        <option value="most-commented">Most Comments</option>
      </select>
    </div>
  );
}