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
          <div className="text-xs text-gray-500 mb-2 font-light font-inter">
            Add a note for this item:
          </div>
          <textarea
            value={noteTexts[index] !== undefined ? noteTexts[index] : (item.note || '')}
            onChange={(e) => onNoteChange(index, e.target.value)}
            placeholder="Add any special instructions or notes..."
            className="w-full px-3 py-2 text-xs border border-gray-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400 font-light resize-none font-inter"
            rows="3"
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              onClick={onCancelNote}
              className="px-3 py-1 text-xs uppercase tracking-wider text-gray-600 hover:text-gray-900 font-light transition-colors font-inter"
            >
              Cancel
            </button>
            <button
              onClick={() => onSaveNote(index)}
              className="px-3 py-1 text-xs uppercase tracking-wider font-light font-inter bg-btn-primary hover:bg-btn-primary-hover text-btn-primary-text border border-btn-primary-border hover:border-btn-primary-hover transition-all duration-200"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Display saved note if exists and dropdown is closed */}
      {hasNote && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="text-xs text-gray-500 mb-1 font-light font-inter">
            Note:
          </div>
          <div className="text-xs text-gray-700 font-light whitespace-pre-wrap font-inter">
            {item.note}
          </div>
        </div>
      )}

      {/* Add Note Button */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <button 
          onClick={() => onToggleNote(index)} 
          className="text-xs text-gray-500 hover:text-gray-900 uppercase tracking-wider font-light transition-colors flex items-center gap-1 font-inter"
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

