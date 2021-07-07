const list = document.getElementById("list");
const todolist = document.getElementById("todo");

const addtodobtn = document.getElementById("add-todo-btn");
const delallbtn=document.getElementById('delete-all-todo')



firebase.database().ref("to-do-item").on('child_added',(data)=>{
  addtodolist(data.val().todoitem,data.val().key )  
})

function addtodolist(value,Id){
  var li = document.createElement("li");
  var litext = document.createTextNode(value);
  li.appendChild(litext);

  var div = document.createElement("div");
  var delbtn = document.createElement("button");
  var deltext = document.createTextNode("Delete");

  delbtn.setAttribute("class", "btn btn-danger");
  delbtn.setAttribute("id",Id);
  delbtn.setAttribute("onclick", "deletetodo(this)");
  var editbtn = document.createElement("button");
  var editbtntext = document.createTextNode("Edit");
  editbtn.setAttribute("class", "btn btn-success");
  editbtn.setAttribute("id", Id);
  editbtn.setAttribute("onclick", "edittodo(this)");
  editbtn.appendChild(editbtntext);

  delbtn.appendChild(deltext);
  div.appendChild(delbtn);
  div.appendChild(editbtn);
  li.appendChild(div);
  li.appendChild(div);
  list.append(li);
  delallbtn.classList.remove('for-hiding');

}


addtodobtn.addEventListener("click", () => {
 if (todolist.value==="") {
    Swal.fire({
        icon: 'info',
        title: 'Please first enter any to-do',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
 
 } 
 else{
  let key = firebase.database().ref().push().key;

  var dataforfirebase={
    todoitem: todolist.value,
    key:key
  }
   
  firebase.database().ref("to-do-item/"+key).set(dataforfirebase); 
//  addtodolist(todolist.value)


    
  
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Your to-do item has been saved',
      showConfirmButton: false,
      timer: 1500
    })
    todolist.value='';
    delallbtn.classList.remove('for-hiding');
 }
  

});

delallbtn.addEventListener('click',()=>{
    list.innerHTML="";
    delallbtn.classList.add('for-hiding');    
    firebase.database().ref("to-do-item").remove();
  })


const deletetodo = (e) => {
  // if (list.childNodes ==1) {
  //   delallbtn.classList.add('for-hiding');
  // }
  firebase.database().ref("to-do-item/"+e.id).remove(); 
  e.parentNode.parentNode.remove();
  
};

const edittodo = (e) => {

    // const { value: text } = await Swal.fire({
    //     input: 'textarea',
    //     inputLabel: 'Message',
    //     inputPlaceholder: 'Type your message here...',
    //     inputAttributes: {
    //       'aria-label': 'Type your message here'
    //     },
    //     showCancelButton: true
    //   })
      
    //   if (text) {
    //     Swal.fire(text,e.parentNode.parentNode.firstChild.nodeValue)
    //   }


    
  var edit = prompt("Eid the todo",e.parentNode.parentNode.firstChild.nodeValue);
  e.parentNode.parentNode.firstChild.nodeValue = edit;
  var dataforfirebase={
    todoitem: edit,
    key:e.id
  }


  firebase.database().ref("to-do-item/"+e.id).set(dataforfirebase);
};

