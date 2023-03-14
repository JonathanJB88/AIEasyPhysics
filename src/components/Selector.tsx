import { useEffect, useState } from 'react';

export const GRADES = [
  { label: '1º', value: '1er año de educación secundaria' },
  { label: '2º', value: '2do año de educación secundaria' },
  { label: '3º', value: '3er año de educación secundaria' },
  { label: '4º', value: '4to año de educación secundaria' },
  { label: '5º', value: '5to año de educación secundaria' },
];

export const INIT_STATE = 'educación secundaria';

interface Props {
  onSelection: (selectedOption: string) => void;
}

export const Selector = ({ onSelection }: Props) => {
  const [selectedOption, setSelectedOption] = useState<string>(INIT_STATE);

  useEffect(() => {
    if (selectedOption) {
      onSelection(selectedOption);
    }
  }, [selectedOption]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <select
        id='select-option'
        value={selectedOption}
        onChange={handleChange}
        className='px-4 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:outline-none focus:border-purple-500'
      >
        {GRADES.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};
