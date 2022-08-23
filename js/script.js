//find all id
let taskForm = document.querySelector('#task_form');
let ShowTaskList = document.querySelector('#show_task_list');
let taskInput = document.querySelector('#new_task');
let clearTask = document.querySelector('#clear_task_btn');
let SubmitTask = document.querySelector('#submit_task');
let taskFilter = document.querySelector('#task_filter');
//Event Listener
taskForm.addEventListener("submit", addTask);
clearTask.addEventListener('click', clearAlltask);
ShowTaskList.addEventListener('click', removeValue);
taskFilter.addEventListener('keyup', filter);
document.addEventListener('DOMContentLoaded', getTask);

//Define Function
//Add task function
function addTask(e) {
    if (taskInput.value === '') {
        alert('Please Input a task');
    } else {
        //Create Li Element
        let li = document.createElement('li');
        //console.log(li);
        li.appendChild(document.createTextNode(taskInput.value + " "));

        //Create a link
        let link = document.createElement('a');
        link.setAttribute('href', '#');
        link.innerHTML = "X";
        li.appendChild(link);
        ShowTaskList.appendChild(li);

        storeDataInLocalStorage(taskInput.value);

        taskInput.value = '';
    }

    e.preventDefault();

}

//Remove Task
function removeValue(e) {
    if (e.target.hasAttribute('href')) {

        if (confirm("Are you sure?")) {
            let val = e.target.parentElement;
            removeFromLocalStorage(val);
            val.remove();
        }

    }

}

//Clear Task
function clearAlltask(e) {

    //ShowTaskList.innerHTML = "";
    //console.log(ShowTaskList.firstChild);


    if (confirm('Are you want to clear all data from local storage ? ')) {
        while (ShowTaskList.firstChild) {
            ShowTaskList.firstChild.remove();
        }
        localStorage.clear();
    }

}


//Filter task
function filter(e) {

    let filter_value = e.target.value;
    console.log(filter_value);
    document.querySelectorAll('li').forEach(task => {
        let text = task.firstChild.textContent.toLowerCase();
        if (text.indexOf(filter_value) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }

    });

}

//Local storage
function storeDataInLocalStorage(task) {

    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    

    //console.log(JSON.stringify(tasks));
    localStorage.setItem('tasks', JSON.stringify(tasks));

}

//Get task from local storage
function getTask(task){

    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((item)=>{

        //console.log(item+index);
        //Creat li list
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(item + " "));

        //create link
        let link = document.createElement('a');
        link.appendChild(document.createTextNode('X'));
        link.setAttribute('href', '#');
        li.appendChild(link);
        ShowTaskList.appendChild(li);

    })

}
//Remove From Local Storage
function removeFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }

    let li;
    li = taskItem;
    li.removeChild(li.lastChild);
    tasks.forEach((item,index)=>{
        if(li.textContent.trim()===item){
            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}