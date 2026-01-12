import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../styles/Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [recettes, setRecettes] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    nom: "",
    description: "",
    ingredients: "",
    instructions: "",
    image: null,
  });

  // Vérifier admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      navigate("/");
    }
  }, [navigate]);

  //  Charger recettes
  useEffect(() => {
    fetchRecettes();
  }, []);

  const fetchRecettes = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/recettes");
      setRecettes(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  //  Cliquer sur modifier
  const handleEdit = (recette) => {
    console.log("RECETTE:", recette);
    setEditId(recette.id);
    setForm({
      nom: recette.nom,
      description: recette.description,
      ingredients: recette.ingredients,
      instructions: recette.instructions,
      image: null,
    });
  };

  //  Ajouter ou Modifier
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nom", form.nom);
    formData.append("description", form.description);
    formData.append("ingredients", form.ingredients);
    formData.append("instructions", form.instructions);
    if (form.image) formData.append("image", form.image);

    try {
      if (editId) {
        // UPDATE
        await axios.put(
          `http://localhost:5000/api/recettes/${editId}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        
        alert("Recette modifiée !");
      } else {
        // CREATE
        await axios.post("http://localhost:5000/api/recettes", formData);
        alert("Recette ajoutée !");
      }

      setForm({
        nom: "",
        description: "",
        ingredients: "",
        instructions: "",
        image: null,
      });
      setEditId(null);
      fetchRecettes();
    } catch (error) {
      console.error(error);
      alert("Erreur");
    }
  };

  // Supprimer
  const handleDelete = async (id) => {
    if (!window.confirm("Supprimer cette recette ?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/recettes/${id}`);
      fetchRecettes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard Admin</h1>

      {/* FORMULAIRE */}
      <form onSubmit={handleSubmit}>
        <input
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
          required
        />
        <input
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <input
          name="ingredients"
          placeholder="Ingrédients (séparés par ,)"
          value={form.ingredients}
          onChange={handleChange}
          required
        />
        <input
          name="instructions"
          placeholder="Instructions"
          value={form.instructions}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          onChange={(e) => setForm({ ...form, image: e.target.files[0] })}
        />

        <button type="submit">
          {editId ? "Mettre à jour" : "Ajouter"}
        </button>
      </form>

      {/* LISTE */}
      <div className="recettes-list">
        {recettes.map((r) => (
          <div key={r.id} className="recette-card">
            <h3>{r.nom}</h3>
            <p>{r.description}</p>

            <button onClick={() => handleEdit(r)}>Modifier</button>
            <button onClick={() => handleDelete(r.id)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
