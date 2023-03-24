import { Avatar, Text, Button, Paper, Grid, Modal, Group } from "@mantine/core";
import { useState } from "react";
import { IconEdit } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import EditPerfil from "./EditPerfil";

const ProfileHeader = ({ id, avatar, name }) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [file, setFile] = useState(null);
  const [modal, setModal] = useState(false);

  const form = useForm([file]);

  return (
    <Paper
      radius="md"
      shadow="xl"
      p="xl"
      sx={(theme) => ({
        backgroundColor: theme.colors.blue[7],
      })}
      align="center"
    >
      <Avatar src={avatar} size={120} radius={"xl"} mx="auto" />

      <Modal size={"xs"} opened={opened} onClose={close} title="Editar perfil">
        <EditPerfil />
      </Modal>

      <Grid align="end" mt={10}>
        <Grid.Col span={8}>
          <Text fz={24} fw={800} mt="md">
            {name}
          </Text>
        </Grid.Col>
        <Grid.Col span={4}>
          <IconEdit onClick={open} stroke={1} />
        </Grid.Col>
      </Grid>
    </Paper>
  );
};

export default ProfileHeader;
