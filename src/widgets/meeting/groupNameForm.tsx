import React from "react";
import hiImage from "@/shared/asset/images/hi.png";
import EnterGroupName from "@/features/enterGroupName";

interface GroupNameFormProps {
  groupName: string;
  onGroupNameChange: (name: string) => void;
}

const GroupNameForm = ({
  groupName,
  onGroupNameChange,
}: GroupNameFormProps) => {
  return (
    <div className="flex flex-col">
      <h1 className="title-02 mb-16 text-black text-center">
        모임 이름은 무엇인가요?
      </h1>
      <img src={hiImage} alt="캐릭터" className="mb-16 w-40 self-center" />
      <div className="w=full px-8">
        <p className="body-02 text-gray3 mb-2 text-left">
          모임 이름을 작성해주세요
        </p>
      </div>
      <EnterGroupName value={groupName} onChange={onGroupNameChange} />
    </div>
  );
};

export default GroupNameForm;
