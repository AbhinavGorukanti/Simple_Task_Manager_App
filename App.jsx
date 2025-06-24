// App.jsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native'; // Image for delete icon

import deleteIcon from './assets/trash_icon.png'; // Import local trash icon image
import styles from './AppStyles'; // Import externalized styles

export default function App() {
  // State to manage the current input task
  const [task, setTask] = useState('');

  // State to manage the list of tasks
  const [tasks, setTasks] = useState([]);

  // Adds a task to the list if the input is not empty
  const addTask = () => {
    if (task.trim()) {
      setTasks(prev => [
        ...prev,
        { id: Date.now().toString(), text: task, completed: false }
      ]);
      setTask(''); // Clear input after adding
    }
  };

  // Toggles a task's completion status
  const toggleComplete = id => {
    setTasks(prev =>
      prev.map(t =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  // Removes a task from the list by its id
  const deleteTask = id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  // Renders each task item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      {/* Task text is pressable to toggle completion */}
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>
          {item.text}{item.completed ? ' ✅ ' : ''}
        </Text>
      </TouchableOpacity>

      {/* Delete icon button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity onPress={() => deleteTask(item.id)}>
          <Image source={deleteIcon} style={styles.deleteImage} />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Main UI
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>

      {/* Input row with TextInput and Add button */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter task"
          value={task}
          onChangeText={setTask}
        />
        <View style={styles.buttonWrapper}>
          <Button title="Add" onPress={addTask} />
        </View>
      </View>

      {/* List of tasks */}
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks added yet</Text>}
      />

      {/* Status bar styling */}
      <StatusBar style="auto" />
    </View>
  );
}
