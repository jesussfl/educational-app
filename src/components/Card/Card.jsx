import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Button from "../Button/Button";
import Headings from "../Headings/Headings";
// import { Headings, Button } from "../index";
import { Colors } from "../../utils/Theme";
import Icon from "react-native-remix-icon";
import { PlayCircle } from "iconsax-react-native";


const WorldCard = ({ name, description, imgSource, mainAction, isCompleted, isLocked, worldsCompleted, isCurrent }) => {


   return (
      <View
         style={{
            justifyContent: "space-between",
            marginBottom: 24,
            gap: 8,
            padding: 24,
            borderWidth: 4,
            borderColor: isLocked ? Colors.gray_200 : Colors.gray_100,
            borderRadius: 24,
            backgroundColor: isLocked ? Colors.gray_100 : "#fff",
         }}>
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image style={{ width: 124, height: 124, resizeMode: "stretch" }} src={imgSource}></Image>
         </View>
         <View style={{ flex: 1, justifyContent: "center", gap:10 }}>
            <Text style={{ fontFamily: "Sora-SemiBold", textAlign: "center", fontSize: 24, color: isLocked ? Colors.gray_400 : Colors.gray_600}}>{name}</Text>
            <Text style={{ fontFamily: "Sora-Regular", textAlign: "center", lineHeight: 24, fontSize: 16, color: isLocked ? Colors.gray_400 : Colors.gray_400}}>{description}</Text>
         </View>
         <View style={{ gap: 16 }}>
            <Button text={`${worldsCompleted} lecciones completadas` } variant="secondary" size="small" />
            {isCurrent ? <Button text="Mundo actual" variant="primary" onPress={mainAction} rightIcon={<PlayCircle size="20" variant="Bold" color={"#fff"} />}  /> : 
            <Button text={isCompleted ? "Completado" : isLocked ? "Bloqueado" : "Comenzar"} variant={isCompleted ? "success" : isLocked ? "secondary" : "primary"} disabled={isLocked} onPress={mainAction} rightIcon={isLocked ? <Icon name="lock-fill" size="20" color={Colors.gray_300} /> : <PlayCircle size="20" variant="Bold" color={"#fff"} />} />
            
            }
         </View>
      </View>
   );
};


export default WorldCard;
