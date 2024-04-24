document.addEventListener('DOMContentLoaded', () => {
	//seleccionar los elementos de la interfaz
	const inputEmail = document.querySelector('#email');
	const inputAsunto = document.querySelector('#asunto');
	const inputMensaje = document.querySelector('#mensaje');

	//asignar eventos
	inputEmail.addEventListener('blur', function (e) {
		console.log(e.target.value);
	});
});
