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
                setMode('rest');
                setTime(5 * 60); 
            } else {
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
        } else {
            setTime(5 * 60);
        }
        setIsActive(false);
    };

    const setPomodoro = () => {
        setMode('work');
        setTime(25 * 60);
        setIsActive(false);
    };

    const startShortBreak = () => {
        setMode('rest');
        setTime(5 * 60);
        setIsActive(false);
    };

    const startLongBreak = () => {
        setMode('rest');
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

    return (
        <div>
           
            <h1 className="desafio">Desafio Anula Multa - Pomofocus</h1>

            <div className="pomodoro-container">

                <div className="pomodoro-header">
                    <h1 onClick={setPomodoro} style={{ cursor: 'pointer' }}>POMODORO</h1>
                    
                    <div className="break-controls">
                        <button className="btn short-break-btn" onClick={startShortBreak}>
                            Intervalo Curto
                        </button>
                        <button className="btn long-break-btn" onClick={startLongBreak}>
                            Intervalo Longo
                        </button>
                    </div>
                </div>

                <div className="timer">{formatTime(time)}</div>

                <div className="controls">
                    <div className="button-container">
                        <div className="button-container">
                          <button className={"btn " + (isActive ? 'pause-btn' : 'start-btn')} onClick={toggleTimer} id="button">
                            {isActive ? 'Pausar' : 'Começar'}
                            </button>
                        </div>

                    

                    <div className="button-container">
                        <button className="btn pause-btn" onClick={resetTimer} id="button">
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


            <div className="quadro-tasks">

            <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
            <h1 className="text-3xl font-semibold">TAREFAS</h1>

            <Link
                className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
                href="/create"
              >
                Criar nova tarefa 
            </Link>

            </div>
            <ul>
            {tasks.map((task) => (
              <li key={task.id} className="py-2 flex justify-between w-full">
            <span>
            <strong>{task.title}</strong> - {task.description}
            </span>
            <span className="flex gap-2">
           <Link className="btn" href={`/${task.id}/edit`}>Editar</Link>
            <Link className="btn" href={`/${task.id}/delete`}>Deletar</Link>
            </span>
            </li>
  ))}
</ul>

</div>


            


            

        </div>
    );
};

export default Menu;