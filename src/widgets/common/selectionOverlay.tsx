import { useState } from "react";
import SelectionGrid from "@/shared/ui/selection";
import type { SelectionOption } from "@/shared/ui/selection";
import Button from "@/shared/ui/Button";

const IconClose = () => (
  <svg
    className="h-6 w-6 stroke-current"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2.5}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

interface SelectionOverlayProps {
  title: string;
  buttonText: string;
  options: SelectionOption[];
  onConfirm: (selectedId: string) => void;
  onClose: () => void;
}

const SelectionOverlay = ({
  title,
  buttonText,
  options,
  onConfirm,
  onClose,
}: SelectionOverlayProps) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const handleConfirmClick = () => {
    if (selectedItem) {
      onConfirm(selectedItem);
    }
  };

  return (
    <div className="flex flex-col h-full relative">
      <button onClick={onClose} /* ... */>
        <IconClose />
      </button>
      <div className="text-center mt-12 mb-4">
        <h2 className="title-02 text-black">{title}</h2>
      </div>
      <div className="flex-1 flex items-center mb-8">
        <SelectionGrid
          options={options}
          selectedId={selectedItem}
          onSelect={setSelectedItem}
        />
      </div>
      <div className="px-4 mb-4">
        <Button
          format="Button1"
          color="primary"
          onClick={handleConfirmClick}
          disabled={!selectedItem}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default SelectionOverlay;
