// components/RegisterPage.js
// components/LoginPage.js
import { TextInput, Checkbox, Button, Group, Box, Anchor } from "@mantine/core";
import { useForm } from "@mantine/form";

import { useState } from "react";

import { useAuth } from "../contexts/AuthProvider";
const RegisterPage = ({}) => {
  const { register } = useAuth();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      phoneNum: "",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length > 4 ? null : "Invalid password"),
      phoneNum: (value) => (value.length > 6 ? null : "Invalid phone number"),
    },
  });

  const handleSubmit = async (values) => {
    const { email, password, phoneNum } = values;

    try {
      await register({ email, password, number: phoneNum });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          withAsterisk
          label="Whatsapp"
          placeholder="5516999999999"
          {...form.getInputProps("phoneNum")}
        />
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

        <Checkbox
          mt="md"
          label="Eu aceito vender meus dados"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Cadastrar</Button>
        </Group>
      </form>
    </Box>
  );
};

export default RegisterPage;
