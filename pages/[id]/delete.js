import "../globals.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Delete = () => {
  const router = useRouter();
  const { id } = router.query;

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

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
      method: "DELETE"
    });

    if (response.ok) {
      // Task deleted successfully
      router.push("/");
    } else {
      // Handle error
      alert("Failed to delete task");
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Deletar Tarefa</h1>
        </div>
        <form>
          <div className="my-12">
          Você tem certeza que quer deletar <strong>{task?.title}</strong>?
          </div>
          <div className="flex w-full gap-2">
            <Link
              href="/"
              className="text-center bg-gray-300 hover:bg-opacity-80 text-black rounded-lg px-4 py-2 duration-200 w-full"
            >
              Cancelar
            </Link>
            <button
              className="bg-red-500 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
              type="button"
              onClick={handleUpdate}
            >
              Deletar
            </button>
          </div>
        </form>
      </div>
      <Head>
        <title>Deletar Tarefa</title>
      </Head>
    </>
  );
};

export default Delete;