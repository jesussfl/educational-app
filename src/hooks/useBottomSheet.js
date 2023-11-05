import { useCallback, useMemo, useRef } from "react";

export default function useBottomSheet() {
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["45%", "45%", "45%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef?.current?.expand();
  }, []);
  const handleSheetChanges = useCallback((index) => {}, []);

  return {
    bottomSheetModalRef,
    snapPoints,
    handlePresentModalPress,
    handleSheetChanges,
  };
}
