
let outerContainerId = document.getElementById("outerContainerid");
let OutercloseIcon = document.getElementById("fafaOutercloseIcon");
let innerContainerId = document.getElementById("innerContainerId")
let addTodoId = document.getElementById("addtodoId");
let outerSaveBtn = document.getElementById("outerSaveBtn");
let outerTopicId = document.getElementById("outerTopicId");
let outerDescId = document.getElementById("outerDescriptId");
let errorTopic = document.getElementById("errorTopic");
let errorDes = document.getElementById("errorDes");
let mainTodoContainerId = document.getElementById("mainTodoContainerId");
let mainTodoCloseButton = document.getElementById("mainTodoCloseButton");
let mainBoxTodoContainerId = document.getElementById("mainBoxTodoContainerId");
let editDivContOpen = document.getElementById("editDivContOpen");


//   <================ Adding Todo on Main Display Start =================>

let numOfTodo = 0;

let todoData = JSON.parse(localStorage.getItem("todos")) || [];
//console.log(todoData);
//console.log(todoData.length);
// numOfTodo=todoData.length;

for (let i = 0; i < todoData.length; i++) {
    let localSaveTodo = `<div class="box" todo-id='${i}'>
    <div class="mainTodoContainer" id="mainTodoContainerId">
    <nav class="todoCotnainerNav">
      <div class="todoHeaderButton"  >
       <i class="fa fa-edit" id="mainTodoEdit"></i>
       <i class="fa fa-times" id="mainTodoCloseButton"></i>
      </div>
      <div class="todotopicmain">${todoData[i].outerTopicIds}</div>
       <div class="todoDesmain">${todoData[i].outerDescIds}</div>
      
     </nav>
 </div>`

    mainBoxTodoContainerId.innerHTML = mainBoxTodoContainerId.innerHTML + localSaveTodo;
}

//   <================ Adding Todo on Main Display End =================>



//  <======== Delete Function Calls Start ===========>


dltFunction();

//  <======== Delete Function Calls End ===========>

addTodoId.addEventListener("click", () => {
    outerContainerId.classList.remove('hide')
    innerContainerId.classList.add('hide');
});

OutercloseIcon.addEventListener("click", () => {
    outerContainerId.classList.add('hide');
    innerContainerId.classList.remove('hide');
    errorTopic.classList.add('hide');
    errorDes.classList.add('hide');
    outerTopicId.value = "";
    outerDescId.value = "";

});

//  <=================== Add Todo On local Storage  Start  =================>

const addTodos = () => {
    if (outerTopicId.value === "" && outerDescId.value === "") {
        errorTopic.classList.remove('hide');
        errorDes.classList.remove('hide');
        //console.log("Both Empty")
    }
    else if (outerTopicId.value === "") {
        // console.log("topic empty");
        errorTopic.classList.remove('hide');

    }
    else if (outerDescId.value === "") {
        errorDes.classList.remove('hide');
        // console.log("Des Empty");
    }
    else {


        // <============  Set Todos In Main page using other text start ==============>

        let todoList = `<div class="box" todo-id='${numOfTodo}'>
         <div class="mainTodoContainer" id="mainTodoContainerId">
                   <nav class="todoCotnainerNav">
                     <div class="todoHeaderButton"  >
                      <i class="fa fa-edit" id="mainTodoEdit"></i>
                      <i class="fa fa-times" id="mainTodoCloseButton"></i>
                     </div>
                     <div class="todotopicmain">${outerTopicId.value}</div>
                      <div class="todoDesmain">${outerDescId.value}</div>
                     
                    </nav>
                </div>`

        mainBoxTodoContainerId.innerHTML = mainBoxTodoContainerId.innerHTML + todoList;
        dltFunction();

        // <============  Set Todos In Main page using other text start ==============>


        // <========  Set In Local Storage start  =======>

        let todos = JSON.parse(localStorage.getItem("todos")) || [];
        todos.push({
            id: numOfTodo,
            outerTopicIds: outerTopicId.value,
            outerDescIds: outerDescId.value

        });
        numOfTodo += 1;

        localStorage.setItem("todos", JSON.stringify(todos));

        // <========  Set In Local Storage End  =======>

        outerTopicId.value = "";
        outerDescId.value = "";
        outerContainerId.classList.add('hide');
        innerContainerId.classList.remove('hide');


    }
}

outerSaveBtn.addEventListener("click", () => {
    addTodos();
})

//  <=================== Add Todo On Local Storage  Start  ===================>


// <=================== Delete The Todo From LocalStorage And Main Screen Start ============>

function dltFunction() {

    let closebtn = document.querySelectorAll(".todoHeaderButton #mainTodoCloseButton");
    for (let i = 0; i < closebtn.length; i++) {
        closebtn[i].addEventListener("click", (e) => {
            let cfrmtext = "Are You Sure You Want To Delete This Todo ?";
            if (confirm(cfrmtext) == true) {
                let clstodo = e.target.closest(".box");
                //  console.log( clstodo);
                let clstodoId = clstodo.getAttribute("todo-id");
                console.log(clstodoId);
                let clsdata = JSON.parse(localStorage.getItem("todos"));
                console.log(clsdata)
                let clsArr = [];
                for (let i = 0; i < clsdata.length; i++) {
                    if (clsdata[i].id != clstodoId) {
                        clsArr.push(clsdata[i]);
                    }
                }
                console.log(clsArr);
                localStorage.setItem("todos", JSON.stringify(clsArr));
                clstodo.classList.add('hide');
            }
        })
    }
}

// <=================== Delete The Todo From LocalStorage And Main Screen End ============>



// <================= Edit Button Work Start =================>

let editbtn = document.querySelectorAll(".todoHeaderButton #mainTodoEdit");
let outereditTopicId = document.getElementById("outereditTopicId");
let outereditDescriptId = document.getElementById("outereditDescriptId");
let editSaveBtn = document.getElementById("editSaveBtn");
//console.log(editbtn);
for (let i = 0; i < editbtn.length; i++) {
    editbtn[i].addEventListener("click", (e) => {
        let cfrmstext = "Are You Sure You Want To Edit This Todo ?";
        if (confirm(cfrmstext) == true) {
            
            editDivContOpen.classList.remove('hide');
            let clstodo = e.target.closest(".box");

            let edttodoId = clstodo.getAttribute("todo-id");
            outereditTopicId.value = clstodo.querySelector(".todotopicmain").innerText;
            outereditDescriptId.value = clstodo.querySelector(".todoDesmain").innerText;
            let editdata = JSON.parse(localStorage.getItem("todos"));
            
            // console.log(editdata);
            editbtn[i].classList.add('hide');

            function editblock() {
                let newArr = [];
                for (let i = 0; i < editdata.length; i++) {
                    if (editdata[i].id == edttodoId) {
                        newArr.push({
                            id:i,
                            outerTopicIds:outereditTopicId.value,
                            outerDescIds: outereditDescriptId.value
                        })
                    } else {
                        newArr.push(editdata[i]);
                    }
                }
                console.log("New data");
               console.log(newArr);
               localStorage.setItem("todos", JSON.stringify(newArr));
               for(let i=0;i<newArr.length;i++){
                let editList = `<div class="box" todo-id='${i}'>
                <div class="mainTodoContainer" id="mainTodoContainerId">
                          <nav class="todoCotnainerNav">
                            <div class="todoHeaderButton"  >
                             <i class="fa fa-edit" id="mainTodoEdit"></i>
                             <i class="fa fa-times" id="mainTodoCloseButton"></i>
                            </div>
                            <div class="todotopicmain">${newArr[i].outerTopicIds}</div>
                             <div class="todoDesmain">${newArr[i].outerDescIds}</div>
                            
                           </nav>
                       </div>`
       
               mainBoxTodoContainerId.innerHTML = mainBoxTodoContainerId.innerHTML + editList;
               editDivContOpen.classList.add('hide');
               location.reload();

               }
            }
            editSaveBtn.addEventListener("click", () => {
                localStorage.clear();
                editblock();
            })

        }

    })
}
dltFunction();

// <================= Edit Button Work End =================>










