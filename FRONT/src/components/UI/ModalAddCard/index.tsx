import React, { useCallback } from "react";
import { Button } from "../Button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card } from "../../../common/interfaces/cards";
import { Form } from "../../Form";
import { cardService } from "../../../services/api";
import { Input, Textarea } from "../..";
import { Listas } from "../../../common/enums/listas";
import { v4 as uuid } from "uuid";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { getValidationErrors } from "../../../common/utils";

interface IProps {
  openModal: boolean;
  onClose: () => void;
  card?: Card;
}

export const ModalAddCard: React.FC<IProps> = ({
  openModal,
  onClose,
  card,
}) => {
  const queryClient = useQueryClient();
  const formRef = React.useRef<FormHandles>(null);

  const storeCard = useMutation({
    mutationFn: (data: Omit<Card, "id">) => cardService.store(data),
    onSuccess: (_, variables) => {
      const cashed = queryClient.getQueryData(["cards"]) as Card[];

      queryClient.setQueryData(
        ["cards"],
        [...cashed, { id: uuid(), ...variables }]
      );

      alert("Card criado com sucesso!");
      onClose();
    },
  });

  const updateCard = useMutation({
    mutationFn: (data: Card) => cardService.update(data),
    onSuccess: (_, variables) => {
      const cashed = queryClient.getQueryData(["cards"]) as Card[];

      queryClient.setQueryData(
        ["cards"],
        cashed.map((card) => {
          if (card.id === variables.id) {
            return { ...card, ...variables };
          }

          return card;
        })
      );

      alert("Card atualizado com sucesso!");
      onClose();
    },
  });

  const handleSubmit = useCallback(
    async (data: Omit<Card, "id">) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          titulo: Yup.string().required("Título é obrigatório"),
          conteudo: Yup.string().required("Conteúdo é obrigatório"),
        });

        schema.validateSync(data, {
          abortEarly: false,
        });

        card
          ? updateCard.mutate({ ...data, id: card.id, lista: card.lista })
          : storeCard.mutate({ ...data, lista: Listas.toDo });
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidationErrors(error);
            formRef.current?.setErrors(errors);
          }
        }
      }
    },
    [card, storeCard, updateCard]
  );

  return (
    openModal && (
      <div className="flex flex-1 fixed bottom-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen bg-opacity-50 bg-gray-300">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <Form
            onSubmit={handleSubmit}
            ref={formRef}
            initialData={card}
            placeholder=""
            className="relative bg-ada-light rounded-md shadow"
          >
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {card ? "Editar" : "Novo"} Card
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Fechar modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">
              <Input name="titulo" label="Título" />
              <Textarea name="conteudo" label="Conteúdo" />
            </div>

            <div className="flex items-center space-x-6 p-4 md:p-5 border-t border-gray-600 rounded-b">
              <Button text="Cancelar" onClick={onClose} />
              <Button text="Salvar" />
            </div>
          </Form>
        </div>
      </div>
    )
  );
};
