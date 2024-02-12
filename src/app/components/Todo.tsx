"use client"

import { deleteTodo, editTodo } from "@/api";
import type { Task } from "@/types";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";

interface TodoProps {
    todo: Task;
}

const Todo = ({ todo }: TodoProps) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskContent, setEditedTaskContent] = useState(todo.text);

  useEffect(() => {
    if(isEditing) {
      ref.current?.focus();
    }
  })

  const handleEdit = async () => {
    setIsEditing(true);
  }
  const handleSave = async () => {
    await editTodo(todo.id, editedTaskContent);
    setIsEditing(false);
  }

  const handleDelete = async () => {
    await deleteTodo(todo.id);
  }

  return (
    <li
      key={todo.id}
      className="flex justify-between p-4 bg-white border-l-4 border-blue-500 rounded shadow"
    >
      {isEditing? 
      (<input type="text"
              ref={ref}
              value={editedTaskContent} 
              onChange={(e:ChangeEvent<HTMLInputElement>) => setEditedTaskContent(e.target.value)} 
              className="mr-2 py-1 px-2 rounded border-gray-400 border"
      />):
      (<span>{todo.text}</span>)
      }
      <div>
        {isEditing ? 
        (<button onClick={handleSave} 
                className="text-blue-500 mr-3">
                Save
          </button>): 
        (<button onClick={handleEdit} 
                  className="text-green-500 mr-3">
                  Edit
          </button>)
        }
        <button onClick={handleDelete} className="text-red-500">Delete</button>
      </div>
    </li>
  );
};

export default Todo;
