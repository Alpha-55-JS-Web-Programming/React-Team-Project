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
                <option value="nutrition-and-diet">Nutrition and Diet</option>
                <option value="physical-fitness">Physical Fitness</option>
                <option value="mental-well-being">Mental Well-being</option>
                <option value="lifestyle-and-habits">Lifestyle and Habits</option>
                <option value="holistic-health">Holistic Health</option>
            </select>
        </div>
    );
}