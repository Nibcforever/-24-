import React from 'react';
import type { Verse } from '../types';

interface VerseListProps {
  verses: Verse[];
  onSelectVerse: (index: number) => void;
}

const VerseList: React.FC<VerseListProps> = ({ verses, onSelectVerse }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {verses.map((verse, index) => (
        <button
          key={verse.reference}
          onClick={() => onSelectVerse(index)}
          className="bg-grape-dark text-grape-light p-4 rounded-lg shadow-lg hover:bg-grape hover:text-white transition-all duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-leaf-green-light"
        >
          <span className="font-semibold text-lg">{verse.reference}</span>
        </button>
      ))}
    </div>
  );
};

export default VerseList;
