import React, { useEffect } from 'react';

function Menu({ setCategory, activeCategory }) {
  const categories = ['General', 'Business', 'Entertainment', 'Health', 'Science', 'Sports', 'Technology'];

  useEffect(() => {
    setCategory('General');
    localStorage.setItem('activeCategory', 'General');
  }, [setCategory]);

  const handleButtonClick = (category) => {
    setCategory(category);
    localStorage.setItem('activeCategory', category);
  };

  return (
    <div className="Menu">
      {categories.map((category, index) => (
        <button
          key={index}
          onClick={() => handleButtonClick(category)}
          className={category === activeCategory ? 'active' : ''}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Menu;
