import { StyleSheet, Text, View, ScrollView, Image, SectionList } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@utils/Theme";
import { DollarCircle, HeartAdd } from "iconsax-react-native";

const DATA = [
  {
    title: "Corazones",
    data: [
      {
        name: "Restaurar corazones",
        description: "Vuelve a tener todos tus corazones para seguir aprendiendo.",
        price: "$5.00",
        icon: <HeartAdd size={20} color={Colors.gray_400} />,
      },
    ],
  },
  {
    title: "Racha",
    data: [
      {
        name: "Reparador de racha",
        description: "Repara el día de racha que perdiste. Cada compra lo volverá más costoso.",
        price: "$5.00",
        icon: <DollarCircle size={20} color={Colors.gray_400} />,
      },
    ],
  },
];

const StoreScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SectionList
        style={styles.container}
        sections={DATA}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <StoreItem name={item.name} description={item.description} price={item.price} image={item.image} icon={item.icon} />}
        renderSectionHeader={({ section: { title } }) => <Text style={{ fontSize: 17, fontFamily: "Sora-SemiBold", color: Colors.gray_400 }}>{title}</Text>}
      />
    </>
  );
};

const StoreItem = ({ name, description, price, image, icon }) => {
  return (
    <View style={styles.itemContainer}>
      {icon ? (
        <View style={{ width: 72, height: 72, backgroundColor: Colors.gray_50, borderRadius: 8 }}>{/* <Text> {icon} </Text>{" "} */}</View>
      ) : (
        <Image style={{ width: 72, height: 72 }} source={image} />
      )}

      <View style={{ flex: 1, gap: 4 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
          <Text style={styles.name}>{name}</Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Text style={styles.price}>{price}</Text>
            <DollarCircle size={24} color={Colors.primary_500} variant="Bold" />
          </View>
        </View>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default StoreScreen;

const styles = StyleSheet.create({
  name: {
    fontSize: 16,
    fontFamily: "Sora-SemiBold",
    color: "#9A4CFF",
  },
  description: {
    display: "flex",
    fontFamily: "Sora-Regular",
    fontSize: 14,
    color: Colors.gray_400,
    lineHeight: 20,
    alignItems: "center",
  },
  price: {
    fontSize: 16,
    color: Colors.primary_600,
    fontFamily: "Sora-SemiBold",
  },
  itemContainer: {
    borderTopWidth: 1,
    borderColor: Colors.gray_50,
    flexDirection: "row",
    paddingVertical: 24,
    marginTop: 24,
    gap: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,

    paddingVertical: 56,
  },
});
