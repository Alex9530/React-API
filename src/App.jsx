import { useEffect, useState } from "react";
import "./App.css";
import Card from "./components/Card";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [price, setPrice] = useState("");
 

 
 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://d7a534c94bd0760c.mokky.dev/products"
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || "somthing error");
        }
        setData(data);
      } catch (error) {
        console.error("error:", error.message);
      }
    };
    fetchData();
  }, []);
  const addItem = async (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now().toString(),
      name,
      price,
      year,
    };
    try {
      const response = await fetch(
        "https://d7a534c94bd0760c.mokky.dev/products",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
      if (!response.ok) {
        throw new Error(data.message || "somthing error");
      }
      const data = await response.json();
      setData((prevData) => [...prevData, data]);
      setName("");
      setYear("");
      setPrice("");
    } catch (error) {
      console.error("error:", error.message);
    }
  };



  const deleteItem = (id) => {
    fetch(`https://d7a534c94bd0760c.mokky.dev/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setData(data.filter((product) => product.id !== id));
    });
  };
  const updateData = (updatedItem) => {
    setData((prevData) =>
      prevData.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  };
  return (
    <div className="main">
      <div className="header">
      <form className="form_header" onSubmit={addItem}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Название"
        />
        <input
          value={year}
          onChange={(e) => setYear(e.target.value)}
          type="text"
          placeholder="Цена"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="text"
          placeholder="Год"
        />
        <button className="button_addition" type="submit">Добавить</button>
      </form>
      </div>
  

      <ul>
        {data.map((item) => (
          <Card
            key={item.id}
            item={item}
            deleteItem={deleteItem}
            updateData={updateData}
            
          />
        ))}
      </ul>
    </div>
  );
}

export default App;
