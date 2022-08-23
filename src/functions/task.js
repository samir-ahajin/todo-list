import form from "./form";
import dataStorage from "./storage";


export default class Task{
    static key = 0
    constructor(title,desc,date,note,time,project){  
        this.title = title;
        this.description = desc;
        this.date = date;
        this.note = note;
        this.time = time;
        this.number = dataStorage.listCounter('task')+1;
        this.project = project
    }
    get infoDetails(){
        if(this.project !== 'none'){
            let current = dataStorage.checkList()
            for (let index = 0; index < current.length; index++) {
                if(current[index]['Entry'][0]['type'] == 'project'){
                    if(current[index]['Entry'][1]['number'] == this.project){
                        this.number = `${current[index]['Entry'][0]['type']}-${current[index]['Entry'][1]['number']}-${current[index]['Entry'][2].length+1}`;
                    }
                }
            }      
        }

        return [
            {   
                type:'task',
                date:this.date,
                dateCreated: form.curDate()[0],
                timeCreated:form.curDate()[1],
                projectVal:this.project,
            },
            {
                title: this.title,
                description:this.description,
                notes:this.note,
                time:this.time,
                number:this.number,
            }
        ]
    }

}

