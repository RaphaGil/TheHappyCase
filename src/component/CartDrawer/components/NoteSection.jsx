import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";

const NoteSection = ({ 
  item, 
  index, 
  openNoteIndex, 
  noteTexts, 
  onToggleNote, 
  onNoteChange, 
  onSaveNote, 
  onCancelNote 
}) => {
  const isOpen = openNoteIndex === index;
  const hasNote = item.note && !isOpen;

  return (
    <>
      {/* Note Dropdown */}
      {isOpen && (
        <div className="mt-3 pt-3 ">
          <div className="text-xs text-gray-500 mb-2 font-normal font-inter">
            Add a note for this item:
          </div>
          <textarea
            value={noteTexts[index] !== undefined ? noteTexts[index] : (item.note || '')}
            onChange={(e) => onNoteChange(index, e.target.value)}
            placeholder="Add any special instructions or notes..."
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 font-normal resize-none font-inter"
            rows="3"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onCancelNote}
              className="px-3 py-1 text-xs text-gray-600 hover:text-gray-900 font-normal transition-colors font-inter"
            >
              Cancel
            </button>
            <button
              onClick={() => onSaveNote(index)}
              className="btn-happy px-3 py-1 text-xs font-inter"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Display saved note if exists and dropdown is closed */}
      {hasNote && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1 font-normal font-inter">
            Note:
          </div>
          <div className="text-xs text-gray-700 font-normal whitespace-pre-wrap font-inter">
            {item.note}
          </div>
        </div>
      )}

      {/* Add Note Button */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={() => onToggleNote(index)} 
          className="text-xs text-btn-primary-blue hover:text-btn-primary-blue-hover font-normal transition-colors flex items-center gap-1 font-inter"
        >
          {item.note ? 'Edit Note' : 'Add Note'}
          <FontAwesomeIcon 
            icon={isOpen ? faChevronUp : faChevronDown} 
            className="text-xs" 
          />
        </button>
      </div>
    </>
  );
};

export default NoteSection;

