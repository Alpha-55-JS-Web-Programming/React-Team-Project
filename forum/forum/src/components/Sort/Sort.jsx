import { useState } from "react";


export function Sort() {
    const [sort, setSort] = useState('newest');// newest, most-liked, most-commented

  return (
    <div>
      <label htmlFor="sort">Sort by: </label>
      <select onChange={e => {setSort(e.target.value)} } name="sort" id="sort">
        <option value="newest"  >newest</option>
        <option value="most-liked" >most likes</option>
        <option value="most-commented" >most comments</option>
      </select>
    </div>
  );
}