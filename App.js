import 'react-native-gesture-handler';
import React, {useState} from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, Button, View, TextInput, TouchableOpacity, Keyboard, ScrollView, But } from 'react-native';
import Task from './components/Task';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const Drawer = createDrawerNavigator();

  function HomeScreen({ navigation }) {
  const [task, setTask ] = useState();
  const [level, setLevel ] = useState();
  const [taskItems, setTaskItems] = useState([]);

  const handleAddTask = (task,level) => {
    Keyboard.dismiss();
    text=task+'-'+level;
    setTask(text);
    setTaskItems([...taskItems, text]);
    setTask(null);
    setLevel(null);
  }
  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy)
  }

  return (
     <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1
        }}
        keyboardShouldPersistTaps='handled'
      >

      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Công việc hôm nay</Text>
        <View style={styles.items}>
          {/* This is where the tasks will go! */}
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index}  onPress={() => completeTask(index)}>
                  <Task text={item} level={item} /> 
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>
        
      </ScrollView>

      {/* Write a task */}
      {/* Uses a keyboard avoiding view which ensures the keyboard does not cover the items on screen */}
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <View style={{ flexDirection: 'row' }}>
        <TextInput style={styles.input} placeholder={'Ghi chú'} value={task} onChangeText={text => setTask(text)} />
        <TextInput style={styles.inputLevel} placeholder={'Mức độ'} keyboardType={'numeric'} value={level} onChangeText={text => setLevel(text)} />
        </View>
        <TouchableOpacity onPress={() => handleAddTask(task,level)}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>Thêm ghi chú</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      
    </View>
  );
  }
  function ListPeople ({navigation}){
  return(
    <View  style={styles.tasksWrapper}>
    <Text style={styles.addTextPeople}>44.01.104.042 - Phạm Thị Thanh Thảo</Text>
    <Text style={styles.addTextPeople}>44.01.104.064 - Trịnh Kim Chi</Text>
    <Text style={styles.addTextPeople}>44.01.104.069 - Phạm Huỳnh Quốc Duy</Text>
    <Text style={styles.addTextPeople}>44.01.104.077 - Hồ Thị Kim Hà</Text>
    <Text style={styles.addTextPeople}>44.01.104.081 - Võ Tuấn Hào</Text>
    </View>
  );
}
  return (
    
    <View style={styles.container}>
      {/* Added this scroll view to enable scrolling when list gets longer than the page */}
      <NavigationContainer>
      <Drawer.Navigator initialRouteName="Trang Chủ">
        <Drawer.Screen name="Trang Chủ" component={HomeScreen} />
        <Drawer.Screen name="Danh Sách Nhóm" component={ListPeople}/>
      </Drawer.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  addTextPeople:{
      marginLeft:20,
      marginTop:30,
      fontSize:14,
  },
  tasksWrapper: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
   alignItems: 'center'
  },
  inputLevel:{
    marginTop: 10,
    marginLeft: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    flex: 1,
  },
  input: {
    flex: 2,
    marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#FFF',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 250,
    height: 50,
    marginTop: 10,
    backgroundColor: '#006EF0',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#006EF0',
    borderWidth: 1,
  },
  addText: {
    color:'#FFF',
    fontWeight :'bold'
  },
});