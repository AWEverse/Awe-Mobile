import React from 'react';
import { View, type ViewProps, StyleSheet, DimensionValue } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';

export type SheetProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  padding?: DimensionValue;
  margin?: DimensionValue;
};

export function Sheet({
  style,
  lightColor,
  darkColor,
  borderRadius,
  shadow,
  padding,
  margin,
  ...otherProps
}: SheetProps) {
  const backgroundColor = useThemeColor({ light: lightColor || '', dark: darkColor || '' }, 'background');

  const sheetStyle = StyleSheet.create({
    sheet: {
      backgroundColor,
      borderRadius,
      padding,
      margin,
      ...(shadow
        ? {
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }
        : {}),
    },
  });

  return <View style={[sheetStyle.sheet, style]} {...otherProps} />;
}
