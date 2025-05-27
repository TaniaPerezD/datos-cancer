import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Sparkles, Upload, CheckCircle, FolderOpen, Rocket } from 'lucide-react';
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
    <div className="container py-5" style={{ overflowX: 'hidden' }}>
      <div className="row align-items-center gx-5">
        {/* Imagen Izquierda */}
        <div className="col-lg-6 mb-5 mb-lg-0 animate__fadeInLeft" style={{ paddingRight: '3rem' }}>
          <div className="text-center">
            <img
              src={aboutImg}
              alt="Imagen educativa"
              style={{
                width: '100%',
                borderRadius: '20px',
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                backgroundColor: '#f8f9fa',
                padding: '20px',
              }}
            />
          </div>
        </div>

        <div className="col-lg-6 animate__fadeInRight d-flex justify-content-center" style={{ paddingLeft: '3rem' }}>
          <div
            className="card p-4 border-0 shadow-lg rounded-4"
            style={{
              backgroundColor: '#ffe6f0', 
              color: '#5a2a3c', 
              maxWidth: '500px',
              width: '100%',
              background: 'linear-gradient(135deg, #ffe9ef 0%, #ffc9d7 50%, #ffbccd 100%)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className="it-about-3-title-box">
              <span
                className="d-inline-block mb-2 fw-semibold"
                style={{
                  color: '#c2185b',
                  fontSize: '0.9rem',
                  letterSpacing: '0.5px',
                  background: 'linear-gradient(45deg, #c2185b, #e91e63)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={16} />
                ANÁLISIS DE IMAGEN
              </span>

              <h2
                className="pb-3"
                style={{
                  fontWeight: '700',
                  color: '#a12646',
                  background: 'linear-gradient(135deg, #a12646, #c2185b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                Sube tu Mamografía
              </h2>

              <p className="pb-3" style={{ fontSize: '1rem', color: '#5a2a3c' }}>
                Esta herramienta usa inteligencia artificial para analizar imágenes mamográficas y predecir la posibilidad de tumor benigno o maligno, considerando la densidad del tejido.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-3 text-center">
                  <label
                    htmlFor="fileUpload"
                    className="btn w-100 d-flex align-items-center justify-content-center gap-2"
                    style={{
                      backgroundColor: '#fff',
                      border: '2px dashed #fc809f',
                      borderRadius: '15px',
                      padding: '15px',
                      color: selectedFile ? '#5a2a3c' : '#a12646',
                      fontWeight: '600',
                      cursor: 'pointer',
                      background: selectedFile
                        ? 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
                        : 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
                      boxShadow: '0 4px 15px rgba(161, 38, 70, 0.1)',
                    }}
                  >
                    {selectedFile ? (
                      <>
                        <CheckCircle size={20} />
                        {selectedFile.name}
                      </>
                    ) : (
                      <>
                        <FolderOpen size={20} />
                        Elegir imagen de mamografía
                      </>
                    )}
                  </label>
                  <input
                    id="fileUpload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
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
                        borderRadius: '15px',
                        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                        border: '3px solid rgba(255, 255, 255, 0.8)',
                      }}
                    />
                  </div>
                )}

                <div className="it-video-button d-flex justify-content-center align-items-center gap-4">
                  <button
                    type="submit"
                    className="ed-btn-square theme d-flex align-items-center gap-2"
                    style={{
                      border: 'none',
                      background: 'linear-gradient(135deg, #a12646 0%, #c2185b 50%, #e91e63 100%)',
                      borderRadius: '12px',
                      padding: '12px 30px',
                      color: 'white',
                      fontWeight: '600',
                      fontSize: '1rem',
                      boxShadow: '0 6px 20px rgba(161, 38, 70, 0.3)',
                    }}
                  >
                    <Rocket size={18} />
                    <span>Subir Imagen</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeloSection;