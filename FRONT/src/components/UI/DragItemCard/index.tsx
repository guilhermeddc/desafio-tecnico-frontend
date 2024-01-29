import Markdown from "react-markdown";
import React, { useState } from "react";
import { Card } from "../../../common/interfaces/cards";
import { ModalAddCard } from "../ModalAddCard";
import { ModalConfirm } from "../ModalConfirm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cardService } from "../../../services/api";

interface IProps {
  data: Card;
  onDragStart?: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const DragItemCard: React.FC<IProps> = ({ data, onDragStart }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenConfirm, setIsModalOpenConfirm] = useState(false);

  const queryClient = useQueryClient();

  const handleToggleModal = () => {
    setIsModalOpen((state) => !state);
  };

  const handleToggleModalConfirm = () => {
    setIsModalOpenConfirm((state) => !state);
  };

  const destroyCard = useMutation({
    mutationFn: () => cardService.destroy(data.id),
    onSuccess: (data) => {
      queryClient.setQueryData(["cards"], data);

      handleToggleModalConfirm();
    },
  });

  return (
    <>
      <div
        id={data.id}
        draggable
        className="drag text-lime-500 block max-w-sm p-6 bg-gray-500 border border-gray-200 rounded-md shadow hover:opacity-90"
        onDragStart={onDragStart}
      >
        <div className="flex items-center justify-between">
          <h5 className="mb-2 text-2xl font-bold tracking-tight">
            {data.titulo}
          </h5>

          <div>
            <button
              type="button"
              onClick={handleToggleModal}
              className="text-lime-500 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.3 6.2H5a2 2 0 0 0-2 2V19a2 2 0 0 0 2 2h11c1.1 0 2-1 2-2.1V11l-4 4.2c-.3.3-.7.6-1.2.7l-2.7.6c-1.7.3-3.3-1.3-3-3.1l.6-2.9c.1-.5.4-1 .7-1.3l3-3.1Z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M19.8 4.3a2.1 2.1 0 0 0-1-1.1 2 2 0 0 0-2.2.4l-.6.6 2.9 3 .5-.6a2.1 2.1 0 0 0 .6-1.5c0-.2 0-.5-.2-.8Zm-2.4 4.4-2.8-3-4.8 5-.1.3-.7 3c0 .3.3.7.6.6l2.7-.6.3-.1 4.7-5Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="sr-only">Editar</span>
            </button>

            <button
              type="button"
              onClick={handleToggleModalConfirm}
              className="text-lime-500 hover:opacity-80 focus:ring-4 focus:outline-none focus:ring-lime-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center"
            >
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M8.6 2.6A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4c0-.5.2-1 .6-1.4ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                  clip-rule="evenodd"
                />
              </svg>

              <span className="sr-only">Excluir</span>
            </button>
          </div>
        </div>

        <div className="h-0.5 w-full mx-auto my-2 bg-gray-400" />

        <article className="prose font-normal text-white">
          <Markdown>{data.conteudo}</Markdown>
        </article>
      </div>

      <ModalAddCard
        openModal={isModalOpen}
        onClose={handleToggleModal}
        card={data}
      />

      <ModalConfirm
        openModal={isModalOpenConfirm}
        onClose={handleToggleModalConfirm}
        onClick={destroyCard.mutate}
      />
    </>
  );
};
