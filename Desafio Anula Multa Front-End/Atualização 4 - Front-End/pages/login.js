import React from 'react';
import "../src/app/login.css";
import Link from 'next/link'

export default function Login() {
    return (
        <div className="login-container">
            <header className="header">
                <h1 className='pomofocus'>
                    <Link href='/'>Pomofocus</Link>
                </h1>
                
            </header>

            <h1 className='login'>SIGN IN</h1>
            <div className='login-box'>
                
                <main className="main-container">
                    <p>EMAIL</p>
                    <form id="email-form">
                        <input id="email" type="email" placeholder="example@email.com" />
                    </form>
                    <p>SENHA</p>
                    <form id="password-form">
                        <input id="password" type="password" placeholder='digite sua senha' />
                    </form>
                    <form>
                        <Link href='/'>
                            <button id="login" className="enviar" type="submit">
                                Entrar
                            </button>
                        </Link>
                    </form>
                </main>
            </div>
            <footer id="footer">
                <p className='dnh'>Você não tem uma conta?</p>
                <Link href='/register' id="link">Criar conta</Link>
            </footer>
        </div>
    )
}