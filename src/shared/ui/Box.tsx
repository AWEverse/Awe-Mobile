import React from 'react';
import { View, ViewProps, StyleSheet, DimensionValue, StyleProp, ViewStyle } from 'react-native';


interface OwnProps {
  children?: React.ReactNode;
  padding?: DimensionValue;
  margin?: DimensionValue;
  backgroundColor?: string;
  borderRadius?: number;
  shadow?: boolean;
  flex?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  sx?: StyleProp<ViewStyle>;
}

type Props = OwnProps & ViewProps;

const Box: React.FC<Props> = ({
  children,
  padding,
  margin,
  backgroundColor,
  borderRadius,
  shadow,
  flex,
  alignItems,
  justifyContent,
  sx,
  style,
  ...rest
}) => {
  const boxStyle = StyleSheet.create({
    box: {
      padding,
      margin,
      backgroundColor,
      borderRadius,
      flex,
      alignItems,
      justifyContent,
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

  return (
    <View style={[boxStyle.box, sx, style]} {...rest}>
      {children}
    </View>
  );
};

export default Box;
