function makeList() {
  // Establish the array which acts as a data source for the list
  let links = [
    {
      label: "Week1 notes",
      url: "week1/index.html"
    }
  ],
  // Make the list
  listElement = document.createElement('ol'),
  // Set up a loop that goes through the items in listItems one at a time
  numberOfListItems = links.length,
  listItem,
  i;

  // Add it to the page

  for (i = 0; i < numberOfListItems; ++i) {
      // create an item for each one
      listItem = document.createElement('li');
      aItem = document.createElement("a");

      // Add the item text
      aItem.href = links[i].url.valueOf();
      aItem.innerHTML = links[i].label.valueOf();
      console.log(links[i].label.valueOf());

      // Add listItem to the listElement
      listItem.appendChild(aItem);
      listElement.appendChild(listItem);
  }
  console.log(listElement.innerHTML);
  document.getElementById("linkList").innerHTML = listElement.innerHTML;
}

// Usage
//makeList();