import { Avatar, Text, Button, Paper, Grid } from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { FileInput, HueSlider } from "@mantine/core";
import { useState } from "react";

import { useForm } from "@mantine/form";

const ProfileHeader = ({ avatar, name }) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const form = useForm([file]);

  const handleChange = (event) => {
    setFile(event.file);
    setPreviewUrl(URL.createObjectURL(event.file));
  };

  return (
    <Paper
      radius="md"
      shadow="xl"
      p="xl"
      sx={(theme) => ({
        backgroundColor: theme.colors.blue[7],
      })}
    >
      <Avatar src={avatar || previewUrl} size={120} radius={"xl"} mx="auto" />
      <Text ta="center" fz="lg" weight={500} mt="md">
        {name}
      </Text>
      <form onSubmit={form.onSubmit((values) => handleChange(values))}></form>
    </Paper>
  );
};

export default ProfileHeader;
