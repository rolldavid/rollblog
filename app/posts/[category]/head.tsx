  
  export default async function Head({ params: {category} }: {params: {category: string}}) {
   
    return (
      <>
        <title>{category}</title>
        <meta name="description" content={`Posts to help you grow as a developer.`} />
      </>
    )
  }