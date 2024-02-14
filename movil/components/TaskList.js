import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { deleteTask, getTasks } from "../Api";
import TaskItem from "./TaskItem";

const TasksList = ({ navigation }) => {
  console.log("Rendering TasksList");
  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const getUsers = async () => {
    try {
      console.log("Before getting tasks");
      const tasks = await getTasks();
      console.log("After getting tasks");
      setTasks(tasks);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = React.useCallback(async () => {
    console.log("Refreshing tasks");
    setRefreshing(true);
    await getUsers();
    setRefreshing(false);
  }, []);

  const handleDelete = async (id) => {
    await deleteTask(id)
    onRefresh()
  }

  useEffect(() => {
    console.log("Inside useEffect in TasksList");
  getUsers();
  console.log("Called useEffect in TasksList");
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <TaskItem task={item} handleDelete={handleDelete} />
  );

  console.log("After FlatList");
  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  );
};

export default TasksList;