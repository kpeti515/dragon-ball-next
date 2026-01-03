export default function TechniquePage({ params }: { params: { id: string } }) {
  return (
    <main style={{padding:24,color:'#fff'}}>
      <h1>{params.id}</h1>
      <p style={{color:'#cfe7ff'}}>Technique details will go here.</p>
    </main>
  )
}
