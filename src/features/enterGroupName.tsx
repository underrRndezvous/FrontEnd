import React, { useState } from "react";
import Input from "@/shared/ui/Input";

interface EnterGroupNameProps {
  value: string;
  onChange: (name: string) => void;
}

const EnterGroupName = ({ value, onChange }: EnterGroupNameProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="w-full max-w-sm px-6">
      <Input
        type="text"
        placeholder="모임 이름"
        value={value}
        onChange={handleChange}
        maxLength={20}
      />
    </div>
  );
};

export default EnterGroupName;
