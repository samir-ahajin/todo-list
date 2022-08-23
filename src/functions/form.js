import Task from "./task";
import Website from "./renderWeb";
import dataStorage from "./storage";
import Project from "./project"

let form = (function(){
    let _result = document.getElementById('result')
    function setDate(){
        let today = new Date(),
        date = today.getFullYear()+'-'+String(today.getMonth()+1).padStart(2,'0')+'-'+String(today.getDate()).padStart(2,'0'),
        curTime =String(today.getHours()).padStart(2,'0')+':'+String(today.getMinutes()).padStart(2,'0')+':'+String(today.getSeconds()).padStart(2,'0');
        return [date,curTime];
    }
    function setMinDate(type,minDate){
        let project = document.getElementById('proj-datel'),
            task = document.getElementById('task-datel');
        if(type == 'project'){
            project.setAttribute('min',`${minDate}T00:00`);
        }else if(type == 'task'){
            task.setAttribute('min',`${minDate}T00:00`);
        }else{
            task.setAttribute('min',`${minDate}T00:00`);
        }
        
    }

    
    //insert the project
    function setProject(){
        setMinDate( 'project',setDate()[0]);
        let pform = document.getElementById('project');
        pform.addEventListener('submit',()=>{
            let projName = document.getElementById('proj-name').value,
                projDesc = document.getElementById('proj-desc').value,
                DateandTime = document.getElementById('proj-datel').value,
                curProj = new Project(projName,projDesc,DateandTime.slice(0,10),DateandTime.slice(11));
                if(projName&&curProj.infoDetails){
                    dataStorage.storeTask(curProj.infoDetails)
                    _result.textContent ="";
                }
                dataStorage.updateList('all');
                Website.closeOverlay();//close overlay after insert
        })
    }
    //insert the task
    function setTask(){
        setMinDate( 'task',setDate()[0]);
        let tform = document.getElementById('task-form');
            
        tform.addEventListener('submit',()=>{   
            let title = document.getElementById('title').value,
            desc = document.getElementById('desc').value,
            dateNtime = document.getElementById('task-datel').value,
            note = document.getElementById('notes').value,
            pValue = document.getElementById('projCon').value,
            curItem = new Task(title,desc,dateNtime.slice(0,10),note,dateNtime.slice(11),pValue);

            if(pValue !== 'none'){
                dataStorage.storeSubTask(curItem.infoDetails,pValue)
                _result.textContent ="";
            }else{
                dataStorage.storeTask(curItem.infoDetails)
                _result.textContent ="";

                
            } 
            dataStorage.updateList('all');
            Website.closeOverlay();
        })
    }

    return{
        insertTask:setTask,
        insertProject:setProject,
        curDate:setDate,
        setMinDate:setMinDate,
    }
})()


export default form;
