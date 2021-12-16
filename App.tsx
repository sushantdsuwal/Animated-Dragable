import 'react-native-gesture-handler';
import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, LayoutChangeEvent } from 'react-native';

import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Draggable from './Draggable';
const SIZE = 100.0;
const CIRCLE_RADIUS = SIZE * 2;

type ContextType = {
  translateX: number;
  translateY: number;
};

export default function App() {
  const [layout, setLayout] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const find_dimensions = useCallback((event: LayoutChangeEvent) => {
    const { x, y, width, height } = event.nativeEvent.layout;
    setLayout({ width, height, x, y });
  }, []);

  return (
    <View style={styles.mainContainer}>
      <View onLayout={find_dimensions} style={styles.container}>
        <Draggable xPosition={10} yPosition={10} layout={layout}>
          <Text>1</Text>
        </Draggable>
        <Draggable xPosition={20} yPosition={20} layout={layout}>
          <Text>2</Text>
        </Draggable>
      </View>
      <View>
        <Text>height:{layout.height}</Text>
        <Text>width:{layout.width}</Text>
        <Text>x:{layout.x}</Text>
        <Text>y:{layout.y}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    margin: 50,
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
