import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Useauth';
import styles from './login.module.css';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    // catche any error coming from none response or rejected response
    try {
      const res = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError('Invalid credentials');
        return;
      }

      //const data =
      await res.json();
      login();
      navigate('/vehicles');
      //alert(`Welcome! User ID: ${data.userId}`);
    } catch (err) {
      setError('Unable to reach the server. Please try again.\n' + err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className={styles.page}>
        <div className={styles.card}>
          {/*<div className={styles.stripeBar} />*/}
          <div className={styles.body}>
            {/*<p className={styles.eyebrow}>Accoess Terminal</p>*/}
            <h2 className={styles.title}>Repair Shop Login</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  className={styles.input}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <input
                  id="password"
                  className={styles.input}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                />
              </div>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className={styles.dots}>Connecting</span>
                ) : (
                  'Login'
                )}
              </button>
            </form>
            {error && (
              <p className={styles.erroBox} role="alert">
                {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
