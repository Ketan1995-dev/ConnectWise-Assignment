import React, { useEffect, useState } from 'react';
import './App.css';

interface IToDo{
  id:number;
  todo:string;
  completed:boolean;
  userId:number;
}

const pageSize = 10;

function App() {
  const [todos,setTodos] = useState<IToDo[]>([]);
  const [total,setTotal] = useState<number>(0);
  const [pageNumber,setPageNumber] = useState<number>(1);
  const totalPages = Math.ceil(total/pageSize);

  const pages = Array.from({length:totalPages},(_,i)=>i+1);

  const onPageClick = (currentPage:number)=>{
    setPageNumber(currentPage);
  }

  const onPreviousButtonClick = ()=>{
    setPageNumber(pageNumber-1);
  }

  const onNextButtonClick = ()=>{
    setPageNumber(pageNumber+1);
  }  

  useEffect(()=>{

    const itemsToSkip = (pageNumber-1)*pageSize;

    fetch('https://dummyjson.com/todos?limit='+pageSize+'&skip='+itemsToSkip)
    .then(res => res.json())
    .then((data)=>{
      console.log(data);
      setTodos(data.todos);
      setTotal(data.total);
      
    });

  },[pageNumber]);

  return (
    <div className="App">
      
      <table border={1}>
        <thead>
          <tr>
            <th>Task ID</th>
            <th>Todo</th>
            <th>Completed</th>
            <th>User ID</th>
          </tr>
        </thead>
        <tbody>
          {
            todos.map((todo)=>{
              return <tr>
              <td>{todo.id}</td>
              <td>{todo.todo}</td>
              <td>{todo.completed}</td>
              <td>{todo.userId}</td>
            </tr>
            })
          }
        </tbody>
      </table>
      <div style={{textAlign:'left'}}>
        { pageNumber>1 && <input type="button" value="<<" onClick={()=>onPageClick(1)} />}
        { pageNumber>1 && <input type="button" value="<" onClick={onPreviousButtonClick} />}

        {
            pages.map((p)=>{
              return <input type="button" value={p} onClick={()=>onPageClick(p)} />
            })
        }


        { pageNumber<totalPages && <input type="button" value=">" onClick={onNextButtonClick} />}
        { pageNumber<totalPages && <input type="button" value=">>" onClick={()=>onPageClick(totalPages)} /> }

      </div>
    </div>
  );


}

export default App;
