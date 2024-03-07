import { StyleSheet, Text, View, Image, SectionList, Pressable } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Colors } from "@utils/Theme";
import { DollarCircle, HeartAdd } from "iconsax-react-native";
import useModalStore from "@stores/useModalStore";
import StoreModal from "../components/storeModal";
import useAuthStore from "@stores/useAuthStore";
import useStoreActions from "../hooks/useStoreActions";
import { STORE_ITEMS, STORE_ITEM_NAMES } from "../config/store-items";
import { ECONOMY } from "@config/economy";
import { Button } from "@components";

const StoreScreen = () => {
  return (
    <>
      <StatusBar style="auto" />
      <SectionList
        style={styles.container}
        sections={STORE_ITEMS}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item }) => <StoreItem name={item.name} label={item.label} description={item.description} price={item.price} image={item.image} />}
        renderSectionHeader={({ section: { title } }) => <Text style={{ fontSize: 17, fontFamily: "Sora-SemiBold", color: Colors.gray_400 }}>{title}</Text>}
      />
      <StoreModal />
    </>
  );
};

const StoreItem = ({ name, label, description, price, image }) => {
  const { onOpen, onClose } = useModalStore((state) => state);
  const { user } = useAuthStore();
  const { buyItem } = useStoreActions();
  const hasEnoughMoney = user.money >= price;
  const isItemEnabled = () => {
    if (!hasEnoughMoney) {
      return false;
    }

    switch (name) {
      case STORE_ITEM_NAMES.fullRestorer:
        return { value: user.lives < ECONOMY.MAX_USER_LIVES - 2, text: "Ya tienes todas tus vidas" };
      case STORE_ITEM_NAMES.oneLive:
        return { value: user.lives < ECONOMY.MAX_USER_LIVES, text: "Ya tienes todas tus vidas" };
      case STORE_ITEM_NAMES.twoLives:
        return { value: user.lives < ECONOMY.MAX_USER_LIVES - 1, text: "Ya tienes todas tus vidas" };
      case STORE_ITEM_NAMES.streakShield:
        return { value: user.streak_shields !== ECONOMY.MAX_USER_STREAK_SHIELDS, text: "Ya tienes 3 escudos" };
      default:
        return true;
    }
  };

  const buyConfig = {
    title: `Comprar ${label}`,
    description: `Estás seguro que quieres comprarlo por:`,
    price,
    image,
    cancelAction: onClose,
    confirmActionText: "Comprar",
    confirmAction: () => {
      buyItem(price, name);
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
      <View style={styles.itemContainer}>
        {image ? (
          <Image style={{ height: 72, width: 72, resizeMode: "contain" }} source={image} />
        ) : (
          <View style={{ width: 72, height: 72, backgroundColor: Colors.gray_50, borderRadius: 8 }}></View>
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
          <Button
            disabled={!isItemEnabled().value}
            onPress={() => onOpen(hasEnoughMoney ? buyConfig : noMoneyConfig)}
            variant="primary"
            size="small"
            text={`${isItemEnabled().value ? "Comprar" : isItemEnabled().text}`}
          />
        </View>
      </View>
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
    alignItems: "center",
    paddingVertical: 24,
    marginTop: 8,
    gap: 16,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 24,
  },
});
