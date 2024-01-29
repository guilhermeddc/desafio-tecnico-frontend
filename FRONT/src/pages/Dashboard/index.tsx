import React, { useCallback, useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";

import { DragItemCard, DraggableCard, NavBar } from "../../components";
import { cardService } from "../../services/api";
import { Listas } from "../../common/enums/listas";
import { Card } from "../../common/interfaces/cards";

const Dashboard: React.FC = () => {
  const [dragTemp, setDragTemp] = useState<HTMLElement | null>(null);

  const { data: cards } = useQuery({
    queryKey: ["cards"],
    queryFn: cardService.index,
  });

  const updateCard = useMutation({
    mutationFn: (data: Card) => cardService.update(data),
  });

  const handleDragStart = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      setDragTemp(e.currentTarget);
      console.log("dragStart", e.currentTarget.id);
    },
    []
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>): void => {
      e.preventDefault();
    },
    []
  );

  const handleDrop = useCallback(
    async (dropId: string): Promise<void> => {
      let card: Card | undefined;

      if (dragTemp) {
        document.getElementById(dropId)?.appendChild(dragTemp);
        const dpChildren = document
          .getElementById(dropId)
          ?.getElementsByClassName("drag");
        if (dpChildren) {
          for (let i = 0; i < dpChildren.length; i++) {
            card = cards?.find(
              (card) => card.id === (dpChildren[i] as HTMLElement).id
            );
          }
        }
      }

      if (card) {
        updateCard.mutateAsync({
          ...card,
          lista: dropId,
        });
      }
    },
    [cards, dragTemp, updateCard]
  );

  return (
    <main className="overflow-hidden">
      <NavBar />

      <div className="overflow-x-auto flex min-h-screen w-screen items-stretch justify-between space-x-10 p-10 bg-ada">
        <DraggableCard
          titulo="To Do"
          id={Listas.toDo}
          onDrop={() => handleDrop(Listas.toDo)}
          onDragOver={handleDragOver}
        >
          {cards
            ?.filter((card) => card.lista === Listas.toDo)
            ?.map((card) => (
              <DragItemCard
                key={card.id}
                data={card}
                onDragStart={handleDragStart}
              />
            ))}
        </DraggableCard>

        <DraggableCard
          titulo="Doing"
          id={Listas.inProgress}
          onDrop={() => handleDrop(Listas.inProgress)}
          onDragOver={handleDragOver}
        >
          {cards
            ?.filter((card) => card.lista === Listas.inProgress)
            ?.map((card) => (
              <DragItemCard
                key={card.id}
                data={card}
                onDragStart={handleDragStart}
              />
            ))}
        </DraggableCard>

        <DraggableCard
          titulo="Done"
          id={Listas.done}
          onDrop={() => handleDrop(Listas.done)}
          onDragOver={handleDragOver}
        >
          {cards
            ?.filter((card) => card.lista === Listas.done)
            ?.map((card) => (
              <DragItemCard
                key={card.id}
                data={card}
                onDragStart={handleDragStart}
              />
            ))}
        </DraggableCard>
      </div>
    </main>
  );
};

export default Dashboard;
