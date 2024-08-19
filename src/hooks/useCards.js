import { useState, useEffect } from "react";
import { getCards, addCard, deleteCard } from "@/services/getCards";
import { useAuth } from "./useAuth";

const useCards = (accountId) => {
  const [cards, setCards] = useState([]);
  const {token} = useAuth()

  useEffect(() => {
    const fetchCards = async () => {
      const data = await getCards(accountId, token);
      setCards(data);
    };

    if (accountId) {
      fetchCards();
    }
  }, [accountId]);

  const handleAddCard = async (cardData) => {
    try {
      const newCard = await addCard(accountId, cardData, token);
      setCards((prevCards) => [...prevCards, newCard]);
    } catch (error) {
      console.error("Error adding card:", error);
    }
  };

  const handleDeleteCard = async (cardId ) => {
    try {
      await deleteCard(accountId, cardId, token);
      setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
    } catch (error) {
      console.error("Error deleting card:", error);
    }
  };

  return { cards, handleAddCard, handleDeleteCard };
};

export default useCards;
