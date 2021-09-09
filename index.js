const taskContainer = document.querySelector(".task__container");

let globalStore = [];

const createNewCard = (taskData) =>
    `<div class="col-md-6 col-lg-4 ">
        <div class="card">
            <div class="card-header d-flex justify-content-end gap-2">
            <button type="button" class="btn btn-outline-success">
            <i class="fas fa-pencil-alt"></i>
            </button>
            <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
            <i class="fas fa-dumpster-fire" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
            </button>
            </div>
            <img src=${taskData.imageUrl}
                class="card-img-top" 
                alt="...">
            <div class="card-body">
                <h5 class="card-title">${taskData.taskTitle}</h5>
                <p class="card-text">${taskData.taskDescription}</p>
                <a href="#" class="btn btn-primary">${taskData.taskType}</a>
            </div>
            <div class="card-footer">
                <button type="button" class="btn btn-outline-primary float-end">
                    Open Task
                </button>
            </div>
        </div>
    </div>
`;

const loadInitialCardData = () => {
    const getLoadData = localStorage.getItem("Tasky");

    const {cards} = JSON.parse(getLoadData);

    cards.map((Objectdata) => {
        taskContainer.insertAdjacentHTML("beforeend",createNewCard(Objectdata));

        globalStore.push(Objectdata);
    });
};

const saveChanges = () => {
    const taskData = {
        id: `${Date.now()}`,
        imageUrl: document.getElementById("imageUrl").value,
        taskTitle: document.getElementById("tasktitle").value,
        taskType: document.getElementById("TaskType").value,
        taskDescription: document.getElementById("taskDescription").value,
    };

    taskContainer.insertAdjacentHTML("beforeend",createNewCard(taskData));

    globalStore.push(taskData);

    localStorage.setItem("Tasky",JSON.stringify({cards:globalStore}));
};

const deleteCard = (event) =>{
    event = window.event;

    const targetId = event.target.id;

    const elementName = event.target.tagName;

    globalStore = globalStore.filter((cardObject) => targetId !== cardObject.id);

    if(elementName === "BUTTON"){
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
    }
    else{
        return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
    }
}