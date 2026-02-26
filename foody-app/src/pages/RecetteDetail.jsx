import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RecetteDetail.css";

function RecetteDetail() {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [relatedRecettes, setRelatedRecettes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recettes/${id}`);
        const currentRecette = res.data;
        setRecette(currentRecette);

        const all = await axios.get("http://localhost:5000/api/recettes");

        const filtered = all.data.filter(
          r =>
            r.category === currentRecette.category &&
            r.id !== currentRecette.id
        );

        setRelatedRecettes(filtered);

      } catch (err) {
        console.error(err);
        setError("Recette introuvable !");
      } finally {
        setLoading(false);
      }
    };

    fetchRecette();
  }, [id]);

  if (loading)
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Chargement...</p>;

  if (error)
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
        {error}
      </p>
    );

    return (
      <div className="recette-page">
    
        <div className="recette-layout">
    
          {/* ===== COLONNE GAUCHE ===== */}
          <div className="recette-main">
            <div className="recette-card">
    
              {recette.image && (
                <img
                  className="recette-image"
                  src={`http://localhost:5000/uploads/${recette.image}`}
                  alt={recette.nom}
                />
              )}
    
              <div className="recette-content">
    
                <h1 className="recette-title">{recette.nom}</h1>
    
                <div className="recette-section description">
                  <h2>Description</h2>
                  <p>{recette.description}</p>
                </div>
    
                <div className="recette-section ingredients">
                  <h2>Ingrédients</h2>
                  <div className="ingredients-list">
                    {recette.ingredients?.split(",").map((ing, index) => (
                      <span key={index} className="ingredient-badge">
                        {ing.trim()}
                      </span>
                    ))}
                  </div>
                </div>
    
                <div className="recette-section instructions">
                  <h2>Instructions</h2>
                  <ol>
                    {recette.instructions?.split(".").map((step, index) => (
                      step.trim() && <li key={index}>{step.trim()}</li>
                    ))}
                  </ol>
                </div>
    
              </div>
            </div>
          </div>
    
          {/* ===== SIDEBAR DROITE ===== */}
          {relatedRecettes.length > 0 && (
            <div className="related-sidebar">
              <h2>Recettes similaires</h2>
    
              {relatedRecettes.map(r => (
                <Link
                  key={r.id}
                  to={`/recette/${r.id}`}
                  className="related-card-vertical"
                >
                  <img
                    src={`http://localhost:5000/uploads/${r.image}`}
                    alt={r.nom}
                  />
                  <h4>{r.nom}</h4>
                </Link>
              ))}
            </div>
          )}
    
        </div>
    
      </div>
    );
}

export default RecetteDetail;