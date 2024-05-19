import React from 'react'
import Link from 'next/link'
import "../src/app/register.css"

export default function Login() {
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
                        <p>NOME</p>
                        <form id="text-form">
                            <input id="text" type="text" placeholder="digite seu nome" />
                        </form>

                        <p>EMAIL</p>
                        <form id="email-form">
                            <input id="email" type="email" placeholder="example@email.com" />
                        </form>

                        <p>CRIE UMA SENHA</p>
                        <form id="password-form">
                            <input id="password" type="password" placeholder='digite sua senha'/>
                        </form>

                      
                        <form>
                                <Link href='/login'>
                                    <button id="login" className="enviar" type="submit">
                                    Cadastrar
                                    </button>
                                </Link>
                        </form>
                    </main>
            </div>
            

            <footer id="footer">
                <p className='dnh'>Você já tem uma conta?</p>
                <Link href='/login' id="link">Login</Link>
            </footer>
        </div>
    )
}