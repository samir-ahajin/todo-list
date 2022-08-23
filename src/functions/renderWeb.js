import form from "./form";
import dataStorage from "./storage";
import addComponent from "./addComponents"


let Website = (function(){
    let _show = document.getElementById('result');
    let _buttons = document.querySelectorAll('.btn');
    function _onclickButton(){
        
        _buttons.forEach(button => button.addEventListener('click',(e)=>{
            let selected = document.getElementById('selected')
            for (let index = 0; index < _buttons.length; index++) {
                if(_buttons[index].id == e.target.id){
                    e.target.classList.remove('active')
                    e.target.classList.add('active')
                }else{
                    _buttons[index].classList.remove('active')
                }
            }
            selected.innerHTML = ""
            if(e.target.id =="todo-btn"){  
                e.target.classList.add('active')   
                selected.appendChild(addComponent.createTask())  
                dataStorage.addProjectName(); 
                form.insertTask();    
            }else if(e.target.id == "project-btn"){
                selected.appendChild(addComponent.createProject());
                form.insertProject();
            }
        
        }))

    }

    function _sortTask(){
        let selection = document.getElementById('months');

        selection.addEventListener('change',(event)=>{
            _show.innerHTML =""
            dataStorage.updateList(event.target.value)
        })
    }

    function hideOverlay(){
        document.getElementById('overlay').style.display = 'none';
    }
    function showOverlay(){
        document.getElementById('selected').innerHTML = "<p>Please select type to add.</p>"
        document.getElementById('overlay').style.display = 'block';
    }
    


    function renderWeb(){
        window.addEventListener('click',(e)=>{
            if(e.target.classList.contains('close')){
                for (let index = 0; index < _buttons.length; index++) {
                    _buttons[index].classList.remove('active');
                }
                hideOverlay();
            }else if(e.target.id == 'show'){
                showOverlay();
            }
        })
        _onclickButton();
        _sortTask();
        dataStorage.updateList('all');


    }

    return{
        render:renderWeb,
        closeOverlay:hideOverlay,
        openOverlay:showOverlay,
    }
})()



export default Website;