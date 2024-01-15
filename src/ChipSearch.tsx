import React, { useState, useEffect, useRef } from 'react';
import './App.css';

interface Chip {
  id: number;
  label: string;
}

const ChipSearch: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>('');
  const [items, setItems] = useState<string[]>([
    'John Doe',
    'Jane Smith',
    'Nick Giannopoulos',
    'Mary Johnson',
    'Robert Williams',
    'Emily Davis',
    'Olivia Taylor',
    'David Anderson',
    'Sophia Wilson',
    'Daniel Jackson',
    'Emma Anderson',
    'Michael Thompson',
  ]);
  const [chips, setChips] = useState<Chip[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chips]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleItemClick = (item: string) => {
    setChips((prevChips) => [...prevChips, { id: Date.now(), label: item }]);
    setItems((prevItems) => prevItems.filter((i) => i !== item));
    setInputValue('');
  };

  const handleChipRemove = (chip: Chip) => {
    setChips((prevChips) => prevChips.filter((c) => c.id !== chip.id));
    setItems((prevItems) => [...prevItems, chip.label]);
  };

  return (
    <div className="container p-4">
      <div className="flex flex-wrap">
        {chips.map((chip) => (
          <div key={chip.id} className="chip">
            <span className="chip-label">{chip.label}</span>
            <span className="chip-remove" onClick={() => handleChipRemove(chip)}>
              X
            </span>
          </div>
        ))}
        <div className="relative mt-4">
          <input
            ref={inputRef}
            type="text"
            className="input-field"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Type to filter..."
          />
          <ul className="mt-2 absolute w-full bg-white border rounded">
            {items
              .filter((item) => item.toLowerCase().includes(inputValue.toLowerCase()))
              .map((item) => (
                <li
                  key={item}
                  className="cursor-pointer p-2"
                  onClick={() => handleItemClick(item)}
                >
                  {item}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ChipSearch;
