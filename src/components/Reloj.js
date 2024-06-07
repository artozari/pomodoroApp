import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';

const Reloj = () => {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());

  useEffect(() => { // No se toca!
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  return (
    <View>
      <Text style={styles.timeText}>{`${hora}`}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BF3F34",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
});

export default Reloj;