export default function SagaPage({ params }: { params: { id: string } }) {
  return (
    <main style={{padding:24,color:'#fff'}}>
      <h1>{params.id}</h1>
      <p style={{color:'#cfe7ff'}}>Saga details will go here.</p>
    </main>
  )
}
