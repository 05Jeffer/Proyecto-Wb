import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, Text, StyleSheet } from "react-native";
import { saveTask, getTask, updateTask } from "../Api";
import Layout from "../components/Layout";

const TaskFormScreen = ({ navigation, route }) => {
  const [task, setTask] = useState({
    tittle: "",
    description: "",
  });
  const [editing, setEditing] = useState(false);

  // if (route && route.params) {
  //   navigation.setOptions({ headerTittle: "Updating Task" });
  // }

  useEffect(() => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({ headerTittle: "Updating Task" });
      (async () => {
        const task = await getTask(route.params.id);
        setTask({ tittle: task.tittle, description: task.description });
      })();
    }
  }, []);

  const handleSubmit = async () => {
    try {
      if (!editing) {
        await saveTask(task);
      } else {
        console.log(route.params.id, task)
        await updateTask(route.params.id, {...task});
      }
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setTask({ ...task, [name]: value });

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder="Write a Tittle"
        placeholderTextColor="#576574"
        value={task.tittle}
        onChangeText={(text) => handleChange("tittle", text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Write a short Description"
        placeholderTextColor="#576574"
        value={task.description}
        onChangeText={(text) => handleChange("description", text)}
      />

      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Task</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Task</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: "90%",
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: "#10ac84",
    height: 30,
    color: "#ffffff",
    textAlign: "center",
    padding: 4,
    borderRadius: 5,
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#10ac84",
    width: "90%",
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: "#e58e26",
    width: "90%",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
});

export default TaskFormScreen;