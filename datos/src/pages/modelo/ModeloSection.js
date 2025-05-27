import React, { useState } from 'react';
import Swal from 'sweetalert2';
import aboutImg from '../../assets/img/about/cancermama.png';

const ModeloSection = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      Swal.fire({
        icon: 'warning',
        title: 'Imagen no seleccionada',
        text: 'Por favor, selecciona una imagen antes de subir.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:7860/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: '¡Imagen subida con éxito!',
          text: 'El análisis se realizó correctamente.',
        });
        setSelectedFile(null);
        setPreviewURL('');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo subir la imagen. Intenta nuevamente.',
        });
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Swal.fire({
        icon: 'error',
        title: 'Problema de conexión',
        text: 'Ocurrió un error durante la subida.',
      });
    }
  };

  return (
    <div className="row align-items-center pt-5 pb-5">
      
      {/* DIV IZQUIERDA - Imagen decorativa */}
      <div className="col-xl-6 col-lg-6 wow animate__fadeInLeft" data-wow-duration=".9s" data-wow-delay=".5s">
        <div className="text-center px-4">
          <img
            src={aboutImg}
            alt="Imagen educativa"
            style={{
              width: '100%',
              maxWidth: '700px',
              borderRadius: '20px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
              padding: '25px',
              backgroundColor: '#f8f9fa',
            }}
          />
        </div>
      </div>

      {/* DIV DERECHA - Formulario en una card */}
      <div className="col-xl-6 col-lg-6 wow animate__fadeInRight" data-wow-duration=".9s" data-wow-delay=".7s">
        <div
          className="card p-4 border-0 shadow-lg rounded-4"
          style={{ margin: '0 20px' }}
        >
          <div className="it-about-3-title-box">
            <span className="it-section-subtitle-3 d-inline-flex align-items-center mb-2">
              ANÁLISIS DE IMAGEN
            </span>

            <h2 className="it-section-title-3 pb-20">Sube tu Mamografía</h2>

            <p className="pb-20">
              Esta herramienta usa inteligencia artificial para analizar imágenes mamográficas y predecir la posibilidad de tumor benigno o maligno, considerando la densidad del tejido.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  className="form-control"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              {previewURL && (
                <div className="mb-3 text-center">
                  <img
                    src={previewURL}
                    alt="Vista previa"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '300px',
                      borderRadius: '10px',
                      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                </div>
              )}

              <button type="submit" className="btn btn-primary w-100">
                Subir Imagen
              </button>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ModeloSection;
