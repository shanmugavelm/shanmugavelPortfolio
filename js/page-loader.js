var isPageLoaded = false;
const charDelay = 80;
const textDelay = 800;

document.onreadystatechange = function () {
  if (document.readyState === "complete") isPageLoaded = true;
};

addText = function (txt) {
  return new Promise((resolve, reject) => {
    let i = 0;
    let interval = setInterval(() => {
      if (i < txt.length) {
        document.getElementById("typing").innerHTML += txt.charAt(i);
        i++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, charDelay);
  });
};

removeText = function () {
  return new Promise((resolve, reject) => {
    let interval = setInterval(() => {
      let txt = document.getElementById("typing").innerHTML;
      if (txt.length) {
        document.getElementById("typing").innerHTML = txt.substring(
          0,
          txt.length - 1
        );
      } else {
        clearInterval(interval);
        resolve();
      }
    }, charDelay);
  });
};

delay = function (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), time);
  });
};

stopPageLoading = function () {
  return new Promise((resolve, reject) => {
    if (isPageLoaded) {
      document.getElementById("app").classList.remove("display-none");
      document.getElementById("loader").classList.add("display-none");
      reject();
    } else resolve();
  });
};

addRemoveText = function () {
  let dataStr = document.getElementById("typing").getAttribute("data");
  let dataArr = dataStr.split(",");
  let promise = null;
  for (data of dataArr) {
    let text = data.trim();
    if (text) {
      if (promise) promise = promise.then(() => addText(text));
      else promise = addText(text);
      promise = promise
        .then(() => delay(textDelay))
        .then(stopPageLoading)
        .then(removeText)
        .then(stopPageLoading);
    }
  }
  return promise;
};

infiniteAddRemoveText = function () {
  addRemoveText().then(infiniteAddRemoveText);
};

infiniteAddRemoveText();