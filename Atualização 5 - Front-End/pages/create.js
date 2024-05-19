import "../src/app/create.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

const Create = () => {
  const router = useRouter();
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    const response = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      // Task created successfully
      router.push("/");
    } else {
      // Handle error
      alert("Failed to create task");
    }
  };

  const handleCancel = () => {
    router.push("/"); // Redirecionar para a página principal do timer
  };


  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="criar-tarefa">CRIAR TAREFA</h1>

          <button
            className="cancelar"
            onClick={handleCancel}
          >
            Cancelar
          </button>

        </div>
        <form>
          <div className="mb-4">
            <label>Título</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="title"
              value={task?.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label>Descrição</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              name="description"
              value={task?.description}
              onChange={onChange}
            />
          </div>
          <button
            className="button-tarefa"
            type="button"
            onClick={handleCreate}
          >
            Criar tarefa
          </button>
        </form>
      </div>
      
    </>
  );
};

export default Create;