import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import Button from "../Button/Button";
import { Colors } from "../../utils/Theme";
import Icon from "react-native-remix-icon";
import { PlayCircle } from "iconsax-react-native";
import ReadMore from "@fawazahmed/react-native-read-more";


const WorldCard = ({ name, description, imgSource, mainAction, isCompleted, isLocked, worldsCompleted, isCurrent }) => {


   return (
      <View
         style={[
            styles.cardContainer
         , {borderColor: isLocked ? Colors.gray_200 : Colors.gray_100,
            backgroundColor: isLocked ? Colors.gray_100 : "#fff"}]}>
         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Image  style={{ width: "100%", height: 224, resizeMode: "cover", borderRadius: 12,  opacity: isLocked ? 0.5 : 1 }} src={imgSource}></Image>
         </View>
         <View>
            <ReadMore numberOfLines={2} seeMoreText="" seeLessText="" style={[styles.title, {color: isLocked ? Colors.gray_400 : Colors.gray_600}]}>{name}</ReadMore>
            <ReadMore numberOfLines={3} seeMoreText="Ver más" seeLessText="Ver menos" style={[styles.description]} >{description}</ReadMore>
         </View>
         <View style={{ gap: 16 }}>
            {isCurrent ? <Button text="Mundo actual" variant="primary" onPress={mainAction} rightIcon={<PlayCircle size="20" variant="Bold" color={"#fff"} />}  /> : 
            <Button text={isCompleted ? "Completado" : isLocked ? "Bloqueado" : "Comenzar"} variant={isCompleted ? "success" : isLocked ? "secondary" : "primary"} disabled={isLocked} onPress={mainAction} rightIcon={isLocked ? <Icon name="lock-fill" size="20" color={Colors.gray_300} /> : <PlayCircle size="20" variant="Bold" color={"#fff"} />} />
            
         }
         <Text style={[styles.title, {color: isLocked ? Colors.gray_400 : Colors.gray_600, textAlign: "center", fontSize: 18}]}>Lecciones completadas: {worldsCompleted}</Text>
         </View>
      </View>
   );
};

const styles = StyleSheet.create({
  cardContainer:{
   justifyContent: "space-between",
   marginBottom: 24,
   gap: 24,
   padding: 16,
   borderWidth: 4,
   borderRadius: 24,
  },
   title:{
      fontSize: 24,
      marginBottom: 8,
      fontFamily: "Sora-SemiBold",
      color: Colors.gray_600,
      textAlign: "left",
   },
   description: {
      fontSize: 16,
      fontFamily: "Sora-Regular",
      lineHeight: 24,
      textAlign:"left",
      color: Colors.gray_400
   }
});

export default WorldCard;
