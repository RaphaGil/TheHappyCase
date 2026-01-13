import { useState } from 'react';

/**
 * Hook to manage cart item notes
 */
export const useCartNotes = (updateItemNote) => {
  const [openNoteIndex, setOpenNoteIndex] = useState(null);
  const [noteTexts, setNoteTexts] = useState({});

  const handleNoteChange = (index, value) => {
    setNoteTexts({ ...noteTexts, [index]: value });
  };

  const handleSaveNote = (index) => {
    updateItemNote(index, noteTexts[index] || "");
    setOpenNoteIndex(null);
  };

  return {
    openNoteIndex,
    setOpenNoteIndex,
    noteTexts,
    setNoteTexts,
    handleNoteChange,
    handleSaveNote,
  };
};
