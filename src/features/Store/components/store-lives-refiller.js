import { View, Text } from "react-native";
import React from "react";
import useModalStore from "@stores/useModalStore";
import useAuthStore from "@stores/useAuthStore";
import useStoreActions from "../hooks/useStoreActions";

const LivesRefiller = () => {
  return (
    <View>
      <Text>LivesRefiller</Text>
    </View>
  );
};

export default LivesRefiller;

const StoreItem = ({ name, label, description, price, image, icon }) => {
  const { onOpen, onClose } = useModalStore((state) => state);
  const { user } = useAuthStore();
  const { buyItem } = useStoreActions();

  const hasEnoughMoney = user.money >= price;
  const buyConfig = {
    title: `Comprar ${label}`,
    description: `Estás seguro que quieres comprarlo por: ${price}`,
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
