const URL = "http://www.mrsoft.by/data.json";
const PROXYURL = "https://cors-anywhere.herokuapp.com/";

function handleFetch(fn) {
  return fetch(PROXYURL + URL)
    .then(res => res.json())
    .then(json => fn(json.data));
}

function handleSearchByLength(data) {
  const inputText = document.querySelector("input").value;

  const len = parseInt(inputText, 10);
  const sortedData = data.filter(el => el.length > len);

  return handleAppendText(sortedData);
}

function handleSearchByString(data) {
  const inputText = document.querySelector("input").value;
  const checkedValue = document.querySelector("#caseSensitive").checked;

  const regex = checkedValue ? new RegExp(`${inputText}`) : new RegExp(`${inputText}`, "i");
  const sortedData = data.filter(el => regex.test(el));

  return handleAppendText(sortedData);
}

function handleAppendText(sortedData) {
  const output = document.querySelector("#output");
  output.innerHTML = "";

  const h3 = document.createElement("h3");
  const h3textNode = document.createTextNode(`Found ${sortedData.length} results:`);
  h3.appendChild(h3textNode);
  output.appendChild(h3);

  const ul = document.createElement("ul");
  ul.setAttribute("class", "list-group");

  sortedData.forEach(breed => {
    const li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    const textNode = document.createTextNode(breed);
    li.appendChild(textNode);
    ul.appendChild(li);
  });
  output.appendChild(ul);
}
