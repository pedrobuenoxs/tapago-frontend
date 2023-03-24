// components/LoginPage.js
import { TextInput, Checkbox, Button, Group, Box, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import styles from "./AuthModal.module.css";
const LoginPage = ({ setIsLoginPage }) => {
  const { login } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 4 ? null : "Invalid password"),
    },
  });

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      await login(email, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <TextInput
          withAsterisk
          label="Senha"
          placeholder="Sua senha"
          {...form.getInputProps("password")}
        />
        <Anchor
          href="/"
          onClick={(event) => event.preventDefault()}
          sx={(theme) => ({
            paddingTop: 2,
            color:
              theme.colors[theme.primaryColor][
                theme.colorScheme === "dark" ? 4 : 6
              ],
            fontWeight: 500,
            fontSize: theme.fontSizes.xs,
          })}
        >
          Forgot your password?
        </Anchor>
        <Checkbox
          mt="md"
          label="Eu aceito vender meus dados"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Login</Button>
          <Button onClick={() => setIsLoginPage(false)} type="submit">
            Cadastrar
          </Button>
        </Group>
      </form>
    </Box>
  );
};

export default LoginPage;
