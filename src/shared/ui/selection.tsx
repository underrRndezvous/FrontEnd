import React from "react";
import clsx from "clsx";

export interface SelectionOption {
  id: string;
  label: string;
  IconComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
}

interface SelectionProps {
  options: SelectionOption[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}

const Selection = ({ options, selectedId, onSelect }: SelectionProps) => {
  return (
    <div className="grid w-full grid-cols-2 gap-5 px-4">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => onSelect(option.id)}
          className={clsx(
            "flex flex-col items-center justify-center rounded-lg bg-white p-4 transition-all",
            selectedId === option.id ? "ring-2 ring-main" : "ring-1 ring-gray1"
          )}
        >
          <span className="body-02 text-gray3">{option.label}</span>
          <option.IconComponent className="mb-2 h-16 w-16" />
        </button>
      ))}
    </div>
  );
};

export default Selection;
