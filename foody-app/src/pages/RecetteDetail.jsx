import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/RecetteDetail.css"; // importer le CSS

function RecetteDetail() {
  const { id } = useParams();
  const [recette, setRecette] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecette = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/recettes/${id}`);
        setRecette(res.data);
      } catch (err) {
        console.error(err);
        setError("Recette introuvable !");
      } finally {
        setLoading(false);
      }
    };
    fetchRecette();
  }, [id]);

  if (loading) return <p style={{textAlign:"center", marginTop:"50px"}}>Chargement...</p>;
  if (error) return <p style={{textAlign:"center", marginTop:"50px", color:"red"}}>{error}</p>;

  return (
    <div className="recette-page">
      <div className="recette-card">
        <h1>{recette.nom}</h1>

        {recette.image && (
          <img
            src={`http://localhost:5000/uploads/${recette.image}`}
            alt={recette.nom}
          />
        )}

        <p>{recette.description}</p>

        <h3>Ingrédients</h3>
        <ul>
          {recette.ingredients.split(",").map((ing, index) => (
            <li key={index}>{ing.trim()}</li>
          ))}
        </ul>

        <h3>Instructions</h3>
        <p>{recette.instructions}</p>
      </div>
    </div>
  );
}

export default RecetteDetail;
