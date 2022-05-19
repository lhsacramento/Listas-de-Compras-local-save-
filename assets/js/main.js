const createTaskList = () => {
    
    const taskListContainer = document.querySelector('.TaskListContainer')
    const buttonAddTask = document.querySelector('.ButtonAddTask');

    const createItensTask = (text) => {
        const task = document.createElement('li');
        task.innerText = text;

        const buttonDeletTask = document.createElement('button');        
        buttonDeletTask.innerText = 'Apagar';
        buttonDeletTask.classList.add('ButtonDelet');

        task.appendChild(buttonDeletTask);        
        taskListContainer.appendChild(task);

        clearTextBox();
        saveTasks();
    }

    const clearTextBox = () => {
        const textBox = document.querySelector('.TextBoxTask');
        textBox.value = '';
        textBox.focus();
    }

    const saveTasks = () => {
        const liTasks = document.querySelectorAll('.TaskListContainer li');
        let tasksList = [];
        for(let task of liTasks){
            let textTask = task.innerText;
            textTask = textTask.replace('Apagar', '');
            tasksList.push(textTask);
        }

        const tasksJSON = JSON.stringify(tasksList);
        localStorage.setItem('tasks',tasksJSON);
    }

    const uploadTasks = () => {
        const tasksJSON = localStorage.getItem('tasks');
        const tasks = JSON.parse(tasksJSON);
        if(tasks){
            for(let task of tasks){
                createItensTask(task);
            }
        }
    }

    buttonAddTask.onclick = () => {
        const taskText = document.querySelector('.TextBoxTask').value;
        if(taskText)
        createItensTask(taskText);        
    }

    document.addEventListener('click',function (e) {
        if(e.target.classList.contains('ButtonDelet')){
            e.target.parentElement.remove();            
            saveTasks();
        }
    });

    document.addEventListener('keydown', function(e){
        if(e.keyCode === 13){
            const taskText = document.querySelector('.TextBoxTask').value;
            if(taskText)
            createItensTask(taskText);
        }
    });

    uploadTasks();
}



createTaskList();