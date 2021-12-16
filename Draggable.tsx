import React, { useState, useCallback, useRef } from 'react';
import { LayoutChangeEvent, StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

interface DraggableProps {
  xPosition: number;
  yPosition: number;
  layout: {
    width: number;
    height: number;
    x: number;
    y: number;
  };
}

export default function Draggable({ xPosition = 0, yPosition = 0, layout }: DraggableProps) {
  let isDragActive = false;
  const [elementPosition, setElementPosition] = useState({
    x: 0,
    y: 0,
  });
  const translateX = useSharedValue(xPosition);
  const translateY = useSharedValue(yPosition);

  React.useEffect(() => {
    console.log('isDragActive', isDragActive);
  }, [translateX.value, translateY.value]);

  const panGestureEvent = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, ContextType>({
    onStart: (_event, context) => {
      isDragActive = true;

      console.log('context', context.translateX);
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      const { height, width, x, y } = layout;
      const xStartPosition = x - SIZE;
      const xEndPosition = x + width - SIZE;
      const yStartPosition = y - SIZE;
      const yEndPosition = y + height - SIZE;

      if (
        translateX.value > xStartPosition &&
        translateX.value < xEndPosition &&
        translateY.value > yStartPosition &&
        translateY.value < yEndPosition
      ) {
        //  do nothing
      } else {
        // translateX.value = withSpring(xPosition);
        // translateY.value = withSpring(yPosition);
      }
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  const find_dimensions = useCallback(
    (event: LayoutChangeEvent | any) => {
      const { pageX, pageY } = event.target.measure;
      setElementPosition({ x: pageX, y: pageY });
    },
    [isDragActive]
  );

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={[styles.square, rStyle]} onLayout={find_dimensions}>
        <Text>{translateX.value}</Text>
        <Text>{translateY.value}</Text>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 700,
    width: 500,
    backgroundColor: '#fff',
    borderWidth: 1,
  },
  square: {
    width: SIZE,
    height: SIZE,
    backgroundColor: 'rgba(0, 0, 256, 0.5)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    width: CIRCLE_RADIUS * 2,
    height: CIRCLE_RADIUS * 2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: CIRCLE_RADIUS,
    borderWidth: 5,
    borderColor: 'rgba(0, 0, 256, 0.5)',
  },
});
