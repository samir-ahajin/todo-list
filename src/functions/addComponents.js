
export default class addComponent{

    static addButtons(type,numb){
        let del = document.createElement('button'),
            container = document.createElement('div');
            del.textContent = "Done";
            del.classList.add('delete');
            container.setAttribute('id',`${type}-${numb}`);
            container.appendChild(del)
            return container;
    }
    static createProject(){
        let container = document.createElement('div');
    
        container.innerHTML =`
            <form id="project" class="form" onsubmit="return false;"action="">
                <fieldset>
                    <legend>PROJECT TASK</legend>
                    <div>
                        <label for="proj-name"> Title&nbsp:</label>
                        <input type="text" placeholder = "Ex. Workout" maxlength="30" name="project-name" id ="proj-name">
                    </div>
                    <div>
                    <label for="proj-desc">Description&nbsp:</label>
                    <input type="text" placeholder = "Ex. Mon,Wed,Thurs" maxlength="50" name="description" id ="proj-desc">
                    </div>
                    <div>
                    <label for="proj-datel">Date&Time&nbsp:</label>
                    <input type="datetime-local" name="date"id="proj-datel"required>
                    </div>
                    <div>
                        <button type="submit">Add</button>
                    </div>
                </fieldset>
            </form>
        `
        return container;
    }
    static createTask(){
        let container = document.createElement('div');
    
        container.innerHTML = `
            <form id="task-form" class="form center" onsubmit="return false;" action="">
            <fieldset>
                <legend>TASK</legend>
                <div>
                    <label for="title">Title&nbsp:</label>
                    <input type="text" placeholder = "Ex. Workout" maxlength="30"name="title" id="title" required>
                </div>
                <div>
                    <label for="desc">Description&nbsp:</label>
                    <input type="text" placeholder = "Ex. Chest Day" maxlength="50" name="description" id="desc"required>
                </div>
                <div>
                <label for="task-datel">Date&Time&nbsp:</label>
                <input type="datetime-local" name="date"id="task-datel"required>
                </div>
                <div>
                    <label for="notes">Notes&nbsp:</label>
                    <textarea name="notes" id="notes" placeholder = "Ex. Workout names" maxlength="150" cols="30" rows="10" value = "Didn't add note"></textarea>
                </div>
                <div>
                    <label for="projCon">Project&nbsp:</label>
                    <select name="projList" id="projCon">
                        <option value="none">None</option>
                    </select>
                </div>
                <div>
                    <button type="submit">Add</button>
                </div>
            </fieldset>
            </form>
        `
        return container;
    }


}