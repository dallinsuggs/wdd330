//UPDATE todos to contain objects with an ID, a CONTENT, and a COMPLETED bool

let toDos = []

let showActive = new Boolean(true);
let showCompleted = new Boolean(true);

function loadUp() {
  getList();
  makeList();
}

function getList() {
  //gets the list from local storage, if it exists
  if (localStorage.getItem("toDos") != null) {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
}

function addToDo() {
  toDos.push([false, document.getElementById('addInput').value]);
  updateToDos();
  document.getElementById('addInput').value = '';
}

document.getElementById('addInput').addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("addBtn").click();
  }
});

function updateToDos() {
  localStorage.clear();
  localStorage.setItem("toDos", JSON.stringify(toDos));
  makeList();
}



function makeList() {
  // Make the list
  parentDiv = document.createElement('div');

  // Set up a loop that goes through the items in listItems one at a time
  numberOfListItems = toDos.length;
  listItem = null;
  i = 0;

  // Add it to the page

  for (i = 0; i < numberOfListItems; ++i) {
    if (showActive == true) {
      if (toDos[i][0] == false) {
        // create an item for each one
        listItem = document.createElement('div');
        listItem.setAttribute('id', i);
        listItem.setAttribute('class', 'listItem');

        // Add the item text

        textItem = document.createElement('p');
        textItem.innerHTML = toDos[i][1].valueOf();
        
        checkBox = document.createElement('div');
        checkBox.setAttribute('class', 'checkBox');
        checkBox.setAttribute('onclick', 'markComplete(this)')

        xBox = document.createElement('div');
        xBox.innerHTML = 'X';
        xBox.setAttribute('class', 'xBox');
        xBox.setAttribute('onclick', 'deleteItem(this)')

        if (toDos[i][0] == true) {
          textItem.style.textDecoration = "line-through";
          checkBox.innerHTML = 'X';
        } else {
          textItem.style.textDecoration = "none";
          checkBox.innerHTML = '';
        }

        listItem.appendChild(checkBox);
        listItem.appendChild(textItem);
        listItem.appendChild(xBox);

        // Add listItem to the listElement
        parentDiv.appendChild(listItem);
      }
    }
    if (showCompleted == true) {
      if (toDos[i][0] == true) {
        // create an item for each one
        listItem = document.createElement('div');
        listItem.setAttribute('id', i);
        listItem.setAttribute('class', 'listItem');

        // Add the item text

        textItem = document.createElement('p');
        textItem.innerHTML = toDos[i][1].valueOf();
        
        checkBox = document.createElement('div');
        checkBox.setAttribute('class', 'checkBox');
        checkBox.setAttribute('onclick', 'markComplete(this)')

        xBox = document.createElement('div');
        xBox.innerHTML = 'X';
        xBox.setAttribute('class', 'xBox');
        xBox.setAttribute('onclick', 'deleteItem(this)')

        if (toDos[i][0] == true) {
          textItem.style.textDecoration = "line-through";
          checkBox.innerHTML = 'X';
        } else {
          textItem.style.textDecoration = "none";
          checkBox.innerHTML = '';
        }

        listItem.appendChild(checkBox);
        listItem.appendChild(textItem);
        listItem.appendChild(xBox);

        // Add listItem to the listElement
        parentDiv.appendChild(listItem);
      }
    }
  }
  document.getElementById("toDoList").innerHTML = parentDiv.innerHTML;
  console.log(toDos);

  let sum = 0;

  for (i = 0; i < toDos.length; i++) {
    if (toDos[i][0] == false) {
      sum++;
    }
  }
  document.getElementById("tasksLeft").innerHTML = sum + " tasks left";
}


function markComplete(element) {
  //updates sibling text (of checkbox) to be crossed out or none
  //checks for item on the list, and sets its boolean to false or true
  
  itemText = element.parentNode.childNodes[1];

  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].indexOf(itemText.textContent) != -1) {
      if (toDos[i][0] == false) {
        itemText.style.textDecoration = "line-through";
    
        //sets the boolean to true for completed
        toDos[i][0] = true;
        console.log(toDos);
    
        element.innerHTML = 'X';
        console.log(itemText.innerHTML + ' is now complete!');
      } else {
        itemText.style.textDecoration = "none";
    
        //sets the boolean to true for completed
        toDos[i][0] = false;
    
        element.innerHTML = '';
        console.log(itemText.innerHTML + ' is no longer complete!');
      }
    }
  }
  updateToDos();
}

function deleteItem(element) {
  itemText = element.parentNode.childNodes[1];

  for (let i = 0; i < toDos.length; i++) {
    if (toDos[i].indexOf(itemText.textContent) != -1) {
      toDos.splice(i, 1);
      updateToDos();
    }
  }
}

function filterList(element) {
  document.getElementById('tasksAll').style.border = "none";
  document.getElementById('tasksActive').style.border = "none";
  document.getElementById('tasksCompleted').style.border = "none";
  element.style.border = "2px solid rgb(33, 218, 250)";
  if (element.innerHTML == 'All') {
    showActive = true;
    showCompleted = true;
  } else if (element.innerHTML == 'Active') {
    showActive = true;
    showCompleted = false;
  } else if (element.innerHTML == 'Completed') {
    showActive = false;
    showCompleted = true;
  }
  updateToDos();
}