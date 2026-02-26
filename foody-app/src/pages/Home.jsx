import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Home.css";

function Home() {
  const [recettes, setRecettes] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Plats principaux");

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

  const recettesByCategory = recettes.reduce((acc, recette) => {
    if (!acc[recette.category]) acc[recette.category] = [];
    acc[recette.category].push(recette);
    return acc;
  }, {});

  const categories = [
    { name: "Entrées"},
    { name: "Plats principaux"},
    { name: "Desserts"},
    { name: "Boissons"},
  ];

  return (
    <div>
      <div className="hero">
        <h1>Foody App</h1>
        <p>Découvrez des recettes simples et délicieuses</p>
      </div>

      <div className="recettes-container">
        {/* Menu horizontal des catégories */}
        <div className="categories-bar">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
              onClick={() => setSelectedCategory(cat.name)}
            >
              {cat.emoji} {cat.name}
            </div>
          ))}
        </div>

        {/* Barre de recherche */}
        <input
          className="search-input"
          type="text"
          placeholder="Rechercher une recette..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Recettes */}
        <div className="recettes-grid">
       {recettesByCategory[selectedCategory]
    ?.filter((r) => r.nom.toLowerCase().includes(search.toLowerCase()))
    .map((r) => (
      <Link 
        key={r.id} 
        to={`/recette/${r.id}`} 
        className="card-link"
      >
        <div className="card">
          <img src={`http://localhost:5000/uploads/${r.image}`} alt={r.nom} />
          <h3>{r.nom}</h3>
        </div>
      </Link>
    ))}
</div>
      </div>
    </div>
  );
}

export default Home;