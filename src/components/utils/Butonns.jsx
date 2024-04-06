import React from 'react'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'
import { useFavorito } from '.'

const ImageButtons = ({ id }) => {
  const {
    favorito,
    guardado,
    mensaje,
    toggleFavorito,
    toggleGuardado,
    loading: favoritoLoading,
  } = useFavorito(id)

  return (
    <div className="card-buttons">
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            {favorito ? 'Eliminar de favoritos' : 'Agregar a favoritos'}
          </Tooltip>
        }
      >
        <button
          className={`btn btn-${favorito ? 'danger' : 'primary'} btn-sm`}
          onClick={toggleFavorito}
          disabled={favoritoLoading}
        >
          <i
            className={`bi bi-${favorito ? 'heartbreak-fill' : 'heart-fill'}`}
          ></i>
        </button>
      </OverlayTrigger>

      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip>
            {guardado ? 'Eliminar de colección' : 'Agregar a colección'}
          </Tooltip>
        }
      >
        <button
          className={`btn btn-${guardado ? 'danger' : 'primary'} btn-sm`}
          onClick={toggleGuardado}
          disabled={favoritoLoading}
        >
          <i
            className={`bi bi-${
              guardado ? 'bookmark-x-fill' : 'bookmark-heart-fill'
            }`}
          ></i>
        </button>
      </OverlayTrigger>
    </div>
  )
}

export default ImageButtons
