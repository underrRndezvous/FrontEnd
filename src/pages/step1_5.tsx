import React, { useEffect, useState, useMemo } from "react";
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

  useEffect(() => {
    if (startPoint.length === 0) {
      const defaultStartPoint = {
        id: Date.now(),
        type: "leader" as const,
        first: "",
        second: "",
        third: "",
      };
      setStartPoint([defaultStartPoint]);
    }
  }, [startPoint.length, setStartPoint]);

  useEffect(() => {
    const initialDisplayValues: { [id: number]: string } = {};
    startPoint.forEach((sp) => {
      const combined = [sp.first, sp.second, sp.third]
        .filter((part) => part && part.trim() !== "")
        .join(" ");
      if (combined) {
        initialDisplayValues[sp.id || 0] = combined;
      }
    });

    if (Object.keys(initialDisplayValues).length > 0) {
      setDisplayValues(initialDisplayValues);
    }
  }, []);

  const departures: Departure[] = useMemo(
    () =>
      startPoint.map((sp, index) => ({
        id: sp.id || Date.now() + index,
        type: index === 0 ? "leader" : "member",
        value: displayValues[sp.id || 0] || "",
      })),
    [startPoint, displayValues]
  );

  useEffect(() => {
    const newDisplayValues: { [id: number]: string } = {};
    startPoint.forEach((sp) => {
      const combined = [sp.first, sp.second, sp.third]
        .filter((part) => part && part.trim() !== "")
        .join(" ");
      newDisplayValues[sp.id || 0] = combined;
    });

    setDisplayValues((prev) => {
      const hasExistingValues = Object.keys(prev).length > 0;
      return hasExistingValues ? prev : newDisplayValues;
    });
  }, [startPoint]);

  const handleNext = () => {
    const newStartPoint = startPoint.map((sp) => {
      const displayValue = displayValues[sp.id || 0] || "";
      if (displayValue.trim()) {
        const parsed = parseAddress(displayValue);
        return { ...sp, ...parsed };
      }

      return { ...sp, first: "", second: "", third: "" };
    });

    const filteredStartPoint = newStartPoint.filter(
      (sp) => (displayValues[sp.id || 0] || "").trim() !== ""
    );

    setStartPoint(filteredStartPoint);

    navigate("/Plaza/step1_6");
  };

  const handlePrev = () => navigate(-1);

  const handleAdd = () => {
    if (startPoint.length >= 8) return;
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
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
        <div className="relative" style={{ minHeight: "400px" }}>
          <DepartureInputForm
            departures={departures}
            onAdd={handleAdd}
            onRemove={handleRemove}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        </div>
      </StepFormLayout>
    </AnimatedPageLayout>
  );
};

export default Step1_5Page;
