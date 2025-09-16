import React, { useState, useCallback } from 'react';
import { verses } from './constants/verses';
import { logoImageDataUrl } from './constants/assets';
import type { Verse } from './types';
import VerseList from './components/VerseList';
import VerseModal from './components/VerseModal';

function App() {
  const [currentVerseIndex, setCurrentVerseIndex] = useState<number | null>(null);
  const [isPartialHide, setIsPartialHide] = useState<boolean>(false);

  const handleSelectVerse = useCallback((index: number) => {
    setCurrentVerseIndex(index);
  }, []);

  const handleCloseVerse = useCallback(() => {
    setCurrentVerseIndex(null);
  }, []);

  const handleNextVerse = useCallback(() => {
    setCurrentVerseIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      return (prevIndex + 1) % verses.length;
    });
  }, []);

  const handlePrevVerse = useCallback(() => {
    setCurrentVerseIndex((prevIndex) => {
      if (prevIndex === null) return verses.length - 1;
      return (prevIndex - 1 + verses.length) % verses.length;
    });
  }, []);

  const togglePartialHide = useCallback(() => {
    setIsPartialHide(prev => !prev);
  }, []);

  const selectedVerse = currentVerseIndex !== null ? verses[currentVerseIndex] : null;

  return (
    <div className="bg-grape-darkest text-gray-200 min-h-screen font-sans">
      <header className="text-center py-6 flex flex-col items-center">
        <img src={logoImageDataUrl} alt="Dong-Navigator Logo" className="w-24 h-24 mb-4" />
        <h1 className="text-4xl font-bold text-leaf-green-light">동비게이토 24구절</h1>
        <p className="text-grape-light mt-2">카르포스 말씀 암송 도우미</p>
      </header>
      <main className="container mx-auto px-4 pb-8">
        {selectedVerse === null ? (
          <VerseList verses={verses} onSelectVerse={handleSelectVerse} />
        ) : (
          <VerseModal
            verse={selectedVerse}
            onClose={handleCloseVerse}
            onNext={handleNextVerse}
            onPrev={handlePrevVerse}
            isPartialHide={isPartialHide}
            onTogglePartialHide={togglePartialHide}
          />
        )}
      </main>
    </div>
  );
}

export default App;