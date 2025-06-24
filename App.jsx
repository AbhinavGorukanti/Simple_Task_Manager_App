// App.jsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native'; // make sure this is at the top

import deleteIcon from './assets/trash_icon.png'; 
import styles from './AppStyles';


export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks(prev => [...prev, { id: Date.now().toString(), text: task, completed: false }]);
      setTask('');
    }
  };

  const toggleComplete = id => {
    setTasks(prev =>
      prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = id => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskItem}>
      <TouchableOpacity onPress={() => toggleComplete(item.id)} style={{ flex: 1 }}>
        <Text style={[styles.taskText, item.completed && styles.completed]}>{item.text}{item.completed ? ' ✅ ' : ''}</Text>
      </TouchableOpacity>
      <View style={styles.buttonWrapper}>
      <TouchableOpacity onPress={() => deleteTask(item.id)}>
  <Image source={deleteIcon} style={styles.deleteImage} />
</TouchableOpacity>


</View>

    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Manager</Text>
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
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text style={styles.empty}>No tasks added yet</Text>}
      />
      <StatusBar style="auto" />
    </View>
  );
}


