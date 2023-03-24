import { useState } from "react";
import dayjs from "dayjs";
import {
  createStyles,
  UnstyledButton,
  Text,
  Paper,
  Group,
  rem,
  Avatar,
  Image,
  Button,
} from "@mantine/core";
import {
  IconSwimming,
  IconBike,
  IconRun,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { useFeed } from "@/contexts/FeedProvider";
const useStyles = createStyles((theme) => ({
  root: {
    backgroundImage: `linear-gradient(-60deg, ${
      theme.colors[theme.primaryColor][4]
    } 0%, ${theme.colors[theme.primaryColor][9]} 100%)`,
    padding: theme.spacing.xl,
    borderRadius: theme.radius.md,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginLeft: 0,
    marginRight: "auto",
    marginTop: 0,
    marginBottom: 4,
    color: theme.colors[theme.primaryColor][6],
  },
  image: {
    borderRadius: "50%",
    objectFit: "cover",
    objectPosition: "center",
    border: `2px solid ${theme.white}`,
  },

  stat: {
    minWidth: rem(150),
    paddingTop: theme.spacing.xl,
    minHeight: rem(140),
    display: "flex",
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.white,
  },

  label: {
    textTransform: "uppercase",
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    color: theme.colors.gray[7],
    lineHeight: 1.2,
  },

  value: {
    fontSize: theme.fontSizes.sm,
    fontWeight: 700,
    color: theme.black,
  },

  count: {
    color: theme.colors.gray[6],
  },

  day: {
    fontSize: rem(44),
    fontWeight: 700,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
    marginBottom: 5,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  month: {
    fontSize: theme.fontSizes.sm,
    color: theme.white,
    lineHeight: 1,
    textAlign: "center",
  },

  controls: {
    display: "flex",
    flexDirection: "column",
    marginRight: `calc(${theme.spacing.xl} * 2)`,

    [theme.fn.smallerThan("xl")]: {
      flexDirection: "row",
      alignItems: "center",
      marginRight: 0,
      marginBottom: theme.spacing.xl,
    },
  },

  date: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  control: {
    height: rem(28),
    width: "100%",
    color: theme.colors[theme.primaryColor][2],
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: theme.radius.md,
    transition: "background-color 50ms ease",

    [theme.fn.smallerThan("xl")]: {
      height: rem(34),
      width: rem(34),
    },

    "&:hover": {
      backgroundColor: theme.colors[theme.primaryColor][5],
      color: theme.white,
    },
  },

  controlIcon: {
    [theme.fn.smallerThan("xl")]: {
      transform: "rotate(-90deg)",
    },
  },
}));

const data = [];

for (let i = 1; i <= 10; i++) {
  data.push({
    avatar: `https://i.pravatar.cc/150?img=${i}`,
    label: `User ${i}`,
    image: `https://picsum.photos/200/300?random=${i}`,
  });
}

const StatsControls = () => {
  const { classes } = useStyles();
  const { groups, loading } = useFeed();
  const [currentGroup, setCurrentGroup] = useState(groups[0]);
  console.log(currentGroup);
  const groupButtons = () => {
    return (
      <Group position="center" className={classes.controls}>
        {groups.map((group, index) => (
          <Button
            key={group[0]._id}
            onClick={() => setCurrentGroup(group)}
            color={group === currentGroup ? "teal" : "gray"}
            variant="outline"
            size="sm"
            radius="md"
            className={classes.control}
          >
            {index + 1}
          </Button>
        ))}
      </Group>
    );
  };

  const stats = currentGroup.map((stat) => (
    <Paper
      className={classes.stat}
      radius="md"
      shadow="xl"
      p="xs"
      key={stat._id}
    >
      <div className={classes.container}>
        <Avatar
          src={stat.user.imageUrl}
          radius={16}
          className={classes.icon}
          size="md"
        />
        <Text className={classes.label}>{stat.user.name}</Text>
      </div>
      <Image
        className={classes.image}
        maw={240}
        mx="auto"
        radius="md"
        src={stat.imageUrl}
        alt="Random image"
      />

      <Text fz="xs" className={classes.count}>
        <span className={classes.value}>{stat.score}</span>
      </Text>
    </Paper>
  ));

  return (
    <div className={classes.root}>
      {groupButtons()}
      <Group sx={{ flex: 1 }}>{stats}</Group>
    </div>
  );
};

export default StatsControls;
