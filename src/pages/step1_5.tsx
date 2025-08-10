import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";
import { useMeetingStore } from "@/store/meetingStore";
import type { Departure } from "@/store/meetingStore";

const Step1_5Page = () => {
  const navigate = useNavigate();
  const { departures, setDepartures } = useMeetingStore();

  useEffect(() => {
    if (departures.length === 0) {
      setDepartures([
        { id: Date.now(), value: "", type: "leader" },
        { id: Date.now() + 1, value: "", type: "member" },
      ]);
    }
  }, [departures, setDepartures]);

  const handleNext = () => {
    navigate("/Plaza/step1_6");
  };
  const handlePrev = () => {
    navigate(-1);
  };

  const handleAdd = () => {
    if (departures.length >= 5) return;
    const newDeparture: Departure = {
      id: Date.now(),
      value: "",
      type: "member",
    };
    setDepartures([...departures, newDeparture]);
  };

  const handleRemove = (idToRemove: number) => {
    if (departures.length <= 1) return;
    setDepartures(departures.filter((dep) => dep.id !== idToRemove));
  };

  const handleChange = (id: number, newValue: string) => {
    setDepartures(
      departures.map((dep) =>
        dep.id === id ? { ...dep, value: newValue } : dep
      )
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
  ) => {
    if (e.key === "Enter") {
      const currentInput = departures.find((d) => d.id === id);
      const isLastInput = departures[departures.length - 1].id === id;
      if (
        currentInput?.type === "member" &&
        isLastInput &&
        currentInput.value !== ""
      ) {
        handleAdd();
      }
    }
  };

  const isNextDisabled =
    departures.filter((d) => d.value.trim() !== "").length === 0;

  return (
    <StepFormLayout
      title="출발지를 입력해주세요"
      subtitle="모임원의 출발지를 추가할 수 있어요"
      onNext={handleNext}
      onPrev={handlePrev}
      isNextDisabled={isNextDisabled}
      isScrollable={true}
      contentAlignment="start"
    >
      <DepartureInputForm
        departures={departures}
        setDepartures={setDepartures}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
    </StepFormLayout>
  );
};

export default Step1_5Page;
