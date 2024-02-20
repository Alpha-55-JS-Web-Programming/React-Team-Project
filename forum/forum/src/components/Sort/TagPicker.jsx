import React, { useState, useEffect } from 'react';
import './TagPicker.css';

export default function TagPicker({ onTagChange, selectedTag }) {
    const [tag, setTag] = useState('');

    // Update to useEffect to synchronize tag state with prop
    useEffect(() => {
        setTag(selectedTag);
    }, [selectedTag]);

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