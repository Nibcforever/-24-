import React, { useMemo } from 'react';
import type { Verse } from '../types';
import { ChevronLeftIcon, ChevronRightIcon, EyeIcon, EyeOffIcon, XIcon } from './icons';

interface VerseModalProps {
  verse: Verse;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  isPartialHide: boolean;
  onTogglePartialHide: () => void;
}

const partiallyHideText = (text: string): string => {
  return text
    .split(' ')
    .map((word, index) => {
      if (index % 2 === 1 && word.length > 1) {
        // Replace Hangul/alphanumeric characters with a full-width underscore
        return word.replace(/[가-힣a-zA-Z0-9]/g, '＿');
      }
      return word;
    })
    .join(' ');
};

const VerseModal: React.FC<VerseModalProps> = ({
  verse,
  onClose,
  onNext,
  onPrev,
  isPartialHide,
  onTogglePartialHide,
}) => {
  const displayText = useMemo(() => {
    return isPartialHide ? partiallyHideText(verse.text) : verse.text;
  }, [isPartialHide, verse.text]);

  return (
    <div className="fixed inset-0 bg-grape-darkest bg-opacity-90 backdrop-blur-sm flex justify-center items-center p-4 animate-fade-in">
      <div className="relative bg-grape-dark border border-grape rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 sm:p-8 flex-grow overflow-y-auto">
          <h2 className="text-3xl font-bold text-leaf-green-light mb-4">{verse.reference}</h2>
          <p className="text-gray-200 text-xl sm:text-2xl leading-relaxed whitespace-pre-wrap">
            {displayText}
          </p>
        </div>
        
        <div className="flex-shrink-0 bg-grape-dark/50 border-t border-grape p-4 flex justify-between items-center rounded-b-xl">
          <button
            onClick={onPrev}
            className="p-3 rounded-full text-gray-300 hover:bg-grape hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-leaf-green-light"
            aria-label="Previous Verse"
          >
            <ChevronLeftIcon />
          </button>
          
          <button
            onClick={onTogglePartialHide}
            className="p-3 rounded-full text-gray-300 hover:bg-grape hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-leaf-green-light"
            aria-label={isPartialHide ? "Show full text" : "Partially hide text"}
          >
            {isPartialHide ? <EyeIcon /> : <EyeOffIcon />}
          </button>
          
          <button
            onClick={onNext}
            className="p-3 rounded-full text-gray-300 hover:bg-grape hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-leaf-green-light"
            aria-label="Next Verse"
          >
            <ChevronRightIcon />
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:bg-grape hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-leaf-green-light"
          aria-label="Close"
        >
          <XIcon />
        </button>
      </div>
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VerseModal;
