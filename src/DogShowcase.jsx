import { useEffect, useState } from "react";
import { fetchBreedImages, fetchBreeds } from "./api/dogApi";
import "./DogShowcase.css";

export default function DogShowcase() {
  const [images, setImages] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedBreed, setSelectedBreed] = useState({ id: 2, label: "Afghan Hound" });
  const [fullscreenImage, setFullscreenImage] = useState(null);

  async function loadBreedImages(breedId) {
    const imgs = await fetchBreedImages(breedId);
    setImages(imgs);
  }

  async function loadBreeds() {
    const list = await fetchBreeds();
    setBreeds(list);
  }

  useEffect(() => {
    loadBreeds();
    loadBreedImages(selectedBreed.id);
  }, []);

  function chooseBreed(breed) {
    setSelectedBreed({ id: breed.id, label: breed.name });
    loadBreedImages(breed.id);
    setShowDialog(false);
  }

  return (
    <div className="cyber-wrapper">
      <h1 className="cyber-title">🐶 {selectedBreed.label}</h1>

      <div className="cyber-panel neon-cyan">
        <div className="cyber-panel-header">
          <h2>{selectedBreed.label}</h2>
          <button className="cyber-btn" onClick={() => setShowDialog(true)}>
            Breeds
          </button>
        </div>

        <div className="cyber-grid">
          {images?.map?.((img, i) => (
            <div key={i} className="cyber-card">
              <img src={img.url} alt={selectedBreed.label} className="cyber-img" onClick={() => setFullscreenImage(img.url)} />
              <div className="cyber-card-footer">
                <span>{selectedBreed.label} #{i + 1}</span>
                <span>✨</span>
              </div>
            </div>
          ))}
        </div>Classic An
      </div>

      {showDialog && (
        <div className="cyber-dialog-backdrop">
          <div className="cyber-dialog neon-magenta">
            <h3>Select a Breed</h3>
pis
            <div className="breed-list">
              {breeds.map((b) => (
                <button
                  key={b.id}
                  className="breed-item"
                  onClick={() => chooseBreed(b)}
                >
                  {b.name}
                </button>
              ))}
            </div>

            <button className="cyber-btn" onClick={() => setShowDialog(false)}>
              Close
            </button>
          </div>
        </div>
      )}
      {fullscreenImage && (
  <div className="fullscreen-backdrop" onClick={() => setFullscreenImage(null)}>
    <img
      src={fullscreenImage}
      className="fullscreen-image"
      alt="Dog"
    />
  </div>
)}
    </div>
  );
}
