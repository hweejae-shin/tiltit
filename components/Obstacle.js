import React from "react";
import Matter from "matter-js";
import { View, Image, StyleSheet } from "react-native";
import { grayBrickRow } from "../assets/static";

export default function MakeObstacle(world, label, color, position, size) {
  const initialObstacle = Matter.Bodies.rectangle(
    position.x,
    position.y,
    size.width,
    size.height,
    { label, isStatic: true },
  );

  Matter.World.add(world, initialObstacle);

  return {
    body: initialObstacle,
    color,
    position,
    renderer: <Obstacle />,
  };
}

function Obstacle(props) {
  const { body, color } = props;
  const { bounds, position } = body;
  const widthBody = bounds.max.x - bounds.min.x;
  const heightBody = bounds.max.y - bounds.min.y;
  const xBody = position.x - widthBody / 2;
  const yBody = position.y - heightBody / 2;

  return (
    <View style={viewStyle(color, xBody, yBody, widthBody, heightBody)}>
      <Image style={floorStyle(heightBody, widthBody)} source={grayBrickRow} />
    </View>
  );
}

function viewStyle(color, xBody, yBody, widthBody, heightBody) {
  return StyleSheet.create({
    position: "absolute",
    left: xBody,
    top: yBody,
    width: widthBody,
    height: heightBody,
    borderWidth: 1,
    borderColor: color,
    borderStyle: "solid",
  });
}

function floorStyle(heightBody, widthBody) {
  return StyleSheet.create({
    height: heightBody,
    width: widthBody,
    resizeMode: "repeat",
  });
}
