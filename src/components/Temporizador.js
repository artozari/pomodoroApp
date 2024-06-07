import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, Alert, ToastAndroid as Toast } from "react-native";
import Util from "../Utils";

const Temporizador = ({ key, tempo, setTempo, tiempoRestante }) => {
  const [tRestante, setTRestante] = useState(tiempoRestante);
  const [horaTermino, setHoraTermino] = useState(Util.addTiempo(new Date(), Util.miliToMin(tiempoRestante)));
  console.log(tempo);

  let temporizador;

  useEffect(() => {
    temporizar(tRestante);
    return () => {
      clearInterval(temporizador);
    };
  }, [tempo]);

  const temporizar = (tiempoRest) => {
    if (tempo) {
      if (tiempoRest > 0) {
        temporizador = setInterval(() => {
          tiempoRest = tiempoRest - 1000;
          const horas = Math.floor(tiempoRest / (1000 * 60 * 60)).toString().padStart(2, "0");
          const minutos = Math.floor((tiempoRest % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
          const segundos = Math.floor((tiempoRest % (1000 * 60)) / 1000).toString().padStart(2, "0");
          setTRestante(horas + ":" + minutos + ":" + segundos);
          if (tiempoRest <= 0) {
            setTempo(false);
            Alert.alert("Pomodoro", "el temporizador termino");
            clearInterval(temporizador);
          }
        }, 1000);
      }
    } else {
      // Toast.show("Temporizador Cancelado", Toast.SHORT);
      setTRestante("00:00:00");
      clearInterval(temporizador);
    }
  };

  return (
    <View>
      <Text>{`${tempo}`}</Text>
      {tempo && <Text key={key} style={styles.timeText}> {`Restante: ${tRestante} Hora termino ${horaTermino}`}</Text>}
    </View>
  );
};

export default Temporizador;

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
