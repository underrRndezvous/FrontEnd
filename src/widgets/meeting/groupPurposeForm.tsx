import React from "react";
import Selection from "@/shared/ui/selection";
import type { SelectionOption } from "@/shared/ui/selection";

import IconLove from "@/shared/asset/icon/purposeLove.svg?react";
import IconBn from "@/shared/asset/icon/purposeBn.svg?react";
import IconStudy from "@/shared/asset/icon/purposeStudy.svg?react";
import IconFriend from "@/shared/asset/icon/purposeFriend.svg?react";

const purposeOptions: SelectionOption[] = [
  { id: "date", label: "데이트", IconComponent: IconLove },
  { id: "business", label: "비즈니스", IconComponent: IconBn },
  { id: "study", label: "스터디", IconComponent: IconStudy },
  { id: "social", label: "친목", IconComponent: IconFriend },
];

interface GroupPurposeFormProps {
  selectedPurpose: string | null;
  onPurposeSelect: (id: string) => void;
}

const GroupPurposeForm = ({
  selectedPurpose,
  onPurposeSelect,
}: GroupPurposeFormProps) => {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <Selection
        options={purposeOptions}
        selectedId={selectedPurpose}
        onSelect={onPurposeSelect}
      />
    </div>
  );
};

export default GroupPurposeForm;
