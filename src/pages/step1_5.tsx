import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StepFormLayout from "@/shared/ui/StepFormLayout";
import DepartureInputForm from "@/widgets/meeting/departureInputForm";
import { useMeetingStore, type Departure } from "@/store/meetingStore";

const Step1_5Page = () => {
  const navigate = useNavigate();
  const { startPoint, setStartPoint } = useMeetingStore();

  // API 형태(StartPointRequest[])를 UI 형태(Departure[])로 변환
  const departures: Departure[] = startPoint.map((sp, index) => ({
    id: sp.id || Date.now() + index,
    type: index === 0 ? "leader" : "member",
    // filter(Boolean) 제거 → 공백 보존
    value: [sp.first, sp.second, sp.third]
      .map((s) => s || "") // null이나 undefined를 빈 문자열로 통일
      .join(" ")
      .replace(/\s+$/, ""), // 마지막에 있는 공백만 제거
  }));

  useEffect(() => {
    if (startPoint.length === 0) {
      setStartPoint([
        { id: Date.now(), type: "leader", first: "", second: "", third: "" },
      ]);
    }
  }, [startPoint, setStartPoint]);

  const handleNext = () => navigate("/Plaza/step1_6");
  const handlePrev = () => navigate(-1);

  const handleAdd = () => {
    if (startPoint.length >= 5) return;
    const newStartPoint = {
      id: Date.now(),
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

  // 주소 문자열을 파싱해서 first, second, third로 분리 (공백 보존)
  const parseAddress = (address: string) => {
    const firstSpaceIndex = address.indexOf(" ");
    const secondSpaceIndex =
      firstSpaceIndex >= 0 ? address.indexOf(" ", firstSpaceIndex + 1) : -1;

    return {
      first: firstSpaceIndex >= 0 ? address.slice(0, firstSpaceIndex) : address,
      second:
        secondSpaceIndex >= 0
          ? address.slice(firstSpaceIndex + 1, secondSpaceIndex)
          : firstSpaceIndex >= 0
          ? address.slice(firstSpaceIndex + 1)
          : "",
      third: secondSpaceIndex >= 0 ? address.slice(secondSpaceIndex + 1) : "",
    };
  };

  const handleChange = (id: number, newValue: string) => {
    const parsedAddress = parseAddress(newValue);
    setStartPoint(
      startPoint.map((sp) =>
        (sp.id || 0) === id ? { ...sp, ...parsedAddress } : sp
      )
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    id: number
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

  const setDepartures = (newDepartures: Departure[]) => {
    const newStartPoint = newDepartures.map((dep, index) => {
      const parsed = parseAddress(dep.value);
      return {
        id: dep.id,
        type: index === 0 ? ("leader" as const) : ("member" as const),
        ...parsed,
      };
    });
    setStartPoint(newStartPoint);
  };

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
