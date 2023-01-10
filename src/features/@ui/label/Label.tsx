import React from 'react';

export default function Label({text, size="16px", className, styles}: LabelProps) {
  return (
    <span className={className} style={{
        fontSize: size,
        ...styles,
      }}>
      {
        text
      }
    </span>
  );
}

export interface LabelProps {
  text: string;
  size?: string;
  className?: any;
  styles?: any;
}
