import addComponent from './addComponents';
import { getMonth, intlFormatDistance } from 'date-fns'
import projectTask from './projectTask';
import form from './form';


export default class dataStorage{

    static storeTask(data){
        let existingEntries  = this.checkList()
        let name =`Entry`,
        currentEntry = {};  
        currentEntry[name] = data;
        existingEntries.push(currentEntry);  
        localStorage.setItem("allEntries",JSON.stringify(existingEntries));
        
    }

    static getMonthValue(month){
            const monthNames = ["january", "february", "march", "april", "may", "june",
            "july", "august", "september", "october", "november", "december"
        ];
        return monthNames[month];
    }
    

    static checkList(){
        let entries= JSON.parse(localStorage.getItem("allEntries"))
        if(entries == null){
            entries = []
        }
        return entries
    }

    
    static storeSubTask(data,number){
        let existingEntries = this.checkList()
        for (let index = 0; index < existingEntries.length; index++) {
            if(existingEntries[index]['Entry'][0]['type'] == 'project'){
                if(existingEntries[index]['Entry'][1]['number'] == number ){
                    let name = 'SubEntry',
                        currentEntry = {};
                        currentEntry[name] = data;
                        existingEntries[index]['Entry'][2].push(currentEntry);
                    break;
                }
            }
            
        }
        
        localStorage.setItem("allEntries",JSON.stringify(existingEntries));
    }
    
    static updateList(type){   
        this.checkDate()
        let tcon = document.getElementById('tbody')
        tcon.innerHTML = ""; 
        if(type == 'all'){
            for(let a = 0;a < this.checkList().length;a++){
                tcon.appendChild(this.enterTDMain(this.checkList()[a][`Entry`][1]['title']
                            ,this.checkList()[a][`Entry`][0]['date']
                            ,this.checkList()[a][`Entry`][1]['time']
                            ,this.checkList()[a][`Entry`][0]['type']
                            ,this.checkList()[a][`Entry`][1]['number']));      
            } 
            if(tcon.innerHTML == ""){
                tcon.innerHTML = "<tr  class='nosel'><td colspan = '3'>NO DATA.</td></tr>"
            }
          
        }else if(type == 'today'){
            for(let a = 0;a < this.checkList().length;a++){
                if(this.checkList()[a][`Entry`][0]['date'] == form.curDate()[0]){
                    tcon.appendChild(this.enterTDMain(this.checkList()[a][`Entry`][1]['title']
                    ,this.checkList()[a][`Entry`][0]['date']
                    ,this.checkList()[a][`Entry`][1]['time']
                    ,this.checkList()[a][`Entry`][0]['type']
                    ,this.checkList()[a][`Entry`][1]['number'])); 
                }
            }
            if(tcon.innerHTML == ""){
                tcon.innerHTML = "<tr class='nosel'><td colspan = '3'>NO DATA.</td></tr>"
            }
          
        }else{
            for(let a = 0;a < this.checkList().length;a++){
              
                let month = getMonth(new Date(this.checkList()[a][`Entry`][0]['date']));

                if(type == this.getMonthValue(month)){
                    tcon.appendChild(this.enterTDMain(this.checkList()[a][`Entry`][1]['title']
                    ,this.checkList()[a][`Entry`][0]['date']
                    ,this.checkList()[a][`Entry`][1]['time']
                    ,this.checkList()[a][`Entry`][0]['type']
                    ,this.checkList()[a][`Entry`][1]['number']));    
                }
            }
            if(tcon.innerHTML == ""){
                tcon.innerHTML = "<tr  class='nosel'><td colspan = '3'>NO DATA.</td></tr>"
            }
        } 
   
        this.showTaskInfo();
    }

    static enterTDMain(tname,cdate,ddate,typeT,number){
        let data = document.createElement('tr'),
        datal = document.createElement('td'),
        datac = document.createElement('td'),
        datar = document.createElement('td'),
        link = document.createElement('button');

        link.textContent = `${tname}`
        link.setAttribute('id',`${number}`)
        datac.textContent = `${cdate}`
        datar.textContent = `${ddate}`

        if(typeT =='task'){
            data.setAttribute('class','data-task')
            link.setAttribute('class','info tasks task-color')
        }else{
            data.setAttribute('class','data-proj')
            link.setAttribute('class','info projs proj-color')

        }
        datal.appendChild(link);
        data.appendChild(datal);
        data.appendChild(datac);
        data.appendChild(datar);
        return data;
    }

    static showTaskInfo(){
        let showInfo = document.querySelectorAll('.info');
        let show = document.getElementById('result');
 
        showInfo.forEach(info=>info.addEventListener('click',(e)=>{
            show.innerHTML = "";
            if(e.target.classList.contains('tasks')){
                let tasks =  this.checkList().filter(entry=>entry["Entry"][0]['type'] == 'task' && entry["Entry"][1]['number'] == e.target.id)
                show.appendChild(this.viewDetails(tasks[0]['Entry']))
            }else if(e.target.classList.contains('projs')){
                let project =  this.checkList().filter(entry=>entry["Entry"][0]['type'] == 'project' && entry["Entry"][1]['number'] == e.target.id)
                show.appendChild(this.viewDetails(project[0]['Entry']));
            }
            this.deleteTask();
        }))
    }

    static setRemainingTime(sdate){
        let itemCon = document.createElement('li');
        itemCon.innerHTML = `<p><span>Remaining Time</span>:&nbsp&nbsp${intlFormatDistance(new Date(sdate),new Date())}</p>`;
        return itemCon;
    }


    static viewDetails(task){
        let list = document.createElement('div'),
            infoToView = ['title','description','time','date','dateCreated','timeCreated'],
            text= ['Title','Description','Time(24:00)','Date','Date-Created','Time-Created'],
            a=0,
            newList = document.createElement('ul'),
            lType = document.createElement('h1');
            list.innerHTML = ""

            task[0]['type'] == 'task'? lType.textContent = `${task[0]['type'].toUpperCase()}`: lType.textContent = `${task[0]['type'].toUpperCase()} TASK`;
           
            newList.appendChild(lType);

        for (let index = 1; index >= 0; index--) {
            for(const val in task[index]){
                if(infoToView.includes(val)){
                    let item = document.createElement('li')
                    item.innerHTML = `<p><span>${text[a]}</span>:&nbsp ${task[index][val]}</p>`;
                    newList.appendChild(item);
                    a++;
                }
            }               
                if(index == 0){
                        newList.appendChild(this.setRemainingTime(task[0]['date']));
                }   
                list.appendChild(newList);  
            }

            list.appendChild(addComponent.addButtons(task[0]['type'],task[1]['number']))
            if(task[0]['type'] == 'project'){ 
               let tlist = document.createElement('div'),
                   table = document.createElement('table'),
                   tBody = document.createElement('tbody');

                tBody.setAttribute('id','subTask')   
                table.appendChild(projectTask.insertHeader());    
                if(task[2].length >0){
                    for (let index = 0; index < task[2].length; index++) {
                        let con = [
                            task[2][index]['SubEntry'][1]['title'],
                            task[2][index]['SubEntry'][1]['description'],
                            task[2][index]['SubEntry'][0]['date'],
                            task[2][index]['SubEntry'][1]['time'],
                            ['subtask',task[2][index]['SubEntry'][1]['number']]
                            ]

                            tBody.appendChild(projectTask.insertData(con));
                              
                    }
                    table.appendChild(tBody);
                    tlist.appendChild(table);
                }else{
                    tlist.textContent = 'No task yet.'
                }
             
                list.appendChild(tlist);
               
            }
          
            return list;
    }

    static deleteTask(){
        let deleteButton = document.querySelectorAll('.delete');
        deleteButton.forEach(button=>button.addEventListener('click',(e)=>{
            let itemPath = e.path[1].id,
                typeValue = e.path[1].id.split("-"),
                currentList = this.checkList();

                if(typeValue.length == 2){
                    let removeItem = currentList.findIndex(item=>item["Entry"][0]['type'] == typeValue[0] && item["Entry"][1]['number'] == typeValue[1] )
                    if (removeItem > -1) {
                        currentList.splice(removeItem, 1)    
                    }
                    document.getElementById('result').textContent ="";
                }else{
                    let projectIndex = currentList.findIndex(item=>item["Entry"][0]['type'] == typeValue[1] && item["Entry"][1]['number'] == typeValue[2] ),
                        removeItem = currentList[projectIndex]["Entry"][2].findIndex(item=>item["SubEntry"][1]['number'] == `${typeValue[1]}-${typeValue[2]}-${typeValue[3]}`)
                    if(removeItem >-1){
                        currentList[projectIndex]["Entry"][2].splice(removeItem, 1) 
                        this.viewDetails(currentList[projectIndex]["Entry"]);                          
                    }
                }
                
                localStorage.setItem("allEntries",JSON.stringify(currentList));
                this.updateList('all');   
                
          
        }))
    }



    static listCounter(type){
        let currentList = this.checkList().filter(item=>item["Entry"][0]['type'] == type )
        return currentList.length;
    }

    static addProjectName(){
        let projects = document.getElementById("projCon"),
             projList = this.checkList().filter(item=>item["Entry"][0]['type'] == "project");
        if(this.checkList().length>0){
            if(projList.length > 0){
                for (let index = 0; index < projList.length; index++) {
                    let projItem = document.createElement('option')
                    projItem.textContent = projList[index]["Entry"][1]['title']
                    projItem.setAttribute('value',projList[index]["Entry"][1]['number'])
                    projects.appendChild(projItem);
                }
                
            }
        }
        projects.addEventListener('change',(e)=>{
            if(e.target.value == 'none'){
                form.setMinDate('task',form.curDate()[0]);
            }
            else if(e.target.value > 0){
                for (let index = 0; index < projList.length; index++) {
                   if(projList[index]["Entry"][1]['number'] == e.target.value){
                    form.setMinDate('task',projList[index]["Entry"][0]['date']);
                   }
                }
            }
        })
        
    }

    static checkDate(){
        let currentList = this.checkList()
        //still lack due date
        //compare the date and due date in the current date
        //show task list for today
    }



}