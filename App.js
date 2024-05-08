import React, { useState, useEffect, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, StatusBar, TextInput, TouchableOpacity, ScrollView, Alert } from "react-native";

export default function App() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString());
  const [cantCiclos, setCantCiclos] = useState("");
  const [tiempoCiclos, setTiempoCiclos] = useState("");
  const [tiempoIntervalo, setTiempoIntervalo] = useState("");
  const [tiempoDescanso, setTiempoDescanso] = useState("");
  const [cantPomodoros, setCantPomodoros] = useState("");
  const [tempo, setTiempoRestante] = useState("");

  const Input2 = useRef(null);
  const Input3 = useRef(null);
  const Input4 = useRef(null);
  const Input5 = useRef(null);

  const comenzar = () => {
    const tiempoInicio = new Date().getTime();
    const cicloMiliSeg = tiempoCiclos * 60 * 1000;
    const horaFinalCiclo = tiempoInicio + cicloMiliSeg;
    let tiempoRestante = horaFinalCiclo - tiempoInicio;
    const temporizador = setInterval(() => {
      tiempoRestante = tiempoRestante - 1000;
      const horas = Math.floor(tiempoRestante / (1000 * 60 * 60)).toString().padStart(2, "0");
      const minutos = Math.floor((tiempoRestante % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
      const segundos = Math.floor((tiempoRestante % (1000 * 60)) / 1000).toString().padStart(2, "0");
      setTiempoRestante(`${horas}:${minutos}:${segundos}`);
      console.log(tempo);
      if (tiempoRestante <= 0) {
        Alert.alert("Pomodoro", "el temporizador termino")
        clearInterval(temporizador);
      }
    }, 1000);
  };

  const detener = () => {
    setTiempoRestante(0)
  }

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(intervalo); // Función de limpieza para evitar fugas de memoria
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <StatusBar backgroundColor="#D9183B" barStyle="default" />
        <Text style={styles.titleMain}>Pomodoro</Text>
        <Text style={styles.timeText}>{`${hora}`}</Text>
        {tiempoCiclos > 0 && <Text style={styles.timeText}>{`${tempo}`}</Text>}
        <Text style={styles.descriptionText}>
          {"* "}
          Manual corto para utilizar tu aplicación: Configuración Cantidad de ciclos: Configura el número de ciclos que deseas realizar
          en la sesión de Pomodoro. Tiempo de ciclo: Configura el tiempo de cada ciclo (por defecto es de 25 minutos). Tiempo de
          descanso: Configura el tiempo de descanso entre cada ciclo (por defecto es de 5 minutos). Iniciar sesión Presiona el botón
          "Iniciar" para comenzar la sesión de Pomodoro. El temporizador comenzará a contar hacia atrás desde el tiempo configurado para
          cada ciclo. Campos Hora: Muestra la hora actual. Cantidad de ciclos: Muestra el número de ciclos que has completado. Tiempo
          restante: Muestra el tiempo restante para completar el ciclo actual. Botones Iniciar: Comienza la sesión de Pomodoro. Centrar
          en mi ubicación: Centra el mapa en tu ubicación actual. Buscar: Busca lugares en el mapa. Espero que este manual sea más útil
          para ti.
        </Text>
        <TextInput
          returnKeyLabel="dale"
          returnKeyType="next"
          style={styles.textInput}
          placeholder="Cantidad de ciclos"
          keyboardType="numeric"
          onChangeText={setCantCiclos}
          onSubmitEditing={() => Input2.current.focus()}
        />
        <TextInput
          returnKeyType="next"
          style={styles.textInput}
          placeholder="Tiempo de ciclos"
          keyboardType="numeric"
          onChangeText={setTiempoCiclos}
          onSubmitEditing={() => Input3.current.focus()}
          ref={Input2}
        />
        <TextInput
          returnKeyType="next"
          style={styles.textInput}
          placeholder="Intervalos del ciclo"
          keyboardType="numeric"
          onChangeText={setTiempoIntervalo}
          onSubmitEditing={() => Input4.current.focus()}
          ref={Input3}
        />
        <TextInput
          returnKeyType="next"
          style={styles.textInput}
          placeholder="Tiempo de descanso"
          keyboardType="numeric"
          onChangeText={setTiempoDescanso}
          onSubmitEditing={() => Input5.current.focus()}
          ref={Input4}
        />
        <TextInput
          returnKeyLabel="fin"
          returnKeyType="done"
          style={styles.textInput}
          placeholder="Cantidad de Pomodoros"
          keyboardType="numeric"
          onChangeText={setCantPomodoros}
          ref={Input5}
        />
        <Text>
          {cantCiclos} + {tiempoCiclos} + {tiempoIntervalo} + {tiempoDescanso} + {cantPomodoros}
        </Text>
        <TouchableOpacity style={styles.button} onPress={comenzar}>
          <Text>INICIAR MÉTODO POMODORO</Text>
        </TouchableOpacity>
        {tiempoCiclos > 0 &&
          <TouchableOpacity style={styles.button} onPress={detener}>
            <Text>DETENER</Text>
          </TouchableOpacity>}
      </ScrollView>
    </SafeAreaView >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#732929",
    alignItems: "center",
    justifyContent: "center",
  },
  titleMain: {
    marginVertical: 20,
    color: "#F2F2F2",
    fontSize: 40,
    fontStyle: "normal",
    fontWeight: "bold",
  },
  textInput: {
    height: 40,
    width: "80%", // 80% del ancho del contenedor
    borderColor: "gray",
    borderWidth: 1,
    marginTop: 8,
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#FFF",
    color: "#333",
  },
  button: {
    marginVertical: 20,
    backgroundColor: "#D9183B",
    padding: 10,
    borderRadius: 5,
    width: "60%",
    alignItems: "center", // Centra el texto dentro del botón
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  timeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#BF3F34",
    textAlign: "center",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  descriptionText: {
    fontSize: 16,
    color: "#F24738",
    textAlign: "justify",
    padding: 10,
    lineHeight: 24,
    marginBottom: 20,
    padding: 40,
  },
  scrollViewContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
