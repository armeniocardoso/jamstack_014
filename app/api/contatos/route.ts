import { getContatos, inserirContato } from '../../lib/infra/contatos';

export async function GET() {
  let contatos;
  try {
    contatos = await getContatos();
  } catch (error) {
    return Response.json({ error });
  }
  return Response.json({ contatos });
}

export async function POST(request: Request) {
  let contato = await request.json();
  try {
    contato = await inserirContato(contato);
  }catch(error) {
    return Response.json({ error });
  }  
  return Response.json({ mensagem: "Contato Incluído com sucesso" });
}
