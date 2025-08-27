import React, { useEffect, useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";
import { useMeetingStore, type Departure } from "@/store/meetingStore";
import AnimatedPageLayout from "@/shared/layout";
import regionData from '@/shared/asset/json/region.json';

const Step1_5Page = () => {
  const navigate = useNavigate();
  const { startPoint, setStartPoint } = useMeetingStore();

  const [displayValues, setDisplayValues] = useState<{ [id: number]: string }>(
    {}
  );
  const inputRefs = useRef<{ [id: number]: HTMLInputElement | null }>({});

  useEffect(() => {
    if (startPoint.length === 0) {
      const newId = Date.now();
      const defaultStartPoint = {
        id: newId,
        type: "leader" as const,
        first: "서울시 ",
        second: "",
        third: "",
      };
      setStartPoint([defaultStartPoint]);
      setDisplayValues({ [newId]: "서울시 " });
    } else {
      // startPoint에 새로운 항목이 추가되었을 때만 displayValues 업데이트
      setDisplayValues((prev) => {
        const newDisplayValues = { ...prev };
        
        startPoint.forEach((sp) => {
          // 새로운 항목이거나 기존 값이 없는 경우만 업데이트
          if (!newDisplayValues.hasOwnProperty(sp.id || 0)) {
            const combined = [sp.first, sp.second, sp.third]
              .filter((part) => part && part.trim() !== "")
              .join(" ");
            newDisplayValues[sp.id || 0] = combined || "서울시 ";
          }
        });
        
        // 삭제된 항목 정리
        const validIds = new Set(startPoint.map(sp => sp.id || 0));
        Object.keys(newDisplayValues).forEach(id => {
          if (!validIds.has(Number(id))) {
            delete newDisplayValues[Number(id)];
          }
        });
        
        return newDisplayValues;
      });
    }
  }, [startPoint, setStartPoint]);


  const departures: Departure[] = useMemo(
    () =>
      startPoint.map((sp, index) => ({
        id: sp.id || Date.now() + index,
        type: index === 0 ? "leader" : "member",
        value: displayValues[sp.id || 0] || "",
      })),
    [startPoint, displayValues]
  );


  const validateAddress = (address: string): boolean => {
    if (!address || address.trim() === "") return false;
    
    // region.json에서 유효한 주소인지 확인
    const normalizedAddress = address.toLowerCase().trim();
    
    return regionData.some(region => {
      const fullAddress = `${region.sido} ${region.gu} ${region.dong}`.toLowerCase();
      return fullAddress === normalizedAddress;
    });
  };

  const handleNext = () => {
    // 모든 입력값이 유효한 지역인지 검증
    const invalidInputs = startPoint.filter(sp => {
      const displayValue = displayValues[sp.id || 0] || "";
      return displayValue.trim() && !validateAddress(displayValue.trim());
    });

    if (invalidInputs.length > 0) {
      alert("유효하지 않은 주소입니다.");
      
      // 첫 번째 유효하지 않은 입력창에 포커스
      const firstInvalidId = invalidInputs[0].id || 0;
      const inputElement = inputRefs.current[firstInvalidId];
      if (inputElement) {
        inputElement.focus();
        inputElement.select(); // 텍스트도 선택하여 바로 수정 가능하게
      }
      return;
    }

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
      first: "서울시 ",
      second: "",
      third: "",
    };
    setStartPoint([...startPoint, newStartPoint]);
    // displayValues는 useEffect에서 자동으로 설정됨
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
            inputRefs={inputRefs}
          />
        </div>
      </StepFormLayout>
    </AnimatedPageLayout>
  );
};

export default Step1_5Page;
