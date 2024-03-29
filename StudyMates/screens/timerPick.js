import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Alert,
  Image
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

const TimerPick = ({ navigation }) => {
  const [pomoTime, setPomo] = useState(25);
  const [shortBreak, setShort] = useState(5);
  const [longBreak, setLong] = useState(10);
  const reset = () => {
    setPomo(25);
    setShort(5);
    setLong(10);
  };

  const increment = () => {
    if (shortBreak < pomoTime) {
      // console.log("short break:" + shortBreak);
      // console.log("\n pomo time: " + pomoTime);

      setShort(shortBreak + 5);
    } else {
      Alert.alert("hold on!", "you can't break longer than you study!");
    }
  };
  const decrement = props => {
    if (props == pomoTime && props > 15) {
      setPomo(props - 5);
    }
    if (props == shortBreak && props > 5) {
      setShort(props - 5);
    }
    if (props == longBreak && props > 5) {
      setLong(props - 5);
    }
  };
  return (
    <LinearGradient
      className="h-screen w-screen items-center flex z-[1]"
      colors={["#EDEDED", "#FFDADA", "#FFC3C3", "#B0B0F8"]}
      start={{ x: 0, y: 0 }}
      locations={["5.53%", "13.4%", "55.36%", "100%"]}
    >
      <Pressable
        className="mr-auto mt-12 ml-5 z-[3]"
        onPress={() => navigation.navigate("Landing")}
      >
        <AntDesign name="back" size={30} color="black" />
      </Pressable>
      <View style={styles.container}>
        {/* TIMER SETTINGS TITLE */}
        <View style={[styles.titleBackground, styles.shadowProp]}>
          <Text style={styles.sectionTitle}>timer settings</Text>
        </View>

        {/* POMODORO SETTINGS SECTION */}
        <View style={[styles.popUp, styles.shadowProp]}>
          <View style={styles.timerContainer}>
            <Text style={styles.sectionTitle}>pomodoro:</Text>

            <View style={styles.timerSelect}>
              {/* <Button
              onPress={() => {setPomo(pomoTime - 5)}}
              title="-"
            /> */}
              <Pressable
                style={styles.timeModifiers}
                onPress={() => decrement(pomoTime)}
              >
                <Text style={styles.timeModifiers}>-</Text>
              </Pressable>

              <View style={styles.timeTextContainer}>
                <Text style={styles.timeText}>{pomoTime}:00</Text>
              </View>

              <Pressable
                style={styles.timeModifiers}
                onPress={() => setPomo(pomoTime + 5)}
              >
                <Text style={styles.timeModifiers}>+</Text>
              </Pressable>
              {/* <Button
              onPress={() => {setPomo(pomoTime + 5)}}
              title="+"
            /> */}
            </View>
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.sectionTitle}>short break:</Text>

            <View style={styles.timerSelect}>
              {/* <Button
              onPress={() => {setShort(shortBreak - 5)}}
              title="-"
            /> */}
              <Pressable
                style={styles.timeModifiers}
                onPress={() => decrement(shortBreak)}
              >
                <Text style={styles.timeModifiers}>-</Text>
              </Pressable>

              <View style={styles.timeTextContainer}>
                <Text style={styles.timeText}>{shortBreak}:00</Text>
              </View>

              <Pressable
                style={styles.timeModifiers}
                onPress={() => increment(shortBreak)}
              >
                <Text style={styles.timeModifiers}>+</Text>
              </Pressable>
              {/* <Button
              onPress={() => {setShort(shortBreak + 5)}}
              title="+"
            /> */}
            </View>
          </View>

          <View style={styles.timerContainer}>
            <Text style={styles.sectionTitle}>long break:</Text>

            <View style={styles.timerSelect}>
              {/* <Button
              onPress={() => {
                setLong(longBreak - 5);
              }}
              title="-"
            /> */}
              <Pressable
                style={styles.timeModifiers}
                onPress={() => decrement(longBreak)}
              >
                <Text style={styles.timeModifiers}>-</Text>
              </Pressable>

              <View style={styles.timeTextContainer}>
                <Text style={styles.timeText}>{longBreak}:00</Text>
              </View>

              <Pressable
                style={styles.timeModifiers}
                onPress={() => setLong(longBreak + 5)}
              >
                <Text style={styles.timeModifiers}>+</Text>
              </Pressable>
              {/* <Button
              onPress={() => {
                setLong(longBreak + 5);
              }}
              title="+"
            /> */}
            </View>
          </View>
        </View>

        {/* BUTTONS AT THE END */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => reset()}>
            <Text style={styles.buttonText}>reset</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              navigation.navigate("TimerScreen", {
                count: 0,
                pomoT: pomoTime,
                shortT: shortBreak,
                longT: longBreak,
              })
            }
          >
            <Text style={styles.buttonText}>start</Text>
          </TouchableOpacity>
        </View>
        {/* onPress={() => navigation.navigate("TimerPick")} */}
      </View>
      
      <Image
        className="z-[2] absolute top-[15%] right-[40%] w-[70%] h-[13%]"
        source={require("../assets/clouds_1.png")}
        resizeMode="contain"
      />
      <Image
        className="z-[2] absolute top-[40%] left-[76%] w-[57%] h-[13%]"
        source={require("../assets/clouds_2.png")}
        resizeMode="contain"
      />
      <Image
        className="z-[2] absolute bottom-[20%] right-[30%] w-[92%] h-[14%]"
        source={require("../assets/clouds_3.png")}
        resizeMode="contain"
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  // FULL PAGE STYLING
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 50,
    zIndex: 3,
  },

  linGrad: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    zIndex: 1,
  },

  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2
  },

  // "timer settings" POP-UP STYLING
  titleBackground: {
    backgroundColor: "#FFF2D4",
    borderRadius: 15,
    height: 60,
    width: 285,
    alignItems: "center",
    justifyContent: "center"
  },

  // POP-UP STLYING
  popUp: {
    backgroundColor: "#FFF2D4",
    borderRadius: 15,
    paddingTop: 7,
    paddingLeft: 16,
    height: 456,
    width: 285
  },
  // EACH TIMER OPTION, INCLUDING TITLE (I.E. "POMODORO:")
  timerContainer: {
    marginBottom: 19
    //backgroundColor: 'red',
  },
  sectionTitle: {
    // TITLE OF EACH MENU SETTING (I.E. "POMODORO:")
    fontFamily: "FredokaMedium",
    fontSize: 28,
    color: "#505050"
  },
  timerSelect: {
    // just the - and + section of the menu options
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
    //backgroundColor: "blue",
  },
  timeTextContainer: {
    // THE TIME CONTAINER
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#D7E4F8",
    height: 71,
    width: 108,
    borderRadius: 15,
    marginTop: 19
  },
  timeText: {
    // JUST THE TIME ITSELF
    fontFamily: "FredokaMedium",
    fontSize: 32,
    color: "#505050"
  },
  timeModifiers: {
    margin: 7,
    fontFamily: "FredokaMedium",
    fontSize: 25,
    color: "#505050"
  },

  // BUTTONS AT THE END
  buttonContainer: {
    width: 285,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between"
    //backgroundColor: 'red',
  },
  button: {
    backgroundColor: "#D1EBCB",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 24,
    height: 56,
    width: 132
  },
  buttonText: {
    fontFamily: "WorkSansMedium",
    fontSize: 24,
    color: "#4D558A"
  }
});

export default TimerPick;
