// Initialize Firebase
var config = {
  apiKey: "AIzaSyAWrjOiW_pvUfEDafOdca1g6NMm4ombwX0",
  authDomain: "moonshinemarket-ee436.firebaseapp.com",
  databaseURL: "https://moonshinemarket-ee436.firebaseio.com",
  projectId: "moonshinemarket-ee436",
  storageBucket: "moonshinemarket-ee436.appspot.com",
  messagingSenderId: "525063327620"
};
firebase.initializeApp(config);

var d = new Date()
var t = d.getTime();
var counter = t;

document.getElementById('form').addEventListener('submit' , function(e){
  var task = document.getElementById("task").value;
  var description = document.getElementById('description').value;
  var price = document.getElementById('price').value;
  e.preventDefault();
  console.log(task+description)
  createTask(task,description,price)
  form.reset();

})

function createTask(taskName, description,price){
  counter+=1;
  console.log(counter)
  var task ={
    task:taskName,
    id:counter,
    description:description,
    price:price
  }

  let db = firebase.database().ref("tasks/" + counter);
  db.set(task)
  document.getElementById('cardSection').innerHTML = ''
  readTask();
}

function readTask(){
  var task =firebase.database().ref('tasks/');
  task.on('child_added', function(data){
    var taskValue = data.val();
    console.log(taskValue)
    document.getElementById('cardSection').innerHTML +=`
      <div class="card mb-3">
       <div class="card-body">
          <h5 class="card-title">${taskValue.task}</h5>
          <p class="card-text">${taskValue.description}</p>
          <p class="card-text">${taskValue.price}</p>
          <button type="submit" class="btn btn-warning" onClick="updateTask('${taskValue.id}','${taskValue.task}','${taskValue.description}','${taskValue.price}')"><i class="fas fa-edit"></i> Edit task</button>
          <button type="submit" class="btn btn-danger" onClick="deleteTask('${taskValue.id}')"><i class="fas fa-trash"></i> Del</button>
       </div>
      
      </div>
    `
  });
}

function reset(){
  document.getElementById('firstSection').innerHTML = `
  <form id="form">
    <div class="form-group">
      <label for="task">品名</label>
      <input type="text" class="form-control" id="task" placeholder="品名">
    </div>
    <div class="form-group">
      <label for="description">簡介</label>
      <input type="text" class="form-control" id="description" placeholder="簡介">
    </div>
    <div class="form-group">
      <label for="price">價格</label>
      <input type="text" class="form-control" id="price" placeholder="Price">
    </div>

    <button type="submit" class="btn btn-primary"><i class="fas fa-plus"></i> 送出</button>
  </form>
  `
  document.getElementById('form').addEventListener('submit' , function(e){
    var task = document.getElementById("task").value;
    var description = document.getElementById('description').value;
    var price = document.getElementById('price').value;
    e.preventDefault();
    console.log(task+description)
    createTask(task,description,price)
    form.reset();
  
  })
}

function updateTask(id,name,description,price){
  console.log('click')
  document.getElementById('firstSection').innerHTML = `
  <form id="form2">
    <div class="form-group">
      <label for="task">品名</label>
      <input type="text" class="form-control" id="task" placeholder="Task">
    </div>
    <div class="form-group">
      <label for="description">簡介</label>
      <input type="text" class="form-control" id="description" placeholder="Description">
    </div>
    <div class="form-group">
      <label for="price">價格</label>
      <input type="text" class="form-control" id="price" placeholder="Price">
    </div>

    <button type="submit" style="display:none" id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> 送出</button>
    <button type="submit" style="display:inline-block" id="button2" class="btn btn-success">更新</button>
    <button type="submit" style="display:inline-block" id="button3" class="btn btn-danger">取消</button>
  </form>
  `
  document.getElementById('form2').addEventListener('submit' ,(e)=>{
    e.preventDefault();
  })
  document.getElementById('button3').addEventListener('click',(e)=>{
    reset();
  })
  document.getElementById('button2').addEventListener('click',(e)=>{
    updateTask2(id,document.getElementById('task').value,document.getElementById('description').value,document.getElementById('price').value);
  })
  document.getElementById('task').value=name
  document.getElementById('description').value=description
  document.getElementById('price').value=price
}

function updateTask2(id,name,description,price){
  var taskUpdated={
    task:name,
    id:id,
    description:description,
    price:price
  }
  let db = firebase.database().ref('tasks/'+id);
  db.set(taskUpdated)

  document.getElementById('cardSection').innerHTML='';
  readTask();
  reset();
}

function deleteTask(id){
  var task = firebase.database().ref('tasks/'+id);
  task.remove();
  reset();
  document.getElementById('cardSection').innerHTML='';
  readTask();
}