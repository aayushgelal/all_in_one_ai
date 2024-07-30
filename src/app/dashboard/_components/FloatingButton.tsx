// components/AiSuggestions.js
import { useEffect, useState } from 'react';

const emailIdeas = [
  "10 Essential Time Management Tips for Busy Professionals",
  "The Impact of Artificial Intelligence on Modern Business",
  "Sustainable Living: Small Changes, Big Impact",
  "Mastering the Art of Networking in a Digital Age",
  "Mindfulness Techniques to Boost Creativity and Productivity"
];

const AiSuggestions = ({ onSelectIdea }:{onSelectIdea:(idea:string) => void }) => {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleSuggestions = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative bg-red-500">
      <button
        className={`fixed bottom-4 right-4 w-12 h-12 rounded-full bg-blue-500 text-white shadow-lg transition-all duration-300 ${
          isOpen ? 'rotate-45' : ''
        }`}
        onClick={toggleSuggestions}
      >
        AI
      </button>
        <div className={`absolute z-10 bottom-2 right-4 bg-white border border-gray-200 rounded-md shadow-lg p-2 w-64 opacity-100 transform translate-y-0 transition-all duration-300 ease-in-out ${isOpen 
            ? 'opacity-100 translate-0 visible' 
            : 'opacity-0 -translate-y-4 invisible'}`}>
          {emailIdeas.map((idea, index) => (
            <button
              key={index}
              onClick={() => onSelectIdea(idea)}
              className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 transition-colors duration-200"
            >
              {idea}
            </button>
          ))}
        </div>
      
    </div>
  );
};

export default AiSuggestions;