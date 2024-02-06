import { StyleSheet, Text, View, Image, SectionList, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@utils/Theme";
import { DollarCircle, HeartAdd } from "iconsax-react-native";
import useModalStore from "@stores/useModalStore";
import StoreModal from "../components/storeModal";
import useAuthStore from "@stores/useAuthStore";
import { useCustomMutation } from "@utils/useCustomMutation";
import { useMutation } from "@tanstack/react-query";
import { updateUserMutation } from "@utils/graphql/mutations/user.mutation";
import useStoreActions from "../hooks/useStoreActions";

const STORE_ITEMS = [
  {
    title: "Vidas",
    data: [
      {
        name: "heartsFiller",
        label: "Restaurador de Vidas",
        description: "Vuelve a tener todas tus vidas para seguir aprendiendo.",
        price: 35.0,
        icon: <HeartAdd size={20} color={Colors.gray_400} />,
      },
    ],
  },
  {
    title: "Racha",
    data: [
      {
        name: "streakRepair",
        label: "Reparador de Racha",
        description: "Repara el día de racha que perdiste. Cada compra lo volverá más costoso.",
        price: 5.0,
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
        sections={STORE_ITEMS}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <StoreItem label={item.label} description={item.description} price={item.price} image={item.image} icon={item.icon} />}
        renderSectionHeader={({ section: { title } }) => <Text style={{ fontSize: 17, fontFamily: "Sora-SemiBold", color: Colors.gray_400 }}>{title}</Text>}
      />
      <StoreModal />
    </>
  );
};

const StoreItem = ({ label, description, price, image, icon }) => {
  const { onOpen, onClose } = useModalStore((state) => state);
  const { user } = useAuthStore();
  const { buyItem, buyRefillLives } = useStoreActions();

  const hasEnoughMoney = user.money >= price;
  const buyConfig = {
    title: `Comprar ${label}`,
    description: `Estás seguro que quieres comprarlo por: ${price}`,
    cancelAction: onClose,
    confirmActionText: "Comprar",
    confirmAction: () => {
      buyRefillLives(price);
      onClose();
    },
  };

  const noMoneyConfig = {
    title: "No tienes suficiente dinero",
    description: `No tienes suficiente dinero para comprar ${label}.`,
    confirmActionText: "Volver",
    confirmAction: onClose,
  };

  return (
    <>
      <Pressable onPress={() => onOpen(hasEnoughMoney ? buyConfig : noMoneyConfig)} style={styles.itemContainer}>
        {icon ? (
          <View style={{ width: 72, height: 72, backgroundColor: Colors.gray_50, borderRadius: 8 }}>{/* <Text> {icon} </Text>{" "} */}</View>
        ) : (
          <Image style={{ width: 72, height: 72 }} source={image} />
        )}

        <View style={{ flex: 1, gap: 4 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", gap: 4 }}>
            <Text style={styles.name}>{label}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
              <Text style={styles.price}>{price}</Text>
              <DollarCircle size={24} color={Colors.primary_500} variant="Bold" />
            </View>
          </View>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Pressable>
    </>
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
