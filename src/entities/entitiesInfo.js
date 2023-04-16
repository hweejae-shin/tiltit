import { Dimensions } from "react-native";
import Dynamic from "../../assets/dynamicImage";
import { apple } from "../../assets/static";

const WINDOW_WIDTH = Dimensions.get("window").width;
const FLOOR_WIDTH = 32;
const GAME_WIDTH = WINDOW_WIDTH - FLOOR_WIDTH;
const BLOCK_SIZE = GAME_WIDTH / 16;

const entityInfo = {
  gridSize: BLOCK_SIZE,
  block: {
    number: 31,
    size: BLOCK_SIZE,
  },
  goal: {
    number: 1,
    size: 72,
  },
  item: {
    number: 19,
    size: BLOCK_SIZE *1.5,
    image: apple,
  },
  monster: {
    number: 4,
    size: 40,
    specifics: {
      1: {
        direction: "row",
        speed: 3,
        distance: GAME_WIDTH / 5,
        image: Dynamic.rock,
      },
      2: {
        direction: "column",
        speed: 4,
        distance: GAME_WIDTH / 5,
        image: Dynamic.rock,
      },
      3: {
        direction: "column",
        speed: 3,
        distance: GAME_WIDTH / 5,
        image: Dynamic.rock,
      },
      4: {
        direction: "column",
        speed: 2.5,
        distance: GAME_WIDTH / 5,
        image: Dynamic.rock,
      },
    },
  },
};

export default entityInfo;
