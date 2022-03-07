import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from './Spinner';

export const VerCliente = () => {
    const [{ nombre, empresa, email, telefono, notas, id: idCliente }, setCliente] = useState({});
    const [cargando, setCargando] = useState(true);
    const { id } = useParams();
    useEffect(() => {
        const obtenerClienteAPI = async () => {
            try {
                const url = `http://localhost:4000/clientes/${id}`;
                const resp = await fetch(url);
                const resultado = await resp.json();
                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(!cargando);
        };
        obtenerClienteAPI();
    }, []);
    return (
        cargando ? <Spinner /> :
            (Boolean(nombre) ? (
                <div>
                    <h1 className='font-black text-4xl text-blue-900'>Ver Cliente:{nombre}</h1>
                    <p className='mt-3 '>Informacion del cliente</p>

                    <p className='text-4xl text-gray-600 mt-10'>
                        <span className=' text-gray-800 uppercase font-bold'>Cliente: </span>
                        {nombre}
                    </p>
                    <p className='text-2xl text-gray-600 mt-4'>
                        <span className=' text-gray-800 uppercase font-bold'>Email: </span>
                        {email}
                    </p>
                    {telefono && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Telefono: </span>
                            {telefono}
                        </p>
                    )}

                    {empresa && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Empresa: </span>
                            {empresa}
                        </p>)
                    }
                    {notas && (
                        <p className='text-2xl text-gray-600 mt-4'>
                            <span className=' text-gray-800 uppercase font-bold'>Notas: </span>
                            {notas}
                        </p>
                    )}
                </div>
            ) : (<p>No hay resultados</p>))
    )
}
