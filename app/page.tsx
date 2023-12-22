import TelaContato from "./lib/ui/telaContato";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="mb-4 font-extrabold leading-none tracking-tight lg:text-2xl">
          Sistema de Compras - Contatos
        </h1>
        <TelaContato />        
      </div>
    </main>
  )
}
