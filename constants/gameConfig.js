import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const LANE_WIDTH = width / 3;
export const LANES = {
  LEFT: LANE_WIDTH / 2,
  CENTER: width / 2,
  RIGHT: width - LANE_WIDTH / 2,
};

export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

export const CAR_WIDTH = 80;
export const CAR_HEIGHT = 100;
export const CAR_Y_POSITION = height - 150;

export const OBSTACLE_WIDTH = 70;
export const OBSTACLE_HEIGHT = 70;
export const OBSTACLE_SPAWN_Y = -OBSTACLE_HEIGHT;

export const OBSTACLE_SPEED = 5;
export const OBSTACLE_SPAWN_INTERVAL = 1500;
export const SCORE_INCREMENT_INTERVAL = 100;

export const TILT_THRESHOLD_LEFT = -0.3;
export const TILT_THRESHOLD_RIGHT = 0.3;

export const COLLISION_MARGIN = 10;

export const COLORS = {
  background: "#1a1a2e",
  car: "#00ff88",
  obstacle: "#ff0055",
  text: "#ffffff",
  button: "#0f3460",
  buttonText: "#ffffff",
  score: "#ffdd00",
  lane: "rgba(255, 255, 255, 0.1)",
};
