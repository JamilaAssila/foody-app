import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [recettes, setRecettes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/recettes");
        setRecettes(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

  const filteredRecettes = recettes.filter((r) =>
    r.nom.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="hero">
        <h1>Foody App</h1>
        <p>Découvrez des recettes simples et délicieuses</p>
      </div>

      <h1>Liste des Recettes</h1>
      <input
        className="search-input"
        type="text"
        placeholder="Rechercher une recette..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="recettes-grid">
        {filteredRecettes.map((r) => (
          <div key={r.id} className="card">
            <img src={`http://localhost:5000/uploads/${r.image}`} alt={r.nom} />
            <h3>{r.nom}</h3>
            <p>{r.description}</p>
            <Link to={`/recette/${r.id}`}>Voir la recette</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
