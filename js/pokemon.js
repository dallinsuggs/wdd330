const queryUrl = "https://pokeapi.co/api/v2/pokemon?limit=90";
let start = 0;
let end = 9;

let pokemonTeams = [];

let currentTeam = [];

function loadUp() {
  getList();
  makeTeamList();
}

function saveToLocalStorage() {
  localStorage.setItem("pokemonTeams", JSON.stringify(pokemonTeams));
}

function getList() {
  if (localStorage.getItem("pokemonTeams") != null) {
    pokemonTeams = JSON.parse(localStorage.getItem("pokemonTeams"));
  }
}

// Displays Pokemon stuff, ya
function displayPokemon(prevNext) {
    if (prevNext == 'prev') {
        if (start == 0) {
            start = 80;
            end = 89;
        } else {
            start -= 10;
            end -= 10;
        }
    } 
    if (prevNext == 'next') {
        if (start == 80) {
            start = 0;
            end = 9;
        } else {
            start += 10;
            end += 10;
        }
    }

    fetch(queryUrl)
    .then(function (response) { return response.json(); })
    .then(function (jsonObject) {
        const outputDiv = document.getElementById('output');
        outputDiv.innerHTML = "";
        for (let i = start; i < end; i++) {
            let e = document.createElement('div');
            e.setAttribute('class', 'pokemon');
            e.appendChild(document.createTextNode(upperCase(jsonObject.results[i].name)));

            //addition code:
            addBtn = document.createElement('div');
            addBtn.innerHTML = '→';
            addBtn.setAttribute('class', 'addBtn grow');
            addBtn.setAttribute('onclick', 'addPokemon(this)')
            e.appendChild(addBtn);
            //end addition code

            outputDiv.appendChild(e);
        }
    });
}
displayPokemon();

//Adds a pokemon to the team creator window on the right side of the desktop view
function addPokemon(element) {
  if (currentTeam.length < 10) {
    let teamMember = element.parentNode.childNodes[0];
    currentTeam.push(teamMember.textContent);
    console.log(currentTeam);
    makeCurrentTeam();
  }
}

//Update current Team Array and put that in the team-creator window
//Does not save to localstorage
function makeCurrentTeam() {
  let parentDiv = document.createElement('div');

  for (let i = 0; i < currentTeam.length; i++) {
    
    // Create div for each item
    let listItem = document.createElement('div');
    listItem.setAttribute('id', i);
    listItem.setAttribute('class', 'listItem');

    // Add the item text
    let textItem = document.createElement('p');
    textItem.innerHTML = currentTeam[i].valueOf();

    let xBox = document.createElement('div');
    xBox.innerHTML = 'X';
    xBox.setAttribute('class', 'xBox grow');
    xBox.setAttribute('onClick', 'deletePokemon(this)');

    listItem.appendChild(textItem);
    listItem.appendChild(xBox);

    parentDiv.appendChild(listItem);

  }

  document.getElementById('creator-content').innerHTML = parentDiv.innerHTML;
}

// Make first letter of string Uppercase
function upperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Delete a pokemon from the team creator window
function deletePokemon(element) {
  let pokemon = element.parentNode.childNodes[0].textContent;
  console.log(pokemon);
  let index =  currentTeam.indexOf(pokemon);
  if (index > -1) {
    currentTeam.splice(index, 1);
  }
  makeCurrentTeam();
  if (currentTeam.length < 1) {
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'listItem');
    pElement.innerHTML = "Click an arrow to add a pokemon.";

    document.getElementById('creator-content').appendChild(pElement);
  }
}

// Save the current team to the team list
function saveTeam() {
  if (document.getElementById('team-name').value != "" && currentTeam.length > 0) {
    // Loop through already saved teams to see if overwrite is necessary
    for (let i = 0; i < pokemonTeams.length; i++) {
      if (pokemonTeams[i][0] == document.getElementById('team-name').value) {
        pokemonTeams.splice(i, 1);
      }
    }
    let newTeam = [document.getElementById('team-name').value, currentTeam];
    pokemonTeams.push(newTeam);
    currentTeam = [];
    
    // Update editor window with empty currentTeam
    makeCurrentTeam();

    // Reset editor window items
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'listItem');
    pElement.innerHTML = "Team saved!";

    document.getElementById('team-name').value = "";

    document.getElementById('creator-content').appendChild(pElement);
    console.log(pokemonTeams);

    // Update list of teams in team viewer window
    makeTeamList();
  } else {
    if (document.getElementById('team-name').value == "") {
      console.log("changing color");
      document.getElementById("team-name").classList.add('error');
      setTimeout(
        function() {
          document.getElementById("team-name").classList.remove('error');
          document.getElementById('team-name').focus();
        }, 600);
      
    }
    if (currentTeam.length < 1) {
      document.getElementById('creator-content').classList.add('error');
      setTimeout(
        function() {
          document.getElementById("creator-content").classList.remove('error');
        }, 600);
    }    
    
  }
  
}

// Make list of all teams
function makeTeamList() {
  if (pokemonTeams.length > 0) {

    let parentDiv = document.createElement('div');

    for (let i = 0; i < pokemonTeams.length; i++) {
    
      // Create div for each item
      let listItem = document.createElement('div');
      listItem.setAttribute('id', i);
      listItem.setAttribute('class', 'listItem2');
  
      // Add the item text
      let textItem = document.createElement('div');
      textItem.setAttribute('class', 'teamItem grow');
      textItem.setAttribute('onclick', 'editTeam(this)');
      textItem.innerHTML = pokemonTeams[i][0];
  
      let xBox = document.createElement('div');
      xBox.innerHTML = 'X';
      xBox.setAttribute('class', 'xBox grow');
      xBox.setAttribute('onClick', 'deleteTeam(this)');
  
      listItem.appendChild(textItem);
      listItem.appendChild(xBox);
  
      parentDiv.appendChild(listItem);
  
    }

    document.getElementById('team-viewer-content').innerHTML = parentDiv.innerHTML;
  } else {
    let pElement = document.createElement('p');
    pElement.setAttribute('class', 'listItem');
    pElement.innerHTML = "Saved teams will show here.";
    document.getElementById('team-viewer-content').innerHTML = "";
    document.getElementById('team-viewer-content').appendChild(pElement);
  }

  saveToLocalStorage();  
}

// Delete team
function deleteTeam(element) {
  let teamName = element.parentNode.childNodes[0].textContent;
  for (let i = 0; i < pokemonTeams.length; i++) {
    if (pokemonTeams[i][0] == teamName) {
      
      pokemonTeams.splice(i, 1);
      console.log(pokemonTeams);
      makeTeamList();
    }
  }

}

// Edit team
function editTeam(element) {
  let teamName = element.parentNode.childNodes[0].textContent;
  for (let i = 0; i < pokemonTeams.length; i++) {
    if (pokemonTeams[i][0] == teamName) {
      currentTeam = pokemonTeams[i][1];
      document.getElementById('team-name').value = pokemonTeams[i][0];

      makeCurrentTeam();
    }
  }
}