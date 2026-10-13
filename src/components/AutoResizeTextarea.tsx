import React, { useRef, useEffect, useImperativeHandle } from 'react';

export interface AutoResizeTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  minRows?: number;
  minHeight?: number;
}

/**
 * AutoResizeTextarea:
 * A textarea that automatically expands its height to display 100% of its content
 * without internal vertical scrollbars, while remaining aesthetically aligned in grid layouts.
 */
export const AutoResizeTextarea = React.forwardRef<HTMLTextAreaElement, AutoResizeTextareaProps>(
  ({ value, onChange, minRows = 3, minHeight, className = '', style, ...props }, ref) => {
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    useImperativeHandle(ref, () => internalRef.current as HTMLTextAreaElement);

    const adjustHeight = () => {
      const textarea = internalRef.current;
      if (!textarea) return;

      // Temporarily collapse height to accurately calculate scrollHeight
      textarea.style.height = 'auto';
      const scrollHeight = textarea.scrollHeight;

      // Default line height estimate: ~20px per row + ~18px padding
      const defaultMin = minHeight || Math.max(minRows * 20 + 16, 56);
      const newHeight = Math.max(scrollHeight, defaultMin);

      textarea.style.height = `${newHeight}px`;
    };

    useEffect(() => {
      adjustHeight();
    }, [value]);

    useEffect(() => {
      // Re-adjust after DOM layout renders, fonts load, and on window resize
      adjustHeight();
      const timer = setTimeout(adjustHeight, 50);

      window.addEventListener('resize', adjustHeight);
      return () => {
        clearTimeout(timer);
        window.removeEventListener('resize', adjustHeight);
      };
    }, []);

    return (
      <textarea
        ref={internalRef}
        value={value}
        onChange={(e) => {
          adjustHeight();
          onChange?.(e);
        }}
        style={{
          overflow: 'hidden',
          resize: 'none',
          boxSizing: 'border-box',
          ...style,
        }}
        className={className}
        {...props}
      />
    );
  }
);

AutoResizeTextarea.displayName = 'AutoResizeTextarea';
