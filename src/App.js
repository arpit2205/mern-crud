import "./App.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState(0);
  const [foodList, setFoodList] = useState([]);
  const [newFoodName, setNewFoodName] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3001/read").then((response) =>
      setFoodList(response.data)
    );
  }, []);

  const addToDatabase = () => {
    Axios.post("http://localhost:3001/insert", {
      foodName: foodName,
      calories: calories,
    });

    window.location.reload();
  };

  const updateFood = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      newFoodName: newFoodName,
    });

    window.location.reload();
  };

  const deleteFood = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`);
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>CRUD App with MERN</h1>
        <div>
          <label>Food Name</label>
          <input type="text" onChange={(e) => setFoodName(e.target.value)} />
        </div>
        <div>
          <label>Calories</label>
          <input type="number" onChange={(e) => setCalories(e.target.value)} />
        </div>
        <button onClick={addToDatabase}>Add to Database</button>

        <h2>Food List</h2>
        {foodList.map((food, key) => (
          <div key={key} style={{ border: "1px solid black", margin: "16px" }}>
            <h3>{food.foodName}</h3>
            <h4>{food.calories} calories</h4>
            <input
              type="text"
              placeholder="New food name..."
              onChange={(e) => setNewFoodName(e.target.value)}
            />
            <button onClick={() => updateFood(food._id)}>Update</button>
            <button onClick={() => deleteFood(food._id)}>Delete</button>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
