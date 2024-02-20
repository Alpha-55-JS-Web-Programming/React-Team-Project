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
                <option value="food">Nutrition and Diet</option>
                <option value="exercise">Physical Fitness</option>
                <option value="rest">Mental Well-being</option>
                <option value="mental-health">Lifestyle and Habits</option>
                <option value="mental-health">Holistic Health</option>
            </select>
        </div>
    );
}