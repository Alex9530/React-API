import { useState } from "react";

const Card = ({ item, deleteItem, updateData }) => {
  const [nameEdit, setEditName] = useState(item.name);
  const [yearEdit, setEditYear] = useState(item.year);
  const [priceEdit, setEditPrice] = useState(item.price);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  };

  const edutItem = async (e, id) => {
    e.preventDefault();

    const newItem = {
      name: nameEdit,
      price: priceEdit,
      year: yearEdit,
    };
    try {
      const response = await fetch(
        `https://d7a534c94bd0760c.mokky.dev/products/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItem),
        }
      );
      const data = await response.json();
      toggleModal();

      if (!response.ok) {
        throw new Error(data.message || "somthing error");
      }
      updateData(data);
    } catch (error) {
      console.error("error:", error.message);
    }
  };

  return (
    <div>
      <li className="card">
        <h2>{item.name}</h2>
        <h3> {item.price}</h3>
        <h4>{item.year}</h4>
        <div className="button_container"> 
        <button className="button_edit " onClick={() => toggleModal(item)}>Редактировать</button>
        <button className="button_delete" onClick={() => deleteItem(item.id)}>Удалить</button>
        </div>
      </li>
      {modalOpen && (
        <form className="form_save" onSubmit={(e) => edutItem(e, item.id)}>
          <input
            value={nameEdit}
            onChange={(e) => setEditName(e.target.value)}
            type="text"
            placeholder="Название"
          />
          <input
            value={yearEdit}
            onChange={(e) => setEditYear(e.target.value)}
            type="text"
            placeholder="Цена"
          />
          <input
            value={priceEdit}
            onChange={(e) => setEditPrice(e.target.value)}
            type="text"
            placeholder="Год"
          />
          <button type="submit">Сохранить</button>
        </form>
      )}
    </div>
  );
};

export default Card;
