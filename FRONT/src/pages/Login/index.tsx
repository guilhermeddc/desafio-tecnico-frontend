import React, { useCallback, useRef } from "react";
import { useMutation } from "@tanstack/react-query";

import { Session } from "../../common/interfaces/session";
import { Button, Form, Input } from "../../components";
import { sessionService } from "../../services/api";
import { FormHandles } from "@unform/core";
import * as Yup from "yup";
import { getValidationErrors } from "../../common/utils";

const Login: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const signIn = useMutation({
    mutationFn: (data: Session) => sessionService.signIn(data),
    onSuccess: () => (window.location.href = "/"),
  });

  const handleSubmit = useCallback(
    async (data: Session) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          login: Yup.string().required("Login é obrigatório"),
          senha: Yup.string().required("Senha é obrigatória"),
        });

        schema.validateSync(data, {
          abortEarly: false,
        });

        signIn.mutate(data);
      } catch (error) {
        if (error instanceof Yup.ValidationError) {
          if (error instanceof Yup.ValidationError) {
            const errors = getValidationErrors(error);
            formRef.current?.setErrors(errors);
          }
        }
      }
    },
    [signIn]
  );

  return (
    <main className="flex flex-1 items-center justify-center w-full h-screen bg-ada">
      <div className="w-full max-w-sm p-4 bg-ada-light rounded-md shadow sm:p-6 md:p-8  dark:border-gray-700">
        <Form
          onSubmit={handleSubmit}
          ref={formRef}
          placeholder=""
          className="space-y-6"
        >
          <a
            href="https://ada.tech/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://ada-site-frontend.s3.sa-east-1.amazonaws.com/home/header-logo.svg"
              alt="Ada Logo"
              height={86}
              width={86}
            />
          </a>

          <h5 className="text-2xl text-white">
            Faça <strong>Login</strong>
          </h5>

          <Input name="login" placeholder="Login" label="Login" />

          <Input
            type="password"
            name="senha"
            placeholder="Senha"
            label="Senha"
          />

          <Button type="submit" text="Entrar" />
        </Form>
      </div>
    </main>
  );
};

export default Login;
