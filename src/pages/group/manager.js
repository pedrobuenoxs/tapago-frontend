import React, { useState, useEffect } from "react";
import styles from "./Manager.module.css";
const GroupManager = () => {
  const [groups, setGroups] = useState([
    {
      id: null,
      name: "",
      users: [],
    },
  ]);
  const [editing, setEditing] = useState(false);
  const [currentGroup, setCurrentGroup] = useState(null);
  const [groupName, setGroupName] = useState("");

  const handleEdit = (group) => {
    setEditing(true);
    setCurrentGroup(group);
    setGroupName(group.name);
  };

  const handleSave = async () => {
    const response = await fetch(
      `https://tapago-api-production.up.railway.app/api/group/edit`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: currentGroup.id,
          name: groupName,
        }),
      }
    );

    // update groups with edited group
    setGroups(
      groups.map((group) => {
        if (group.id === currentGroup.id) {
          return {
            ...group,
            name: groupName,
          };
        } else {
          return group;
        }
      })
    );

    setEditing(false);
    setCurrentGroup(null);
    setGroupName("");
  };

  const handleDelete = (id) => {
    console.log(id);
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://tapago-api-production.up.railway.app/api/admin/groups`
      );
      const data = await response.json();
      setGroups(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Group Manager</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Users</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.id}</td>
              <td>{group.name}</td>
              <td>{group.users.length}</td>
              <td>
                <button onClick={() => handleEdit(group)}>Edit</button>
                <button onClick={() => handleDelete(group.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div className={styles.modal}>
          <div className={styles["modal-content"]}>
            <h3>Edit Group</h3>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
            />
            <div className={styles["modal-buttons"]}>
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManager;
