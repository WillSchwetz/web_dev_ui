import ReactDOM from "react-dom/client";
import React, { useState, setState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import CarDisplay from "./pages/CarDisplay";
import './styles.css'; // Import your styles

export default function App() {
  const [carXmlData, setCarXmlData] = useState("BEES")
  const [user, setUser] = useState();
  // useEffect(() => {
  //   fetch('../vehicles.xml')
  //     .then(response => response.text())
  //     .then(data => {
  //       const parser = new DOMParser();
  //       const xmlDoc = parser.parseFromString(data, "text/xml");
  //       setCarXmlData(xmlDoc);
  //     })
  // }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home user={user} />} />
          <Route path="cardisplay" element={<CarDisplay user={user} setUser={setUser} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);