import React, {forwardRef} from 'react';
import ActionSheet, {ActionSheetRef} from 'react-native-actions-sheet';
type BottomSheetProps = {
  children: React.ReactNode;
  containerStyle?: object;
  closeOnTouchBackdrop?: boolean;
  overlayColor?: string;
  closeOnDragDown?: boolean;
};
export const AppBottomSheet = forwardRef<ActionSheetRef, BottomSheetProps>(
  (
    {
      children,
      containerStyle,
      closeOnTouchBackdrop,
      overlayColor,
      closeOnDragDown,
    },
    ref,
  ) => {
    return (
      <ActionSheet
        gestureEnabled={closeOnDragDown}
        ref={ref}
        containerStyle={containerStyle}
        overlayColor={overlayColor}
        //  defaultOverlayOpacity={0.5}
        closeOnTouchBackdrop={closeOnTouchBackdrop}>
        {children}
      </ActionSheet>
    );
  },
);
