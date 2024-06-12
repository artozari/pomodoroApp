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
  let tEnfoque = minToMili(tiempoCiclos - tiempoIntervalo);
  let tIntervalo = minToMili(tiempoIntervalo);
  let tDescanso = minToMili(tiempoDescanso);
  let tRecorido = 0;
  if (cantCiclos > 0) {
    for (let i = 0; i < cantCiclos; i++) {
      tRecorido = tRecorido + tEnfoque;
      horasAlarmas.push(tRecorido);
      tRecorido = tRecorido + tIntervalo;
      horasAlarmas.push(tRecorido);
    }
    tRecorido = tRecorido + tDescanso - tIntervalo;
    horasAlarmas.push(tRecorido);
    console.log(horasAlarmas);
    horasAlarmas.splice(horasAlarmas.length - 2, 1);
  }
  return horasAlarmas;
};

const tiempoRestante = (min) => { // Dado número de minutos, calcula el tiempo restante en horas, minutos y segundos.
  min = min * 60 * 1000;
  const horas = Math.floor(min / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutos = Math.floor((min % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const segundos = Math.floor((min % (1000 * 60)) / 1000).toString().padStart(2, "0");
  console.log(`tiempo restante: ${horas}:${minutos}:${segundos}`);
  let tiempoRestante = `${horas}: ${minutos}: ${segundos}`;
  return tiempoRestante;
};

const tiempoRestanteEnMili = (milisegundos) => { //  Dado milisegundos, calcula el tiempo restante en horas, minutos y segundos.
  const horas = Math.floor(milisegundos / (1000 * 60 * 60)).toString().padStart(2, "0");
  const minutos = Math.floor((milisegundos % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, "0");
  const segundos = Math.floor((milisegundos % (1000 * 60)) / 1000).toString().padStart(2, "0");
  console.log(`${horas}:${minutos}:${segundos}`);
  let tiempoRestante = `${horas}: ${minutos}: ${segundos}`;
  return tiempoRestante;
};

const addTiempo = (fechaIni, tiempoEnMin) => {// retorna la hora en la que cierto tiempo dado terminara.
  if (typeof fechaIni !== 'object' || fechaIni.constructor !== Date) { throw new Error("los tipos de datos no corresponden"); }
  const horaInicio = new Date(fechaIni).getTime();
  return new Date(horaInicio + minToMili(tiempoEnMin)).toLocaleTimeString();
};

const miliToMin = (mili) => { // Retorna los minutos que genera los milisegundos dados
  return mili / 60000;
};

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
