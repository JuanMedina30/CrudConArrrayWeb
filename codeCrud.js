//Creamos un arreglo para almacenar los datos
let Datos=[];

//Creamos un objeto para definir los tipos de datos que se ingresarán asi como el valor del campo
const objPersona={
    id: '',
    nombre:'',
    correo:'',
    edad:'',
    sexo:''
}

//Definimos esta varible para comprobar que el usuario quiera editar o agregar
let editar=false;

//Obtenemos los campos del formulario, los cuales se extrajeron del form de html
const formulario=document.querySelector('#formulario');
const nombreInput=document.querySelector('#nombre'); 
const correoInput=document.querySelector('#correo');
const edadInput=document.querySelector('#edad');
const sexoInput=document.querySelector('#sexo'); 
const botonAdd=document.querySelector('#botonAgregar');

//Vamos añadirle un evento al botón para validar que el formulario siempre este lleno al momento de darle submit
formulario.addEventListener('submit',validarFormulario);
function limpiarList(){
    const containerDatos=document.querySelector('.list');
    while(containerDatos.firstChild){
        containerDatos.removeChild(containerDatos.firstChild);
    }
}

//Función para limpiar el formulario
function limpiarForm(){
    nombreInput.value='';
    correoInput.value='';
    edadInput.value='';
    sexoInput.value='';
    
}
//Función para validar el formulario
function validarFormulario(e){
    e.preventDefault();
    if(nombreInput.value==='' || correoInput.value==='' || edadInput.value==='' || sexoInput.value==='') {
        alert('Todos los campos son obligatorios');
        return;
    }
    //Si editar es falso, no se añadiran los datos
    if (editar) {
        editarPersona();
        editar=false;
    } else{
        //Si editar es falso, se añadirán los datos
        objPersona.id=Date.now();
        objPersona.nombre=nombreInput.value;
        objPersona.correo=correoInput.value;
        objPersona.edad=edadInput.value;
        objPersona.sexo=sexoInput.value;
        agregarPersona();
        limpiarForm(); 
    }
        
}
//Función para limpiar el objeto persona
function limpiarObj(){
    objPersona.id='';
    objPersona.nombre='';
    objPersona.correo='';
    objPersona.edad='';
    objPersona.sexo='';
}

function agregarPersona(){
    Datos.push({...objPersona});
    mostrarPersona();
    limpiarForm();
    limpiarObj();
}

//Función para mostrar persona
function mostrarPersona(){
    const containerDatos=document.querySelector('.list');
    limpiarList();

    //ForEach que recorre el arreglo para desplegar los datos 
    Datos.forEach(persona =>  {
        const {id,nombre,correo,edad,sexo}=persona;
        const parrafo=document.createElement('p');
        parrafo.textContent=`${id} | ${nombre} | ${correo} | ${edad} | ${sexo} | `;
        parrafo.dataset.id=id;
        
        //Creación delotón para editar
        const editarBoton=document.createElement('button');
        editarBoton.onclick= () => cargarPersona(persona);
        editarBoton.textContent='Editar';
        editarBoton.classList.add('boton', 'botonEditar');
        parrafo.append(editarBoton);

        //Creación del botón para eliminar
        const eliminarBoton=document.createElement('button');
        eliminarBoton.onclick= () => eliminarPersona(id);
        eliminarBoton.textContent='Eliminar';
        eliminarBoton.classList.add('boton', 'botonEliminar');
        parrafo.append(eliminarBoton);

        //Creacion del separador de datos
        const hr = document.createElement('hr');
        containerDatos.appendChild(parrafo);
        containerDatos.appendChild(hr); 
        
    });

}

//Función para cargar personas al formulario
function cargarPersona(persona) {
   const {id, nombre, email, edad, sexo} = persona;
   nombreInput.value = nombre;
   correoInput.value = email;
   edadInput.value = edad;
   sexoInput.value = sexo;
  
   //Cambiar el texto del botón
   objPersona.id = id;
   formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
   editar=true;
}

//Función para editar persona
function editarPersona(persona) {
    objPersona.nombre = persona.nombre
    objPersona.correo = persona.correo
    objPersona.edad = persona.edad
    objPersona.sexo = persona.sexo
    
    containerDatos.map(persona =>{
        if(persona.id === objPersona.id) {
            persona.id=persona.id;
            persona.nombre=objPersona.nombre;
            persona.correo=objPersona.correo;
            persona.edad=objPersona.edad;
            persona.sexo=objPersona.sexo;
    }     
});
    limpiarForm();
    mostrarPersona();
    limpiarList();
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';
    //La "bandera" editar se cambiara a falso para que no se repita el proceso de modificación
    editar=false;
}

//Función para eliminar persona
function eliminarPersona(id){
    //Aqui se filtraran entre todos los datos que sean direfentes de la id
    Datos = Datos.filter(persona => persona.id !== id);
    limpiarList();
    mostrarPersona();
}

  
