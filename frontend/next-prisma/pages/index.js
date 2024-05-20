import { useState, useEffect } from "react";
import "../src/app/globals.css";
import Link from "next/link";




const Menu = () => {
    const [tasks, setTasks] = useState([]);
    const [mode, setMode] = useState('work'); 
    const [time, setTime] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    

    useEffect(() => {
        let interval = null;
        if (isActive && time > 0) {
            interval = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        } else if (isActive && time === 0) {
            if (mode === 'work') {
                setMode('shortBreak');
                setTime(5 * 60); 
            } else if (mode === 'shortBreak') {
                setMode('work');
                setTime(25 * 60);
            } else if (mode === 'longBreak') {
                setMode('work');
                setTime(25 * 60);
            }
        }
        return () => clearInterval(interval);
    }, [isActive, time, mode]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        if (mode === 'work') {
            setTime(25 * 60);
        } else if (mode === 'shortBreak') {
            setTime(5 * 60);
        } else if (mode === 'longBreak') {
            setTime(15 * 60);
        }
        setIsActive(false);
    };

    const setPomodoro = () => {
        setMode('work');
        setTime(25 * 60);
        setIsActive(false);
    };

    const startShortBreak = () => {
        setMode('shortBreak');
        setTime(5 * 60);
        setIsActive(false);
    };

    const startLongBreak = () => {
        setMode('longBreak');
        setTime(15 * 60);
        setIsActive(false);
    };

    const addTime = (additionalTime) => {
        setTime(prevTime => prevTime + additionalTime);
    };

     const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
    };

    useEffect(() => {
      const fetchTasks = async () => {
        const response = await fetch("/api/tasks");
        const data = await response.json();
        setTasks(data);
      };

      
  
      fetchTasks();
    }, []);

    
    const getModeLabel = (mode) => {
        switch (mode) {
            case 'work':
                return 'Pomodoro';
            case 'shortBreak':
                return 'Intervalo Curto';
            case 'longBreak':
                return 'Intervalo Longo';
            default:
                return '';
        }
    };


    return (
        <div>
            
            <header className="header">

            <Link className="pomofocus" href="/">Pomofocus</Link>

           
                <nav className="navbar">
                    <ul className="nav-links">
                        
                        <li><Link href="/login">Entrar</Link></li>
                        <li><Link href="/register">Cadastrar</Link></li>
                    </ul>
                </nav>
            </header>


            <div className="main-content">
                <div className="pomodoro-container">
                    <div className="break-controls">
                        <div className="pomodoro-header">
                            <button className="btn-pomodoro" onClick={setPomodoro}>Pomodoro</button>
                            <button className="btn short-break-btn" onClick={startShortBreak}>
                                Intervalo Curto
                            </button>
                            <button className="btn long-break-btn" onClick={startLongBreak}>
                                Intervalo Longo
                            </button>
                        </div>
                    </div>
                    
                    <div className="mode-indicator">{getModeLabel(mode)}</div>
                    
                        <div className="timer">{formatTime(time)}</div>
                    
                    <div className="controls">
                        <div className="button-container">
                            <div className="button-container">
                              <button className={"btn " + (isActive ? 'pause-btn' : 'start-btn')} onClick={toggleTimer} id="button">
                                {isActive ? 'Pausar' : 'Começar'}
                                </button>
                            </div>
                
                        <div className="button-container">
                            <button className="btn-pause-btn" onClick={resetTimer} id="button">
                                Reiniciar
                            </button>
                        </div>
                        <div className="button-container">
                            <button className="btn add-time-btn" onClick={() => addTime(60)}>
                            + Add 1 Minuto
                        </button>
                        </div>
                
                    </div>
                    </div>
                </div>

                <div>
                    <div className="quadro-header">
                        <h1 className="tarefas">MINHAS TAREFAS</h1>
                        <Link  href="/create">
                        <button className="nova-tarefa">Criar nova tarefa</button>
                        </Link>
                    </div>
                    
                    <div className="quadro-tasks">
                    <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
                    </div>
                    <ul className="task-list">
                    {tasks.map((task) => (
                      <li key={task.id} className="task-item">
                    <div className="task-details">
                        <div className="task-title">{task.title}</div>
                        <div className="task-description">{task.description}</div>
                    </div>
                    
                    
                    <div className="task-actions">
                        <Link className="task-action" href={`/${task.id}/edit`}>Editar</Link>
                        <Link className="task-action" href={`/${task.id}/delete`}>Deletar</Link>
                    </div>
                    
                    </li>
                      ))}
                    </ul>
                    </div>
                </div>
            </div>


            


            

        </div>
    );
};

export default Menu;