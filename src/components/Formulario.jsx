import { useState, useEffect } from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('')
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')

  const [error, setError] = useState(false)

  useEffect( () => {
    if(Object.keys(paciente).length > 0) {
      const {nombre, propietario, email, fecha, sintomas} = paciente

      setNombre(nombre)
      setPropietario(propietario)
      setEmail(email)
      setFecha(fecha)
      setSintomas(sintomas)
    }
  }, [paciente] )

  const getId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(30)

    return random + fecha
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Validando
    if( [nombre, propietario, email, fecha, sintomas].includes('') ) {
      setError(true)

      return
    } 
    
    setError(false)

    // Objeto de paciente
    const objPaciente = {
      nombre,
      propietario, 
      email, 
      fecha, 
      sintomas,
    }

    if(paciente.id) {
      // Editando Registro
      objPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map(pct => pct.id === paciente.id ? objPaciente : pct)

      setPacientes(pacientesActualizados)
      setPaciente({})
    } else {
      // Nuevo registro
      objPaciente.id = getId()
      setPacientes([...pacientes, objPaciente])
    }

    // Reiniciar Form
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento Pacientes</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Añade pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form 
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5"
        onSubmit={handleSubmit}
      >
        {error &&
          <Error
            mensaje={'Todos los campos son obligatorios'}
          />
        }
        <div className="mb-5">
          <label 
            htmlFor="nombre" 
            className="block text-gray-700 uppercase font-bold">
              Nombre Mascota
          </label>

          <input 
            id="nombre"
            type="text" 
            placeholder="Nombre Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={nombre}
            onChange = { (e) => setNombre(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="propietario" 
            className="block text-gray-700 uppercase font-bold">
              Nombre Propietario
          </label>

          <input 
            id="propietario"
            type="text" 
            placeholder="Nombre Propietario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={propietario}
            onChange = { (e) => setPropietario(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="email" 
            className="block text-gray-700 uppercase font-bold">
              Email
          </label>

          <input 
            id="email"
            type="email" 
            placeholder="Email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={email}
            onChange = { (e) => setEmail(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="alta" 
            className="block text-gray-700 uppercase font-bold">
              Alta
          </label>

          <input 
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange = { (e) => setFecha(e.target.value) }
          />
        </div>

        <div className="mb-5">
          <label 
            htmlFor="sintomas" 
            className="block text-gray-700 uppercase font-bold">
              Sintomas De La Mascota
          </label>

          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Sintomas"
            value={sintomas}
            onChange = { (e) => setSintomas(e.target.value) }
          />
        </div>

        <input 
          type="submit" 
          value={ paciente.id ? 'Editar' : 'Agregar' }
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold cursor-pointer hover:bg-indigo-700 transition-all" 
        />
      </form>
    </div>
  )
}

export default Formulario