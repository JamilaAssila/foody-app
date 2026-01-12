import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../styles/Login.css"; // même fichier CSS que Login

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  
  useEffect(() => {
    document.body.classList.add("login-page"); // on réutilise login-page
    return () => document.body.classList.remove("login-page");
  }, []);

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/register", { email, password });
      setSuccess("Compte créé avec succès !");
      setError("");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError("Erreur lors de la création du compte");
      setSuccess("");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Inscription</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={handleRegister}>Créer un compte</button>

        <p>
          Déjà un compte ? <Link to="/login">Se connecter</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
