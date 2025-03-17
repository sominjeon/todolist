let taskInput = document.getElementById("task-input") //input창에서 아이디값 가져오기
let addButton = document.getElementById("add-button") //add버튼 가져오기
let tabs = document.querySelectorAll(".task-tabs div")// task-tabs div아래있는 모든걸 가져오기
let taskList = [] //테스크 어레이 추가, 여기다가 테스크 내용이 들어갈수 있음
let mode = 'all'
let filterList = []

addButton.addEventListener("click",addTask) //버튼에 이벤트 추가//클릭 이벤트가 작동되면 애드테스크 함수 실행


for(let i=1;i<tabs.length;i++){ //메뉴 Tab 에서 클릭시 이베트 발생, i=1 왜냐면 0번째는 under-line 이여서
    tabs[i].addEventListener("click",function(event){
        filter(event)})
}
// Task추가 함수 버튼으로 추가 & 새 테스크 칸 생성 함수 부르기
function addTask(){
    //task object
    let task = {
        id:randomIDGenerate(),
        taskContent:taskInput.value,
        isComplete:false
    }
    taskList.push(task) //taskContent를 taskList에 푸쉬하기 
    console.log(taskList)
    render() //task push하고 렌더 함수 불러오기 
}

// Task가 새로 추가될시 불러옴. 새로운 테스크가 들어올 HTML킨을 렌더링함
// 다이나믹 한 값은 ${값} 으로 표현 
function render(){
    //내가 선택한 탭에 따라서
    //리스트를 달리 보여준다
    //All taskList
    //ongoing & done filterList
    let list = []
    if(mode === "all"){
        list = taskList
    }else if(mode === "ongoing" || mode === "done"){
        list = filterList
    }
  
    let resultHTML = `` 
    //innerHTML: Element의 HTML, XML을 읽어오거나, 설정할 수 있다. 태그 안에있는 HTML 전체 내용을 들고옴 
    //textContent: 해당 노드가 가지고 있는 텍스트 값을 그대로 가져옴
    // onclick -> 클릭이 실행시 함수를 바로 쓸수있는 도구
    // 체크 버튼 클릭 할때 마다 toggleComplete에 i번째 테스크 아이템에 고유 id를 넣어주기// 여기서 아이템이 처음으로 고유 아이디를 지정받음 
    for(let i=0;i<list.length;i++){
        if(list[i].isComplete == true){
            resultHTML += `<div class="task"> 
                    <div class="task-done">${list[i].taskContent}</div> 
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`

        }else{
            resultHTML += `<div class="task"> 
                    <div>${list[i].taskContent}</div> 
                    <div>
                        <button onclick="toggleComplete('${list[i].id}')">Check</button>
                        <button onclick="deleteTask('${list[i].id}')">Delete</button>
                    </div>
                </div>`
        }
    }
    document.getElementById("task-board").innerHTML = resultHTML
} 
 
function toggleComplete(id){
    //console.log("id:",id)
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList[i].isComplete = !taskList[i].isComplete //Switch,toggle 처럼 동작하는거, !=not, 반대값을 항상 너주는 표현
            break
        }
    }
    render() //토글컴플리트 끝나고 렌더불러오기 UI도 업데이트 해주는거
    console.log(taskList)
}

function deleteTask(id){
    for(let i=0;i<taskList.length;i++){
        if(taskList[i].id == id){
            taskList.splice(i,1) //i번째 어레이 아이템으로 부터 1개 삭제
            break
        }
    }
    render() //UI 업데이트 ->이거 자동화 해주는게 REACT 
}

function filter(event){
    mode = event.target.id //event 가 실행된 target의 ID
    filterList = [] //필터되 테스크들 모이는곳
    if(mode ==="all"){ 
        render() //전체 리스트를 보여준다
    } else if(mode === "ongoing"){
        //진행중이 아이템을 보여준다
        //isComplete=false
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === false){
                filterList.push(taskList[i]) //filterList에 taskList를 넣어줌
            }
        } render()
        console.log("On going",filterList)  
    } else if(mode === "done"){
        //끝나는 케이스 
        //isComplete=true
        for(let i=0;i<taskList.length;i++){
            if(taskList[i].isComplete === true){
                filterList.push(taskList[i])
            }
        } render()
    }
            
}


function randomIDGenerate() {
    return '_' + Math.random().toString(36).substr(2, 9);
}