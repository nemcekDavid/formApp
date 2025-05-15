'use client';

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  rows?: number;
};

const Textarea: React.FC<TextareaProps> = ({
  value,
  onChange,
  placeholder = '',
  className = '',
  rows = 4,
}) => {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={rows}
      className={`w-full p-2 border rounded resize-none ${className}`}
    />
  );
};

export default Textarea;
