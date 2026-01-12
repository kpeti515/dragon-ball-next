const dummySagas = [
  { id: 'saga-1', name: 'Saiyan Saga' },
  { id: 'saga-2', name: 'Frieza Saga' },
  { id: 'saga-3', name: 'Cell Saga' },
]

export async function generateStaticParams() {
  return dummySagas.map((s) => ({ id: s.id }))
}

export default async function SagaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  return (
    <main style={{padding:24,color:'#fff'}}>
      <h1>{id}</h1>
      <p style={{color:'#cfe7ff'}}>Saga details will go here.</p>
    </main>
  )
}
