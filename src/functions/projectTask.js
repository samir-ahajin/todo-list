import addComponent from "./addComponents";
export default class projectTask{
    static insertData(task){
        let dataCon = document.createElement('tr');
            dataCon.setAttribute('class','data-task')
        for (let index = 0; index < task.length; index++) {
            let data = document.createElement('td')
            if(index == 4){
                data.appendChild(addComponent.addButtons(task[index][0],task[index][1]))
            }else{
                data.textContent = task[index]
            }
          
            dataCon.appendChild(data)
        }
        return dataCon;
       
    }
    static insertHeader(){
        let dataCon = document.createElement('tr'),
            header = ['Task','Description','Date','Time (24:00)','Status']
        for (let index = 0; index < header.length; index++) {
            let data = document.createElement('th')
            data.textContent = header[index]
            dataCon.appendChild(data)
        }
        return dataCon;
    }

}