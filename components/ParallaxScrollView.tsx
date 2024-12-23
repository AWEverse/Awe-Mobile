import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedStyle,
  useScrollViewOffset,
  Extrapolate,
} from 'react-native-reanimated';
import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

const DEFAULT_HEADER_HEIGHT = 250;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  headerHeight?: number;
  fadeHeaderImage?: boolean;
  onScroll?: (scrollOffset: number) => void;
}>;

export default function AdvancedParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  headerHeight = DEFAULT_HEADER_HEIGHT,
  fadeHeaderImage = false,
  onScroll,
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();

  // Animated style for parallax effect on header
  const headerAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollOffset.value,
      [-headerHeight, 0, headerHeight],
      [-headerHeight / 2, 0, headerHeight * 0.75],
      Extrapolate.CLAMP
    );
    const scale = interpolate(
      scrollOffset.value,
      [-headerHeight, 0, headerHeight],
      [2, 1, 1],
      Extrapolate.CLAMP
    );
    const opacity = fadeHeaderImage
      ? interpolate(scrollOffset.value, [0, headerHeight / 2], [1, 0], Extrapolate.CLAMP)
      : 1;

    return {
      transform: [{ translateY }, { scale }],
      opacity,
    };
  });

  // Optional callback for scroll events
  const handleScroll = () => {
    if (onScroll) {
      onScroll(scrollOffset.value);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        contentContainerStyle={{ paddingBottom: bottom }}
        onScroll={handleScroll}>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme], height: headerHeight },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
        <ThemedView style={styles.content}>{children}</ThemedView>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  content: {
    flex: 1,
    padding: 32,
    gap: 16,
  },
});
