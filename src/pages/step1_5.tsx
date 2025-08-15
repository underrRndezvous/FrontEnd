import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";
import { useMeetingStore, type Departure } from "@/store/meetingStore";
import AnimatedPageLayout from "@/shared/layout";
const Step1_5Page = () => {
  const navigate = useNavigate();
  const { startPoint, setStartPoint } = useMeetingStore();

  const [displayValues, setDisplayValues] = useState<{ [id: number]: string }>(
    {}
  );

  const departures: Departure[] = startPoint.map((sp, index) => ({
    id: sp.id || Date.now() + index,
    type: index === 0 ? "leader" : "member",
    value: displayValues[sp.id || 0] || "",
  }));
  useEffect(() => {
    const newDisplayValues: { [id: number]: string } = {};
    startPoint.forEach((sp) => {
      const combined = [sp.first, sp.second, sp.third]
        .filter((part) => part && part.trim() !== "")
        .join(" ");
      newDisplayValues[sp.id || 0] = combined;
    });
    setDisplayValues(newDisplayValues);
  }, []);
  const handleNext = () => {
    console.log("=== BEFORE CONVERSION ===");
    console.log("Current startPoint:", startPoint);
    console.log("Current displayValues:", displayValues);

    const newStartPoint = startPoint.map((sp) => {
      const displayValue = displayValues[sp.id || 0] || "";
      console.log(`Processing ID ${sp.id}: "${displayValue}"`);

      if (displayValue.trim()) {
        const parsed = parseAddress(displayValue);
        console.log(
          `Parsed: first:"${parsed.first}", second:"${parsed.second}", third:"${parsed.third}"`
        );
        return { ...sp, ...parsed };
      }
      return sp;
    });

    console.log("=== AFTER CONVERSION ===");
    console.log("New startPoint:", newStartPoint);

    setStartPoint(newStartPoint);

    setTimeout(() => {
      console.log("=== FINAL STORE STATE ===");
      console.log("Store startPoint:", useMeetingStore.getState().startPoint);
    }, 100);

    navigate("/Plaza/step1_6");
  };
  const handlePrev = () => navigate(-1);

  const handleAdd = () => {
    if (startPoint.length >= 5) return;
    const newId = Date.now();
    const newStartPoint = {
      id: newId,
      type: "member" as const,
      first: "",
      second: "",
      third: "",
    };
    setStartPoint([...startPoint, newStartPoint]);
  };
  const handleRemove = (id: number) => {
    if (startPoint.length <= 1) return;
    setStartPoint(startPoint.filter((sp) => (sp.id || 0) !== id));
  };

  const parseAddress = (address: string) => {
    if (!address || address.trim() === "") {
      return { first: "", second: "", third: "" };
    }

    const parts = address.trim().split(/\s+/);
    return {
      first: parts[0] || "",
      second: parts[1] || "",
      third: parts.slice(2).join(" ") || "",
    };
  };

  const handleChange = (id: number, newValue: string) => {
    setDisplayValues((prev) => ({ ...prev, [id]: newValue }));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    _id: number
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // const currentDeparture = departures.find((d) => d.id === id);
      // const isLastInput = departures[departures.length - 1].id === id;

      // if (
      //   currentDeparture?.type === "member" &&
      //   isLastInput &&
      //   currentDeparture.value.trim() !== ""
      // ) {
      //   handleAdd();
      // }
    }
  };

  const isNextDisabled =
    departures.filter((d) => d.value.trim() !== "").length === 0;


  return (
    <AnimatedPageLayout>
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
          onAdd={handleAdd}
          onRemove={handleRemove}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </StepFormLayout>
    </AnimatedPageLayout>
  );
};

export default Step1_5Page;
