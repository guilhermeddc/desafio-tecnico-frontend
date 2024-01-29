import React from "react";
import { Button } from "../Button";

interface IProps {
  openModal: boolean;
  onClose: () => void;
  onClick: () => void;
}

export const ModalConfirm: React.FC<IProps> = ({
  openModal,
  onClose,
  onClick,
}) => {
  return (
    openModal && (
      <div className="flex flex-1 fixed bottom-0 right-0 left-0 z-50 justify-center items-center w-screen h-screen bg-opacity-50 bg-gray-300">
        <div className="relative p-4 w-full max-w-2xl max-h-full">
          <div className="relative bg-ada-light rounded-md shadow">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Confirmar ação
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-md text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="default-modal"
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
              <p className="text-gray-600 dark:text-gray-400">
                Você tem certeza que deseja excluir este card?
              </p>
            </div>

            <div className="flex items-center space-x-6 p-4 md:p-5 border-t border-gray-600 rounded-b">
              <Button text="Cancelar" onClick={onClose} />
              <Button text="Confirmar" onClick={onClick} />
            </div>
          </div>
        </div>
      </div>
    )
  );
};
