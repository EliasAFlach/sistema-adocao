import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import * as animalsService from "../services/animalsService";

const AnimalsContext = createContext();

export const AnimalsProvider = ({ children }) => {
  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const list = await animalsService.list();
        if (active) setAnimals(list);
      } catch (e) {
        if (active) setError("Falha ao carregar animais. Tente novamente.");
      } finally {
        if (active) setLoading(false);
      }
    };
    fetchData();
    return () => { active = false; };
  }, []);

  const createAnimal = useCallback(async (payload) => {
    const created = await animalsService.create(payload); 
    setAnimals(prev => [...prev, created]);
    return created;
  }, []);

  const updateAnimal = useCallback(async (payload) => {
    const updated = await animalsService.update(payload); 
    setAnimals(prev => prev.map(a => (a.id === updated.id ? updated : a)));
    return updated;
  }, []);

  const deleteAnimal = useCallback(async (id) => {
    await animalsService.remove(id); 
    setAnimals(prev => prev.filter(a => a.id !== id));
  }, []);

  const value = {
    animals,
    loading,
    error,
    createAnimal,
    updateAnimal,
    deleteAnimal,
    setError
  };

  return <AnimalsContext.Provider value={value}>{children}</AnimalsContext.Provider>;
};

export const useAnimals = () => {
  const ctx = useContext(AnimalsContext);
  if (!ctx) throw new Error("useAnimals deve ser usado dentro de <AnimalsProvider>");
  return ctx;
};
