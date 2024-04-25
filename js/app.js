document.addEventListener('DOMContentLoaded', () => {
	const email = {
		email: '',
		cc: '',
		asunto: '',
		mensaje: '',
	};

	//seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector('#email');
	const inputAsunto = document.querySelector('#asunto');
	const inputMensaje = document.querySelector('#mensaje');
	const inputCopia = document.querySelector('#cc');
	const formulario = document.querySelector('#formulario');
	const spinner = document.querySelector('#spinner');
	const btnSumit = document.querySelector('#formulario button[type="submit"]');
	const btnReset = document.querySelector('#formulario button[type="reset"]');

	function limpiarAlerta(ref) {
		const alerta = ref.querySelector('.bg-red-600');
		if (alerta) {
			alerta.remove();
		}
	}

	function validarEmail(email) {
		const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
		const resultado = regex.test(email);
		return resultado;
	}

	function mostrarAlerta(mensaje, referencia, tipo) {
		//comprueba si ya hay alerta
		limpiarAlerta(referencia);
		if (tipo === 'error') {
			const error = document.createElement('p');
			error.textContent = mensaje;
			error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
			referencia.appendChild(error);
		} else {
			const enviado = document.createElement('p');
			enviado.textContent = mensaje;
			enviado.classList.add(
				'bg-green-500',
				'text-white',
				'p-2',
				'text-center',
				'rounded-lg',
				'mt-10',
				'font-bold',
				'text-sm',
				'uppercase',
			);
			formulario.appendChild(enviado);
			setTimeout(() => {
				enviado.remove();
			}, 3000);
		}
	}

	function comprobarEmail() {
		const propiedades = Object.keys(email).filter((propiedades) => propiedades !== 'cc');
		const algunaPropiedadVacia = propiedades.some((propiedad) => email[propiedad] === '');
		if (!algunaPropiedadVacia) {
			btnSumit.classList.remove('opacity-50');
			btnSumit.disabled = false;
			return;
		}
		btnSumit.classList.add('opacity-50');
		btnSumit.disabled = true;
	}

	function validarFormatoEmail(e) {
		if (e.target.id === 'email' && !validarEmail(e.target.value)) {
			mostrarAlerta('El email, no es valido', e.target.parentElement, 'error');
			email[e.target.id] = '';
			comprobarEmail();
			return;
		}
		if (e.target.id === 'cc' && e.target.value === '') {
			limpiarAlerta(e.target.parentElement);
			comprobarEmail();
			if ('cc' in email) {
				email.cc = '';
			}
			return;
		}
		if (e.target.id === 'cc' && !validarEmail(e.target.value)) {
			mostrarAlerta('El email no es valido', e.target.parentElement, 'error');
			email[e.target.id] = '';
			comprobarEmail();
			return;
		}
		if (e.target.id === 'cc' && e.target.id !== '') {
			email.cc = e.target.value;
		}
		console.log(email);

		limpiarAlerta(e.target.parentElement);
	}

	function validar(e) {
		if (e.target.value.trim() === '') {
			mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement, 'error');
			email[e.target.id] = '';
			comprobarEmail();
			return;
		}
		validarFormatoEmail(e);
		//asignar los valores
		email[e.target.id] = e.target.value.trim().toLowerCase();
		comprobarEmail();
	}

	function resetForm(e) {
		e.preventDefault();
		email.email = '';
		email.asunto = '';
		email.mensaje = '';
		formulario.reset();
		comprobarEmail();
	}

	function enviarEmail(e) {
		e.preventDefault();
		spinner.classList.add('flex');
		spinner.classList.remove('hidden');
		btnSumit.classList.add('opacity-50');
		btnSumit.disabled = true;
		setTimeout(() => {
			spinner.classList.remove('flex');
			spinner.classList.add('hidden');
			resetForm(e);
			mostrarAlerta('Email Enviado Correctamente', formulario, 'correcto');
		}, 3000);
	}

	inputEmail.addEventListener('blur', validar);
	inputAsunto.addEventListener('blur', validar);
	inputMensaje.addEventListener('blur', validar);
	inputCopia.addEventListener('blur', validarFormatoEmail);
	formulario.addEventListener('submit', enviarEmail);
	btnReset.addEventListener('click', resetForm);
});
