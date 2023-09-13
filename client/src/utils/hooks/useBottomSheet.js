import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

export default function useBottomSheet() {
	const bottomSheetModalRef = useRef(null);
	const snapPoints = useMemo(() => ["25%", "50%"], []);

	const handlePresentModalPress = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);

	return {
		bottomSheetModalRef,
		snapPoints,
		handlePresentModalPress,
	};
}
