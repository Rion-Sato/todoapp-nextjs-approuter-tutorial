"use client"

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { addTodo } from '@/api';
import { v4 as uuidv4} from "uuid";

const AddTask = () => {
  const [taskContent, setTaskContent] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addTodo({ id: uuidv4(), text: taskContent});
    setTaskContent("");
  }

  return (
    <form onSubmit={handleSubmit} className='mb-4 space-y-3'>
      <input type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setTaskContent(e.target.value)} value={taskContent}
      className='w-full border px-4 py-2 rounded-lg focus:outline-none focus:border-blue-400'/>
      <button className='w-full px-4 py-2 text-white bg-blue-500 transform rounded hover:bg-blue-400 hover:scale-95 duration-200'>Add Task</button>
    </form>
  )
}

export default AddTask