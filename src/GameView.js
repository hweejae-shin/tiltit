import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { GameEngine } from "react-native-game-engine";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCollideMonster,
  resetCollision,
  collideMonster,
  selectCrackEffect,
} from "./features/gameSlice";
import entities from "./entities";
import Physics from "./physics";
import { crackedScreen2 } from "../assets/static";

export default function GameView() {
  const [running, setRunning] = useState(true);
  const [gameEngine, setGameEngine] = useState(null);
  const [currentPoints, setCurrentPoints] = useState(0);
  const hasCollideMonster = useSelector(selectCollideMonster);
  const dispatch = useDispatch();
  const showingCrackedEffect = useSelector(selectCrackEffect);

  useEffect(() => {
    if (hasCollideMonster) {
      setTimeout(() => {}, 100);
    }
  }, [hasCollideMonster]);

  const handleGameEngine = (e) => {
    switch (e.type) {
      case "game_over":
        dispatch(collideMonster());
        gameEngine.stop();
        setRunning(false);
        break;
      case "new_point":
        setCurrentPoints(currentPoints + 1);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.score}>{currentPoints}</Text>
      <GameEngine
        ref={(ref) => {
          setGameEngine(ref);
        }}
        systems={[Physics]}
        entities={entities()}
        running={running}
        onEvent={handleGameEngine}
        style={styles.gameEngine}
      >
        <StatusBar style="auto" hidden />
      </GameEngine>
      {showingCrackedEffect ? (
        <View style={styles.container}>
          <Image
            source={crackedScreen2}
            contentFit="cover"
          />
          <TouchableOpacity
            style={styles.messageBox}
            onPress={() => {
              setCurrentPoints(0);
              dispatch(resetCollision());
              setRunning(true);
              gameEngine.swap(entities());
            }}
          >
            <Text style={styles.message}>START GAME</Text>
          </TouchableOpacity>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  score: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
    margin: 20,
  },
  gameEngine: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "lightgreen",
  },
  messageBox: {
    position: "absolute",
    flex: 1,
    backgroundColor: "black",
    paddingHorizontal: 30,
    paddingVertical: 10,
    zIndex: 1,
  },
  message: {
    fontWeight: "bold",
    color: "white",
    fontSize: 30,
  },
});
