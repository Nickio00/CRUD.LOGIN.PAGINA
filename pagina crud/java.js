let listaEmpleados = [];

const objEmpleado = {
    id: '',
    nombre: '',
    curso: '',
    dni: '',
    carrera:'',
    direccion:'',
    mail:'',
    numero:'',
    
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreInput = document.querySelector('#nombre');
const cursoInput = document.querySelector('#curso');
const dniInput = document.querySelector('#dni');
const carrerInput=document.querySelector('#carrera');
const domicInput=document.querySelector('#direccion');
const emailInput=document.querySelector('#mail');
const numInput=document.querySelector('#numero');
const btnAgregarInput = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) { /*codigo para validar los campos*/
    e.preventDefault();

    if (nombreInput.value === '' || cursoInput.value === '' || dniInput.value === '' || carrerInput.value === '' || domicInput.value === '' || emailInput.value === '' || numInput.value === '' ){
        alert('Todos los campos se deben llenar');
        return; 
    }

    if (editando) {
        editarEmpleado();
        editando = false;
    } else {
        objEmpleado.id = Date.now();
        objEmpleado.nombre = nombreInput.value;
        objEmpleado.curso = cursoInput.value;
        objEmpleado.dni = dniInput.value;
        objEmpleado.carrera=carrerInput.value;
        objEmpleado.direccion=domicInput.value;
        objEmpleado.mail=emailInput.value;
        objEmpleado.numero=numInput.value;

        agregarEmpleado();
    }
}

function guardarlocalStorage(listaEmpleados){
    localStorage.setItem('alumnos', JSON.stringify(listaEmpleados))
}

function obtenerlocalStorage(){
    listaEmpleados=JSON.parse(localStorage.getItem('alumnos'))
    mostrarEmpleados()
} 

function agregarEmpleado() {  /*agregar a los alumnos*/

    listaEmpleados.push({ ...objEmpleado });

    guardarlocalStorage(listaEmpleados)
    obtenerlocalStorage()

    formulario.reset();
    limpiarObjeto();
}

function limpiarObjeto() {   /*vaciar label una vez presionado el boton*/
    objEmpleado.id = '';
    objEmpleado.nombre = '';
    objEmpleado.curso = '';
    objEmpleado.dni = '';
    objEmpleado.carrera= '';
    objEmpleado.direccion= '';
    objEmpleado.mail= '';
    objEmpleado.numero= '';
}

function mostrarEmpleados() { /*mostrar datos ingresados*/
    limpiarHTML();

    const divEmpleados = document.querySelector('.div-empleados');

    /*validar botones editar y eliminar*/
    listaEmpleados.forEach(empleado => {         
        const { id, nombre, curso, dni, carrera, direccion, mail, numero } = empleado;

        const parrafo = document.createElement('p');
        parrafo.textContent = `${id} - ${nombre} - ${curso} - ${dni}- ${carrera}- ${direccion}- ${mail}- ${numero} `;
        parrafo.dataset.id = id;

        const editarBoton = document.createElement('button');
        editarBoton.onclick = () => cargarEmpleado(empleado);
        editarBoton.textContent = 'Editar';
        editarBoton.classList.add('btn', 'btn-editar');
        parrafo.append(editarBoton);

        const eliminarBoton = document.createElement('button');
        eliminarBoton.onclick = () => eliminarEmpleado(id);
        eliminarBoton.textContent = 'Eliminar';
        eliminarBoton.classList.add('btn', 'btn-eliminar');
        parrafo.append(eliminarBoton);

        const hr = document.createElement('hr');

        divEmpleados.appendChild(parrafo);
        divEmpleados.appendChild(hr);
    });
}

function cargarEmpleado(empleado) { /*cargar datos empleados*/
    const { id, nombre, curso, dni, carrera, direccion, mail, numero } = empleado;

    nombreInput.value = nombre;
    cursoInput.value = curso;
    dniInput.value = dni;
    carrerInput.value=carrera;
    domicInput.value=direccion;
    emailInput.value=mail;
    numInput.value=numero;

    objEmpleado.id = id;

    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;
}

function editarEmpleado() { /*actualizar datos*/

    objEmpleado.nombre = nombreInput.value;
    objEmpleado.curso = cursoInput.value;
    objEmpleado.dni = dniInput.value;
    objEmpleado.carrera = carrerInput.value;
    objEmpleado.direccion = domicInput.value;
    objEmpleado.mail = emailInput.value;
    objEmpleado.numero = numInput.value;

    listaEmpleados.map(empleado => {

        if (empleado.id === objEmpleado.id) {
            empleado.id = objEmpleado.id;
            empleado.nombre = objEmpleado.nombre;
            empleado.curso = objEmpleado.curso;
            empleado.dni = objEmpleado.dni;
            empleado.carrera = objEmpleado.carrera;
            empleado.direccion = objEmpleado.direccion;
            empleado.mail = objEmpleado.mail;
            empleado.numero = objEmpleado.numero;
        

        }

    });

    guardarlocalStorage(listaEmpleados)
    obtenerlocalStorage()
    
    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;
}

function eliminarEmpleado(id) { /*eliminar*/

    listaEmpleados = listaEmpleados.filter(empleado => empleado.id !== id);
    guardarlocalStorage(listaEmpleados)
    obtenerlocalStorage()
}

function limpiarHTML() { 
    const divEmpleados = document.querySelector('.div-empleados');
    while (divEmpleados.firstChild) {
        divEmpleados.removeChild(divEmpleados.firstChild);
    }
}

obtenerlocalStorage()