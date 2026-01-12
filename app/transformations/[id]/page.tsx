import Image from "next/image"

export async function generateStaticParams() {
  try {
    const res = await fetch('https://dragonball-api.com/api/transformations?limit=100')
    if (!res.ok) return []
    const list = await res.json()

    return (list || []).map((t: any) => ({ ...t, id: String(t.id) }))
  } catch (e) {
    return []
  }
}

export default async function TransformationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  // Fetch the specific data for this transformation
  const res = await fetch(`https://dragonball-api.com/api/transformations/${id}`);
  const transformation = await res.json();
  const { name, ki, image } = transformation;

  return (
    <main style={{padding:24,color:'#fff'}}>
      <h1>Transformation: {name}</h1>
      <p style={{color:'#cfe7ff'}}>Ki: {ki}</p>
      <Image src={image} alt={name} width={360} height={360} style={{ objectFit: 'contain', objectPosition: 'center' }} />
    </main>
  )
}
