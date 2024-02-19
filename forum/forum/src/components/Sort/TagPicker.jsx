import React, { useState } from 'react';
import './TagPicker.css';

export default function TagPicker({ onTagChange }) {
    const [tag, setTag] = useState('');

    const handleTagChange = (e) => {
        const selectedTag = e.target.value;
        setTag(selectedTag);
        onTagChange(selectedTag);
    };

    return (
        <div className="tag-container">
            <select className="tag-select" onChange={handleTagChange} name="tag" id="tag" value={tag}>
                <option value="">Choose a tag:</option>
                <option value="food">Food</option>
                <option value="fitness">Fitness</option>
                <option value="anti-stress">Anti-stress tips</option>
            </select>
        </div>
    );
}