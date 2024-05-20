import "../../src/app/edit.css";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

const Edit = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const onChange = (e) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`/api/tasks/${id}`);
      const data = await response.json();
      setTask(data);
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdate = async () => {
    const response = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });

    if (response.ok) {
      // Task update successfully
      router.push("/");
    } else {
      // Handle error
      alert("Failed to edit task");
    }
  };

  return (
    <>
      <div className="container">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="editar-tarefa">Editar Tarefa</h1>

          <Link href="/">
              <button className="cancelar">
                Cancelar
              </button>
            </Link>

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
            onClick={handleUpdate}
          >
            Editar tarefa
          </button>
        </form>
      </div>
      <Head>
        <title>Editar tarefa</title>
      </Head>
    </>
  );
};

export default Edit;