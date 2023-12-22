import { excluirContato, getContato, editarContato } from "@/app/lib/infra/contatos";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  let contato;
  try {
    contato = await getContato(params.id);
  } catch (error) {
    return Response.json({ error });
  }
  return Response.json({ contato });
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await excluirContato(params.id);
  } catch (error) {
    return Response.json({ error });
  }
  return Response.json({ mensagem: "Contato Excluído com sucesso" });
}

export async function PUT(request: Request) {
  let contato = await request.json();
  try {
    contato = await editarContato(contato);
  } catch(error) {
    return Response.json({ error });
  }  
  return Response.json({ mensagem: "Contato Editado com sucesso" });
}