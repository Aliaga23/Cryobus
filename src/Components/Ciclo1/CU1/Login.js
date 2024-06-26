import React, { useState } from 'react';
import usuario from '../../../Assets/usuario.png';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../../../Assets/login_style.module.css';
import axios from 'axios';
import { useAuth } from '../../../contexts/AuthContext'; // Importa el contexto de autenticación

const Login = () => {
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Usa la función login del contexto de autenticación

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post('http://localhost:8081/login', { id: username, pass: password });
      console.log('Respuesta del servidor:', res.data);
      setError('');
      login({ user: res.data.user, roles: res.data.roles }); // Llama a la función login del contexto
      navigate('/');
    } catch (err) {
      console.error('Error al intentar iniciar sesión:', err);
      setError('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles['btn-volver']}>Volver</Link>
      <div className={styles.logo}>
        <img src={usuario} alt="Logo" />
      </div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Usuario</label>
        <input type="text" id="username" placeholder="Ingresa tu usuario" className={styles.input} onChange={e => setUser(e.target.value)} />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" className={styles.input} onChange={e => setPassword(e.target.value)} />
        <button type="submit" className={styles.button}>Iniciar sesión</button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
      <p><Link to="/register">Registrarse</Link></p>
    </div>
  );
};

export default Login;
