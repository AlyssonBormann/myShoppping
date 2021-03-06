import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";

import { styles } from "./styles";
import { Product, ProductProps } from "../Product";

export function ShoppingList() {
  const [products, setProducts] = useState<ProductProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
      .collection("products")
      .orderBy("description", "asc")
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        }) as ProductProps[];

        setProducts(data);
      });

    return () => subscribe();
  }, []);

  // Filtrando consultas
  // useEffect(() => {
  //   const subscribe = firestore()
  //     .collection("products")
  //     .where("quantity", "==", 1)
  //     .onSnapshot((querySnapshot) => {
  //       const data = querySnapshot.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];

  //       setProducts(data);
  //     });

  //   return () => subscribe();
  // }, []);

  //BUSCA APENAS A LISTA SEM SER REALTIME
  // useEffect(() => {
  //   firestore()
  //     .collection("products")
  //     .get()
  //     .then((response) => {
  //       const data = response.docs.map((doc) => {
  //         return {
  //           id: doc.id,
  //           ...doc.data(),
  //         };
  //       }) as ProductProps[];
  //       setProducts(data);
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <Product data={item} />}
      showsVerticalScrollIndicator={false}
      style={styles.list}
      contentContainerStyle={styles.content}
    />
  );
}
