import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import * as Font from "expo-font";
import { AppLoading } from "expo";

const configureFonts = () => {
  return Font.loadAsync({
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
  });
};

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={configureFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      ></AppLoading>
    );
  }

  const startGameHandler = (seletedNumber) => {
    setUserNumber(seletedNumber);
    setGuessRounds(0);
  };

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const gameOverHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds);
  };

  let content = (
    <StartGameScreen onStartGame={startGameHandler}></StartGameScreen>
  );

  if (userNumber && guessRounds <= 0) {
    content = (
      <GameScreen
        onGameOver={gameOverHandler}
        userChoice={userNumber}
      ></GameScreen>
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
      onRestart={newGameHandler}
        userNumber={userNumber}
        rounds={guessRounds}
      ></GameOverScreen>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title={"Guess a Number!"}></Header>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
