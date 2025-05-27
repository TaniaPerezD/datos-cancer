import React, { useState } from 'react';

const ModeloMain = () => {
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
      alert('Por favor selecciona una imagen.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile); // Cambia el nombre 'image' si tu backend espera otro nombre

    try {
      const response = await fetch('http://localhost:7860/predict', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('Imagen subida con éxito 🎉');
        // Opcional: resetear el form
        setSelectedFile(null);
        setPreviewURL('');
      } else {
        alert('Error al subir la imagen 😢');
      }
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      alert('Hubo un problema con la subida.');
    }
  };

  return (
    <main>
      <div className="container mt-5">
        <h1 className="mb-4 text-center">Sube tu Imagen</h1>
        <div className="it-signup-area pt-5 pb-5">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="imageUpload" className="form-label">
                    Selecciona una imagen
                  </label>
                  <input
                    className="form-control"
                    type="file"
                    id="imageUpload"
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
                      }}
                    />
                  </div>
                )}
                <div className="text-center">
                  <button type="submit" className="btn btn-primary">
                    Subir Imagen
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ModeloMain;
