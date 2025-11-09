import React from 'react';
import type { FC } from 'react';

interface SpeakerIconProps {
  isLoading?: boolean;
  isPlaying?: boolean;
}

export const SpeakerIcon: FC<SpeakerIconProps> = ({ isLoading = false, isPlaying = false }) => {
  if (isLoading) {
    return (
      <svg className="animate-spin h-5 w-5 text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    );
  }

  if (isPlaying) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-400" viewBox="0 0 24 24" fill="currentColor">
            <path d="M6 6h12v12H6V6z"/>
        </svg>
    );
  }

  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-hover:text-slate-200 transition-colors" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"></path>
    </svg>
  );
};
