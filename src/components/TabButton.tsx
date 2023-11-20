interface TabButtonProps {
  label: string;
  isActive: boolean;
  isDisabled: boolean;
  onClick: () => void;
}

export default function TabButton({ label, isActive, isDisabled, ...props }: TabButtonProps) {
  const activeStyle = isActive ? 'bg-slate-700' : '';
  const disabledStyle = isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-slate-600';

  return (
    <button
      className={`px-4 py-2 ${activeStyle} ${disabledStyle}`}
      onClick={isDisabled ? undefined : props.onClick}
    >
      {label}
    </button>
  );
}
