// components/EditPerfil.js
import {
  TextInput,
  Checkbox,
  Button,
  Group,
  Box,
  FileInput,
  rem,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconUpload } from "@tabler/icons-react";
const { useAuth } = require("../contexts/AuthProvider");

const EditPerfil = ({ setIsEditPerfil }) => {
  const { user, editPerfil } = useAuth();
  const form = useForm({
    initialValues: {
      name: "",
      termsOfService: false,
    },
  });

  const handleSubmit = async (values) => {
    try {
      const { name, avatar } = values;
      editPerfil({ name, file: avatar, id: user._id });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <TextInput
          label="Nome"
          placeholder="Seu nome"
          {...form.getInputProps("name")}
        />
        <FileInput
          label="avatar"
          placeholder="Sua foto de perfil"
          icon={<IconUpload size={rem(14)} />}
          accept="image/png,image/jpeg,image/jpg"
          {...form.getInputProps("avatar")}
        />
        <Checkbox
          mt="md"
          label="Eu aceito vender meus dados"
          {...form.getInputProps("termsOfService", { type: "checkbox" })}
        />

        <Group position="right" mt="md">
          <Button type="submit">Editar</Button>
        </Group>
      </form>
    </Box>
  );
};

export default EditPerfil;
