import React from "react";

interface DraggableCardProps {
  id: string;
  titulo: string;
  onDrop?: (dropId: string) => void;
  onDragOver?: (e: React.DragEvent<HTMLDivElement>) => void;
  children?: React.ReactNode;
}

export const DraggableCard: React.FC<DraggableCardProps> = ({
  id,
  titulo,
  onDrop,
  onDragOver,
  children,
}) => {
  return (
    <div
      id={id}
      className="min-w-96 drop flex-1 bg-gray-100 rounded-md shadow-lg p-5 space-y-2 h-full min-h-96 overflow-y-auto"
      onDrop={() => onDrop?.(id)}
      onDragOver={onDragOver}
    >
      <div className="text-lime-500 block max-w-sm p-4 bg-ada border rounded-md shadow">
        <h5 className="text-xl font-bold tracking-tight text-center">
          {titulo}
        </h5>
      </div>
      {children}
    </div>
  );
};
