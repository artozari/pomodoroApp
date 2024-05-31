const validador = (cantCiclos, tiempoCiclos, tiempoIntervalo, tiempoDescanso, cantPomodoros) => {
  (cantCiclos > 0 && tiempoCiclos > 0 && tiempoIntervalo >= 0 && tiempoIntervalo < tiempoCiclos && tiempoDescanso >= 0 && cantPomodoros >= 0) ? true : false;
};

const horaFinal = (cantCiclos, tiempoCiclos, tiempoIntervalo, tiempoDescanso) => {
  const tiempoEnfoque = tiempoCiclos - tiempoIntervalo;
  const horaInicio = new Date().getTime();
  let horaFinalPomodoro = new Date(horaInicio + minToMili((cantCiclos * (tiempoCiclos) - tiempoIntervalo) + parseInt(tiempoDescanso)));
  console.log((cantCiclos * tiempoCiclos - tiempoIntervalo) + parseInt(tiempoDescanso) + " <================");
  tiempoRestante((cantCiclos * tiempoCiclos - tiempoIntervalo) + parseInt(tiempoDescanso));
  console.log("Hora inicio---- " + new Date(horaInicio).toLocaleTimeString());
  console.log("Hora fin------- " + new Date(horaFinalPomodoro).toLocaleTimeString());
  return new Date(horaFinalPomodoro).toLocaleTimeString();
};


function minToMili(min) {
  return min * 60 * 1000;
}

const calcularAlarmas = (cantCiclos, tiempoCiclos, tiempoIntervalo, tiempoDescanso, cantPomodoros) => {
  let horasAlarmas = [];
  let horaInicio = new Date().getTime();
  for (let i = 0; i < cantCiclos; i++) {
    let horaAlarma = new Date(horaInicio + (i * (toMili(tiempoCiclos) + toMili(tiempoDescanso))));
    horasAlarmas.push(horaAlarma.toLocaleTimeString());
  }
  console.log(`Alarmas ${horasAlarmas}`);
  return horasAlarmas;
};

const tiempoRestante = (min) => {
  min = min * 60 * 1000;
  const horas = Math.floor(min / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutos = Math.floor((min % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const segundos = Math.floor((min % (1000 * 60)) / 1000).toString().padStart(2, "0");
  console.log(`tiempo restante: ${horas}:${minutos}:${segundos}`);
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

const addTiempo = (fechaIni, tiempoEnMin) => {
  if (typeof fechaIni !== 'object' || fechaIni.constructor !== Date) { throw new Error("los tipos de datos no corresponden"); }
  const horaInicio = new Date(fechaIni).getTime();
  return new Date(horaInicio + minToMili(tiempoEnMin)).toLocaleTimeString();
};

const miliToMin = (mili) => {
  return mili / 60000;
};

function addHours(hour1, hour2) {
  const [hours1, minutes1, seconds1] = hour1.split(":").map(Number);
  const [hours2, minutes2, seconds2] = hour2.split(":").map(Number);

  let totalHours = hours1 + hours2;
  let totalMinutes = minutes1 + minutes2;
  let totalSeconds = seconds1 + seconds2;

  if (totalMinutes >= 60) {
    totalHours++;
    totalMinutes -= 60;
  }

  if (totalSeconds >= 60) {
    totalMinutes++;
    totalSeconds -= 60;
  }

  return `${totalHours.toString().padStart(2, "0")}:${totalMinutes.toString().padStart(2, "0")}:${totalSeconds.toString().padStart(2, "0")}`;
}

export default {
  validador,
  horaFinal,
  minToMili,
  calcularAlarmas,
  tiempoRestante,
  tiempoRestanteEnMili,
  addTiempo,
  miliToMin
};
