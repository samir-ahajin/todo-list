import form from "./form";
import dataStorage from "./storage";

export default class Project{

    constructor(title,desc,date,time){
        this.title = title
        this.desc = desc
        this.date = date
        this.time = time
        this.number = dataStorage.listCounter('project')+1;
    }
    get infoDetails(){
        return [               
                {   
                    type:'project',
                    date:this.date,
                    dateCreated: form.curDate()[0],
                    timeCreated:form.curDate()[1],
                },
                {
                    title: this.title,
                    description:this.desc,
                    time:this.time,
                    number:this.number,

                }
                ,[]
        ]

    }
}