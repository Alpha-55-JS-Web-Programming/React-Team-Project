import React, { useState } from 'react';
import './SortTags.css';

export default function SortTags({ onSortChange }) {
    const [tag, setTag] = useState('');

    const handleTagChange = (e) => {
        const selectedTag = e.target.value;
        setTag(selectedTag);
        onSortChange(selectedTag);
    };

    return (
        <div className="sort-container">
            <select className="sort-select" onChange={handleTagChange} name="tag" id="tag" value={tag}>
                <option value="">Choose a tag:</option>
                <option value="food">Food</option>
                <option value="fitness">Fitness</option>
                <option value="anti-stress">Anti-stress tips</option>
            </select>
        </div>
    );
}