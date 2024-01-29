import { Card } from "../../common/interfaces/cards";
import { api } from "../axios";

const index = async (): Promise<Card[]> => {
  const { data } = await api.get<Card[]>("/cards/");

  return data;
};

const store = async (card: Omit<Card, "id">): Promise<Card> => {
  const { data } = await api.post<Card>("/cards/", card);

  return data;
};

const update = async (card: Card): Promise<Card> => {
  const { data } = await api.put<Card>(`/cards/${card.id}`, card);

  return data;
};

const destroy = async (id: string): Promise<Card[]> => {
  const { data } = await api.delete<Card[]>(`/cards/${id}`);

  return data;
};

export const cardService = {
  index,
  store,
  update,
  destroy,
};
