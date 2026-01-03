export default function TransformationPage({ params }: { params: { id: string } }) {
  return (
    <main style={{padding:24,color:'#fff'}}>
      <h1>Transformation {params.id}</h1>
      <p style={{color:'#cfe7ff'}}>Transformation details will go here.</p>
    </main>
  )
}
