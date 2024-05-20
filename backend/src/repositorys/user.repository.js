import { Prisma } from "@prisma/client";

export const createTask = async (data) => {
    const task = await Prisma.task.create({
        data
    });
    return task
}

import { prisma } from "../services/prisma.js";

export const createUser = async (data) => {
    const task = await prisma.user.create({
        data,
        select: {
            id: true,
            title: true,
            createdAt: true
        }
    });
    return task;
};

export const getAll = async () => {
    const task = await prisma.task.findMany({
        select: {
            id: true,
            title: true,
            createdAt: true
        }
    });
    return task;
}

export const getById = async (id) => {
    const task = await prisma.task.findUnique({
           where: {
            id
        },
        data,
        select: {
            id: true,
            title: true,
            createdAt: true
        }
    }); 
    return task;
}

export const updateTask = async (id, data) => {
    const task = await prisma.task.update({
        where: {
            id
        },
        data,
        select: {
            id: true,
            title: true,
            createdAt: true
        }
    }); 
    return task;
};

export const deleteTask = async (id) => {
    await prisma.task.delete({
        where: {
            id
        }
    });
    return;
}
