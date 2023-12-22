"use client"

import { useEffect, useState } from 'react';
import { Contato } from '../domain/contatos';

export default function TelaContato() {

    const [contatos, setContatos] = useState<Contato[]>([]);
    const [contato, setContato] = useState<Contato>({ id: "", nome: "", email: "", celular: "" });
    const [mensagem, setMensagem] = useState("");

    const handleSelect = async () => {
        const response = await fetch('/api/contatos');
        const data = await response.json();
        setContatos(data.contatos); 
    }

    useEffect(() => {
        handleSelect();
    }, []);

    const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setContato((objetoAtual) => {
            return { ...objetoAtual, [fieldName]: fieldValue }
        });
        setMensagem("");
    };

    const handleSave = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        if (contato.id.length > 0) {
            await fetch(`/api/contatos/${contato.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contato),
            })
                .then((response) => response.json())
                .then((data) => setMensagem(data.mensagem));
        } else {
            await fetch('/api/contatos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contato),
            })
                .then((response) => response.json())
                .then((data) => setMensagem(data.mensagem));
        }
        setContato({ id: "", nome: "", email: "", celular: "" });
        handleSelect();
    }

    const handleEdit = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let id = event.target.value;
        await fetch(`/api/contatos/${id}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(data => setContato(data.contato));
    }

    const handleDelete = async (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        let id = event.target.value;
        await fetch(`/api/contatos/${id}`, {
            method: 'DELETE',
        }).then(response => response.json()).then(data => setMensagem(data.mensagem));
        setContato({ id: "", nome: "", email: "", celular: "" });
        handleSelect();
    }

    return (
        <div>
            <form className="w-full">
                <input name='id' value={contato.id} onChange={handleChange} className="invisible" />
                <div className="flex flex-wrap -mx-3 mb-2">
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <input name="nome" value={contato.nome} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Nome" />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <input name="email" value={contato.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Email" />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <input name="celular" value={contato.celular} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Celular" />
                    </div>
                    <div className="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                        <button onClick={handleSave} className="bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">Salvar</button>
                    </div>
                </div>
            </form>
            <div className="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
                <p>{mensagem}</p>
            </div>
            <div className="md:px-50 py-1 w-full">
                <div className="shadow overflow-hidden rounded border-b border-gray-200">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Nome</th>
                                <th className="w-1/3 text-left py-3 px-4 uppercase font-semibold text-sm">Email</th>
                                <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Celular</th>
                                <th>&nbsp;</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-700">
                            {contatos &&
                                contatos.map((item) =>
                                    <tr key={item.id}>
                                        <td className="w-1/3 text-left py-3 px-4">{item.nome}</td>
                                        <td className="w-1/3 text-left py-3 px-4">{item.email}</td>
                                        <td className="w-1/3 text-left py-3 px-4">{item.celular}</td>
                                        <td><button onClick={handleEdit} value={item.id} className="bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">E</button></td>
                                        <td><button onClick={handleDelete} value={item.id} className="bg-gray-800 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">X</button></td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
