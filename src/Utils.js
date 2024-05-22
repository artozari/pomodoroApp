const validador = (cantCiclos, tiempoCiclos, tiempoIntervalo, tiempoDescanso, cantPomodoros) => {
  (cantCiclos > 0 && tiempoCiclos > 0 && tiempoIntervalo >= 0 && tiempoIntervalo < tiempoCiclos && tiempoDescanso >= 0 && cantPomodoros >= 0) ? true : false;
};

const horaFinal = (cantCiclos, tiempoCiclos, tiempoDescanso) => {
  const horaInicio = new Date().getTime();
  let horaFinalPomodoro = new Date(horaInicio + (cantCiclos * toMili(tiempoCiclos) + toMili(tiempoDescanso))).getTime();
  console.log('====================================');
  console.log("Hora inicio---- " + new Date(horaInicio).toLocaleTimeString());
  console.log("Hora fin------- " + new Date(horaFinalPomodoro).toLocaleTimeString());
  return new Date(horaFinalPomodoro).toLocaleTimeString();
};

function toMili(tiempo) {
  return tiempo * 60 * 1000;
}

const calcularAlarmas = (cantCiclos, tiempoCiclos, tiempoIntervalo, tiempoDescanso, cantPomodoros) => {
  let horasAlarmas = [];
  let horaInicio = new Date().getTime();
  for (let i = 0; i < cantCiclos; i++) {
    let horaAlarma = new Date(horaInicio + (i * (toMili(tiempoCiclos) + toMili(tiempoDescanso))));
    horasAlarmas.push(horaAlarma.toLocaleTimeString());
  }
  return horasAlarmas;
};

const tiempoRestante = (min) => {
  min = min * 60 * 1000;
  const horas = Math.floor(min / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutos = Math.floor((min % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const segundos = Math.floor((min % (1000 * 60)) / 1000).toString().padStart(2, "0");
  // const dias = Math.floor(min / (1000 * 60 * 60) / 24).toString().padStart(2, "");
  console.log(`${horas}:${minutos}:${segundos}`);
  let tiempoRestante = `${horas}: ${minutos}: ${segundos}`;
  return tiempoRestante;
};

const tiempoRestanteEnMili = (milisegundos) => {
  const horas = Math.floor(milisegundos / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutos = Math.floor((milisegundos % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const segundos = Math.floor((milisegundos % (1000 * 60)) / 1000).toString().padStart(2, "0");
  console.log(`${horas}:${minutos}:${segundos}`);
  let tiempoRestante = `${horas}: ${minutos}: ${segundos}`;
  return tiempoRestante;
};

export default {
  validador,
  horaFinal,
  calcularAlarmas,
  tiempoRestante,
  tiempoRestanteEnMili,
};
