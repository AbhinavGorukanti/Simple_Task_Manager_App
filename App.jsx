// App.jsx
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'react-native'; // make sure this is at the top

import deleteIcon from './assets/trash_icon.png'; 


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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
    padding: 10,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 5,
  },
  
  taskText: {
    fontSize: 18,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#888',
  },
  empty: {
    textAlign: 'center',
    marginTop: 20,
    color: '#aaa',
  },

  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 50,
    paddingVertical: 6,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  deleteImage: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginLeft: 10,
    alignSelf: 'center',
  },
  
  
});
