<script setup>
import { ref, reactive, computed } from 'vue'

// Los datos del formulario, todos en un objeto
const datos = reactive({
  nombre: '',
  correo: '',
  interes: '',
  mensaje: '',
  acepta: false,
})

// Qué campos ya tocó el usuario (para no mostrar errores antes de tiempo)
const tocado = reactive({
  nombre: false, correo: false, interes: false, mensaje: false, acepta: false,
})

const enviando = ref(false)
const enviado  = ref(false)
const resumen  = ref({ nombre: '', correo: '', interes: '' })

// ---------- Validación: se CALCULA, no se guarda ----------
const errores = computed(() => ({
  nombre: datos.nombre.trim().length < 3
    ? 'Escribe tu nombre (mínimo 3 letras)' : '',
  correo: !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(datos.correo)
    ? 'Escribe un correo válido, por ejemplo ana@correo.com' : '',
  interes: datos.interes === ''
    ? 'Elige un motivo de contacto' : '',
  mensaje: datos.mensaje.trim().length < 10
    ? 'Cuéntanos un poco más (mínimo 10 caracteres)' : '',
  acepta: !datos.acepta
    ? 'Debes aceptar para poder responderte' : '',
}))

const esValido = computed(() =>
  Object.values(errores.value).every(e => e === '')
)

function mostrarError(campo) {
  return tocado[campo] && errores.value[campo] !== ''
}

// ---------- Procesar el envío ----------
async function enviar() {
  if (!esValido.value) {
    // marca todos como tocados para mostrar todos los errores de golpe
    Object.keys(tocado).forEach(k => { tocado[k] = true })
    return
  }

  enviando.value = true
  console.log('Datos recibidos del formulario:', { ...datos })

  await new Promise(r => setTimeout(r, 700))   // simula el envío al servidor

  resumen.value = {
    nombre: datos.nombre,
    correo: datos.correo,
    interes: datos.interes,
  }
  enviando.value = false
  enviado.value = true
}

function nuevoMensaje() {
  Object.assign(datos, {
    nombre: '', correo: '', interes: '', mensaje: '', acepta: false,
  })
  Object.keys(tocado).forEach(k => { tocado[k] = false })
  enviado.value = false
}
</script>


<template>
<div class="contenedor seccion">

<!-- Pantalla de éxito -->
<template v-if="enviado">
  <div class="exito">
    <h3>✅ ¡Gracias, {{ resumen.nombre }}!</h3>
    <p>Recibimos tu mensaje sobre <strong>{{ resumen.interes }}</strong>.</p>
    <p>Te responderemos a <strong>{{ resumen.correo }}</strong> en menos de 24 horas.</p>
  </div>
  <p style="margin-top: 1.5rem">
    <button class="boton boton--borde" @click="nuevoMensaje">
      Enviar otro mensaje
    </button>
  </p>
</template>

<!-- El formulario -->
<template v-else>
  <h2>Hablemos</h2>
  <p class="seccion__intro">
    ¿Quieres hacer un pedido, vender Raíz en tu negocio o solo saludar?
    Escríbenos.
  </p>

  <form class="formulario" novalidate @submit.prevent="enviar">

    <div class="campo" :class="{ 'campo--error': mostrarError('nombre') }">
      <label for="nombre">Nombre completo</label>
      <input
        id="nombre"
        v-model.trim="datos.nombre"
        type="text"
        placeholder="Ana Rodríguez"
        @blur="tocado.nombre = true"
      >
      <span v-if="mostrarError('nombre')" class="mensaje-error">
        {{ errores.nombre }}
      </span>
    </div>

    <div class="campo" :class="{ 'campo--error': mostrarError('correo') }">
      <label for="correo">Correo electrónico</label>
      <input
        id="correo"
        v-model.trim="datos.correo"
        type="email"
        placeholder="ana@correo.com"
        @blur="tocado.correo = true"
      >
      <span v-if="mostrarError('correo')" class="mensaje-error">
        {{ errores.correo }}
      </span>
    </div>

    <div class="campo" :class="{ 'campo--error': mostrarError('interes') }">
      <label for="interes">Motivo</label>
      <select id="interes" v-model="datos.interes" @blur="tocado.interes = true">
        <option value="">Elige una opción</option>
        <option value="pedido">Hacer un pedido</option>
        <option value="mayoreo">Comprar al por mayor</option>
        <option value="alianza">Vender Raíz en mi negocio</option>
        <option value="otro">Otro</option>
      </select>
      <span v-if="mostrarError('interes')" class="mensaje-error">
        {{ errores.interes }}
      </span>
    </div>

    <div class="campo" :class="{ 'campo--error': mostrarError('mensaje') }">
      <label for="mensaje">Mensaje</label>
      <textarea
        id="mensaje"
        v-model="datos.mensaje"
        rows="4"
        placeholder="Cuéntanos qué necesitas…"
        @blur="tocado.mensaje = true"
      ></textarea>
      <span class="ayuda">{{ datos.mensaje.length }} caracteres</span>
      <span v-if="mostrarError('mensaje')" class="mensaje-error">
        {{ errores.mensaje }}
      </span>
    </div>

    <label class="checkbox">
      <input v-model="datos.acepta" type="checkbox">
      Acepto que usen mi correo para responder a esta consulta.
    </label>

    <button class="boton" type="submit" :disabled="enviando">
      {{ enviando ? 'Enviando…' : 'Enviar mensaje' }}
    </button>
  </form>
</template>

</div>
</template>