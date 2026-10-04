import { ref } from 'vue';

export function useClima() {
  const datos = ref(null);
  const cargando = ref(false);
  const error = ref(null);

  const obtenerClima = async () => {
    cargando.value = true;
    error.value = null;

    try {
      const respuesta = await fetch(
        'https://api.open-meteo.com/v1/forecast?latitude=14.6349&longitude=-90.5069&current=temperature_2m,relative_humidity_2m,weather_code&timezone=America%2FGuatemala'
      );

      if (!respuesta.ok) {
        throw new Error(`Error ${respuesta.status}`);
      }

      datos.value = await respuesta.json();
    } catch (e) {
      error.value = 'No pudimos obtener el clima en este momento.';
      console.error(e);
    } finally {
      cargando.value = false;
    }
  };

  return {
    datos,
    cargando,
    error,
    obtenerClima
  };
}