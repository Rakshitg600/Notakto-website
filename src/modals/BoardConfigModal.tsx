'use client'
import { useState } from 'react';
import { BoardConfigModalProps } from '../services/types';
import { BoardConfigButton } from '@/components/ui/BoardConfigButton';

const BoardConfigModal = ({
  visible,
  currentBoards,
  currentSize,
  onConfirm,
  onCancel
}: BoardConfigModalProps) => {
  const [selectedBoards, setSelectedBoards] = useState<any>(currentBoards);
  const [selectedSize, setSelectedSize] = useState<any>(currentSize);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-black p-6 w-[90%] max-w-xl text-center space-y-6">
        <h2 className="text-red-600 text-[35px] ">Number of Boards</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[1, 2, 3, 4, 5].map(num => (
            <BoardConfigButton
              key={num}
              label={num}
              isActive={selectedBoards === num}
              onClick={() => setSelectedBoards(num)}
            />
          ))}
        </div>

        <h2 className="text-red-600 text-[35px]">Board Size</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {[2, 3, 4, 5].map(size => (
            <BoardConfigButton
              key={size}
              label={`${size}x${size}`}
              isActive={selectedSize === size}
              onClick={() => setSelectedSize(size)}
            />
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <button
            onClick={onCancel}
            className="flex-1 py-3 bg-blue-600 text-white text-xl hover:bg-blue-700"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selectedBoards, selectedSize)}
            className="flex-1 py-3 bg-blue-600 text-white text-xl hover:bg-blue-700"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardConfigModal;

