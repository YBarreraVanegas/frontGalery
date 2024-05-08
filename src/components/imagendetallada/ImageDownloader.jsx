const ImageDownloader = ({ imageUrl }) => {
  const handleDownloadImage = async () => {
    try {
      if (!imageUrl) {
        console.error('URL de imagen no válida')
        return
      }

      const response = await fetch(imageUrl, {
        headers: {
          Accept: 'image/*',
        },
      })

      if (!response.ok) {
        console.error(
          'La URL de la imagen no es válida o el servidor no devuelve una imagen.'
        )
        return
      }

      const blob = await response.blob()

      const contentType = response.headers.get('content-type')
      const extension = contentType.split('/')[1]
      const downloadFilename = `imagen_descargada.${extension}`

      const url = window.URL.createObjectURL(blob)
      const downloadLink = document.createElement('a')
      downloadLink.href = url
      downloadLink.download = downloadFilename
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error al descargar la imagen:', error)
    }
  }

  return (
    <button className="btn btn-primary" onClick={handleDownloadImage}>
      Descargar Imagen
    </button>
  )
}

export default ImageDownloader
