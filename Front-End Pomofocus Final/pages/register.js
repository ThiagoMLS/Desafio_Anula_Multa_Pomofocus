import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import "../src/app/register.css"

const SignupPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('/api/Users/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        console.error('Failed to register');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className='cadastro-container'>
      <header className="header">
        <h1 className='pomofocus'>
          <Link href='/'>Pomofocus</Link>
        </h1>
      </header>

      <h1 className='cadastro'>SIGN UP</h1>
      <div className='cadastro-box'>
        <main className="main-container">
          <form onSubmit={handleSubmit}>
            <p>NOME</p>
            <input
              id="name"
              type="text"
              placeholder="digite seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p>EMAIL</p>
            <input
              id="email"
              type="text"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <p>CRIE UMA SENHA</p>
            <input
              id="password"
              type="password"
              placeholder='digite sua senha'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <p>CONFIRME SUA SENHA</p>
            <input
              id="confirm-password"
              type="password"
              placeholder='confirme sua senha'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <button id="register" className="enviar" type="submit">
              Cadastrar
            </button>
          </form>
        </main>
      </div>

      <footer id="footer">
        <p className='dnh'>Você já tem uma conta?</p>
        <Link href='/login' id="link">Login</Link>
      </footer>
    </div>
  );
};

export default SignupPage;