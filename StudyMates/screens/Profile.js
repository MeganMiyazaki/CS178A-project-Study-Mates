import { React, useState, useEffect,  } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  useContext,
  Button,
  Modal,
  modalVisible,
  TouchableOpacity 
} from "react-native";
import { MaterialCommunityIcons, SimpleLineIcons, Ionicons, AntDesign , Entypo} from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { db, auth } from "../firebase";

const Profile = ({ route, navigation }) => {

  const [user, setUser] = useState(null);

  const getUser = async () => {
    const { uid } = auth.currentUser;
    if (!uid) return;
    const userRef = db.collection("users").doc(uid);
    const doc = await userRef.get();
    const userData = doc.data();
    setUser(userData);
  };

  useEffect(() => {
    getUser();
  }, []);

  const [actionTriggered, setActionTriggered] = useState(''); // here we go
  const [modalVisible, setModalVisible] = useState(false);

  // const [modalState, setModalState] = useState(false);
  function signOut() {
    setModalVisible(true);
    setActionTriggered('SIGNOUT');
  }

  function changeEmail() {
    setActionTriggered('EMAIL');
  }

  function changePassword() {
    setActionTriggered('PASSWORD');
  }

  // function yesOut(message) {
  //   setModalState({state: "yes", message});
  // }

  // function noOut(message) {
  //   setModalState({state: "no", message});
  // }

  return (
    <View className="flex items-center justify-center">

      <LinearGradient
        className="h-screen w-screen items-center justify-center flex"
        colors={["#E4E5E3", "#FFB2B2", "#C3C3F0"]}
        start={{ x: 0, y: 0 }}
      >
        <Pressable
        className="mr-auto mt-10 mb-auto ml-5"
        onPress={() => navigation.navigate("Landing")}>
          <AntDesign name="back" size={32} color="black" />
        </Pressable>

          <View style={styles.topRow}>
            <Text className="text-4xl font-fredoka text-black m-1.5 text-center">
              {user && user.username}'s Profile
            </Text>
          </View>

        <View style={styles.infoContainer}>

          <View style={styles.infoView}>

            <Text className="text-6xl font-fredoka text-black m-1.5 text-center"> 
            {user && user.totalStudy}
            </Text>

            <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
              Total Hours Studied
            </Text>

            <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
              Email: {user && user.email}
            </Text>

            <Pressable
              style={[styles.button, styles.shadowProp]}
              onPress={() => changeEmail()}
            >
              <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
                Change Email
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.shadowProp]}
              onPress={() => changePassword()}
            >
              <Text className="text-1xl font-fredoka text-black m-1.5 text-center">
                Change Password
              </Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.shadowProp]}
              onPress={() => signOut()}
            >
              <Text className="text-3xl font-fredoka text-black m-1.5 text-center">
                Sign Out
              </Text>
            </Pressable>

          </View>

        </View>

      </LinearGradient>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onClose={() => {
          setActionTriggered('');
        }}
        >

        { actionTriggered === 'SIGNOUT' ?
          <View style={styles.container}>    

            <View style={styles.modalView}>

              <View className="flex flex-row items-center justify-center"> 
                  <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                    Are you sure you want to sign out? :T
                  </Text>
                  
                  <Pressable className = "bg-[#D1EBCB] items-center justify-center" style = {styles.button} onPress={()=> {navigation.navigate("Landing")}}>
                    <Entypo  name="check" size={32} color="white" alignItems="center"/>
                  </Pressable>

                  <Pressable className = "bg-red items-center justify-center" style = {styles.button} onPress={()=> {navigation.navigate("Landing")}}>
                    <Entypo name="cross" size={32} color="white" alignItems="center"/>
                  </Pressable>

              </View>

            </View>

          </View> :

          actionTriggered === 'EMAIL' ?
          <View style={styles.container}>    

            <View style={styles.modalView}>

              <View className="flex flex-row items-center justify-center"> 
                  <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                    Are you sure you want to sign out? :T
                  </Text>
                  
                  <Pressable className = "bg-[#D1EBCB] items-center justify-center" style = {styles.button} onPress={()=> {navigation.navigate("Landing")}}>
                    <Entypo  name="check" size={32} color="white" alignItems="center"/>
                  </Pressable>
                  <Pressable className = "bg-red items-center justify-center" style = {styles.button} onPress={()=> {navigation.navigate("Landing")}}>
                    <Entypo name="cross" size={32} color="white" alignItems="center"/>
                  </Pressable>
              </View>

            </View>

          </View> :

          actionTriggered === 'PASSWORD' ?
          <View style={styles.container}>    

          <View style={styles.modalView}>

            <View className="flex flex-row items-center justify-center"> 
                <Text className="text-2xl font-fredoka text-black m-1.5 text-center">
                  Are you sure you want to sign out? :T
                </Text>
                
                <Pressable className = "bg-[#D1EBCB] items-center justify-center" style = {styles.button} onPress={()=> {navigation.navigate("Landing")}}>
                  <Entypo  name="check" size={32} color="white" alignItems="center"/>
                </Pressable>
                <Pressable className = "bg-red items-center justify-center" style = {styles.button} onPress={()=> {navigation.navigate("Landing")}}>
                  <Entypo name="cross" size={32} color="white" alignItems="center"/>
                </Pressable>
            </View>

          </View>

        </View> :

        null
        }

      </Modal>      

    </View>

  );
};

const styles = StyleSheet.create({
  linGrad: {
    alignItems: "center",
    justifyContent: "space-evenly",
    flex: 1
  },
  topRow: {
    position: "absolute",
    top: "10%"
  },
  bottomRow: {
    position: "absolute",
    bottom: "30%"
  },
  infoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingTop: 150,
    paddingBottom: 250
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
    paddingBottom: 50
  },
  shadowProp: {
    shadowColor: "#00000",
    shadowOffset: { height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 2
  },
  infoView:{
    backgroundColor: "#FFF2D4",
    borderColor: "#505050",
    borderRadius: 20,
    padding: 30,
    alignItems:"center",
    fontFamily: "FredokaMedium",
    width:300
  },
  modalView:{
    backgroundColor: "#C3C3F0",
    borderColor: "#A7B0E7",
    borderRadius: 20,
    padding: 30,
    alignItems:"center",
    fontFamily: "FredokaMedium",
    width:300
  },
});

export default Profile;
