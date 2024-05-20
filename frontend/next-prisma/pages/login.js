import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Importe useRouter corretamente
import "../src/app/login.css"


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter(); // Use useRouter corretamente

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Adicione a lógica de submissão do formulário aqui
    const response = await fetch('/api/Users/logar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (response.ok) {
        const { token } = await response.json();
        // Armazene o token em algum lugar seguro, como cookies ou local storage
        localStorage.setItem('token', token);
        router.push('/');
      } else {
        console.error('Failed to login');
      }
  
  };

  return (
    <>
      <div className="login-container">
        <header className="header">
          <h1 className='pomofocus'>
            <Link href='/'>Pomofocus</Link>
          </h1>
        </header>

        <h1 className='login'>SIGN IN</h1>
        <div className='login-box'>
          <main className="main-container">
            <p>E-MAIL</p>
            <form onSubmit={handleSubmit}>
              <input 
                id="email" 
                type="text" 
                placeholder="example@email.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            

            <p className='senha'>SENHA </p>
            
              <input 
                id="password" 
                type="password" 
                placeholder='digite sua senha' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            

            
              <button id="login" className="enviar" type="submit">
                Entrar
              </button>
            </form>
          </main>
        </div>
        <footer id="footer">
          <p className='dnh'>Você não tem uma conta?</p>
          <Link href='/register' id="link">Criar conta</Link>
        </footer>
      </div>
    </>
  );
};

export default LoginPage;