import "../src/app/globals.css";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";



const Home = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/tasks");
      const data = await response.json();
      setTasks(data);
    };

    fetchTasks();
  }, []);



  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">

      
          
          
          <div className="quadro-tasks">

            <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
              <h1 className="text-3xl font-semibold">Tarefas</h1>
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

    </>
  );
};

export default Home;

