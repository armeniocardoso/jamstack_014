import { sql } from "@vercel/postgres";
import { Contato } from "../domain/contatos";

export async function getContatos() {
    try {
        const consulta = await sql<Contato[]>`SELECT * FROM contatos ORDER BY nome`;
        return consulta.rows;
    } catch (erro) {
        console.error('Erro na consulta de contatos:', erro);
        throw new Error('Erro na consulta de contatos.');
    }
}

export async function getContato(id: string) {
    try {
        const consulta = await sql<Contato[]>`SELECT * FROM contatos WHERE id=${id}`;
        return consulta.rows[0];
    } catch (erro) {
        console.error('Erro na consulta de contatos:', erro);
        throw new Error('Erro na consulta de contatos.');
    }
}

export async function inserirContato(contato: Contato) {
    try {
        const consulta = await sql<Contato>`
            INSERT INTO contatos 
            ("nome", "email", "celular")
            VALUES (${contato.nome}, ${contato.email},${contato.celular})
            RETURNING id, nome, email, celular
        `;
        return consulta.rows[0];
    } catch (erro) {
        console.error('Erro na inclusão do contato:', erro);
        throw new Error('Erro na inclusão do contato.');
    }
}

export async function excluirContato(id: string) {
    try {
        const consulta = await sql<Contato>`
            DELETE FROM contatos 
            WHERE id=${id}
        `;
    } catch (erro) {
        console.error('Erro na exclusão do contato:', erro);
        throw new Error('Erro na exclusão do contato.');
    }
}

export async function editarContato(contato: Contato) {
    try {
        await sql`UPDATE contatos 
        SET nome=${contato.nome},  
        email=${contato.email},
        celular=${contato.celular}
        WHERE id=${contato.id}
        `;
    } catch (erro) {
        console.error('Erro na edição do contato:', erro);
        throw new Error('Erro na edição do contato.');
    }
}
