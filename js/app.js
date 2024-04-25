document.addEventListener('DOMContentLoaded', () => {
	const email = {
		email: '',
		asunto: '',
		mensaje: '',
	};

	//seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector('#email');
	const inputAsunto = document.querySelector('#asunto');
	const inputMensaje = document.querySelector('#mensaje');
	const formulario = document.querySelector('#formulario');
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

	function mostrarAlerta(mensaje, referencia) {
		//comprueba si ya hay alerta
		limpiarAlerta(referencia);

		const error = document.createElement('p');
		error.textContent = mensaje;
		error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center');
		referencia.appendChild(error);
	}

	function comprobarEmail() {
		if (!Object.values(email).includes('')) {
			btnSumit.classList.remove('opacity-50');
			btnSumit.disabled = false;
			return;
		}
		btnSumit.classList.add('opacity-50');
		btnSumit.disabled = true;
	}

	function validar(e) {
		if (e.target.value.trim() === '') {
			mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
			email[e.target.id] = '';
			comprobarEmail();
			return;
		}

		if (e.target.id === 'email' && !validarEmail(e.target.value)) {
			mostrarAlerta('El email, no es valido', e.target.parentElement);
			email[e.target.id] = '';
			comprobarEmail();
			return;
		}
		limpiarAlerta(e.target.parentElement);

		//asignar los valores
		email[e.target.id] = e.target.value.trim().toLowerCase();

		comprobarEmail();
	}

	inputEmail.addEventListener('blur', validar);
	inputAsunto.addEventListener('blur', validar);
	inputMensaje.addEventListener('blur', validar);
	btnReset.addEventListener('click', function (e) {
		e.preventDefault();
		email.email = '';
		email.asunto = '';
		email.mensaje = '';

		formulario.reset();
		comprobarEmail();
	});
});
