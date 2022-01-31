const cities = [
  "Madurai",
  "Tirunelveli",
  "Trichy",
  "Chennai",
  "Coimbatore",
  "Salem",
  "Bangalore",
];
const cities1 = [
  "Madurai",
  "Tirunelveli",
  "Trichy",
  "Chennai",
  "Coimbatore",
  "Salem",
  "Bangalore",
  "Mumbai",
];
const months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

const from = document.querySelector(".from");
const to = document.querySelector(".to");
const answer = document.querySelector(".answer");
const btn = document.querySelector(".btn");

let selectFrom;
let selectTo;
let inputsValue;

const route = {
  Madurai: {
    Tirunelveli: 2,
    Trichy: 2,
    Coimbatore: 3,
    Salem: 3,
  },
  Tirunelveli: {
    Madurai: 2,
  },
  Trichy: {
    Chennai: 3,
  },
  Chennai: {
    Bangalore: 2,
    Mumbai: 5,
  },
  Coimbatore: {
    Chennai: 3,
    Bangalore: 3,
  },
  Salem: {
    Bangalore: 2,
  },
  Bangalore: {
    Mumbai: 3,
  },
};

let daysFlow = [];

let shortPath = (obj, startingPoint, endingPoint) => {
  if (obj[startingPoint] === undefined) {
    return;
  }

  // track distances from the start node using a object
  let distances = {};
  //setting infinity to calculate later
  distances[endingPoint] = "Infinity";
  distances = Object.assign(distances, obj[startingPoint]);

  // track paths using a  object
  let parentOfElements = { endingPoint: null };
  for (let child in obj[startingPoint]) {
    parentOfElements[child] = startingPoint;
  }

  let alredyVisited = [];
  let node = findShortDistance(distances, alredyVisited);
  while (node) {
    let distance = distances[node];
    let children = obj[node];
    for (let child in children) {
      if (String(child) === String(startingPoint)) {
        continue;
      } else {
        let newdistance = distance + children[child];
        if (!distances[child] || distances[child] > newdistance) {
          // saving distance to current object
          distances[child] = newdistance;
          //recording the path
          parentOfElements[child] = node;
        }
      }
    }
    // move the current node to the alredyVisited set
    alredyVisited.push(node);
    // move to the nearest neighbor node
    node = findShortDistance(distances, alredyVisited);
  }

  // using the stored paths from start node to end node
  // record the shortest path

  let shortestPath = [endingPoint];
  let parent = parentOfElements[endingPoint];
  console.log(parent);
  while (parent) {
    console.log(parent);
    shortestPath.push(parent);
    parent = parentOfElements[parent];
  }
  shortestPath.reverse();

  //this is the shortest path
  let results = {
    distance: distances[endingPoint],
    path: shortestPath,
  };

  // return the shortest path & the end node's distance from the start node
  console.log(results);
  return results;
};

let findShortDistance = (distances, alredyVisited) => {
  let shortest = null;
  for (let node in distances) {
    let currentIsShortest =
      shortest === null || distances[node] < distances[shortest];
    if (currentIsShortest && !alredyVisited.includes(node)) {
      // if (route[node] !== undefined) {
      shortest = node;
      // } else {
      //   return;
      // }
    }
  }
  console.log(shortest, "short");

  return shortest;
};

let final;

function calculatingDays(arr1) {
  for (i = 0; i < arr1.length; i++) {
    const obj1 = route[arr1[i]];
    if (obj1 !== undefined) {
      if (obj1[arr1[i + 1]] !== undefined) {
        daysFlow.push(obj1[arr1[i + 1]]);
      }
    }
  }
}

const fetchingFrom = function (data) {
  let createFrom = "";
  Object.keys(data).forEach((e, index) => {
    createFrom += `<option value = '${e}'>${data[e]}</option>`;
  });
  from.insertAdjacentHTML("beforeend", createFrom);
};
fetchingFrom(cities);
const fetchingTo = function (data) {
  let createFrom = "";
  Object.keys(data).forEach((e, index) => {
    createFrom += `<option value = '${e}'>${data[e]}</option>`;
  });
  to.insertAdjacentHTML("beforeend", createFrom);
};
fetchingTo(cities1);

from.addEventListener("change", (e) => {
  selectFrom = e.target.value;
  answer.innerHTML = "";
});

to.addEventListener("change", (e) => {
  selectTo = e.target.value;
  answer.innerHTML = "";
});

btn.addEventListener("click", () => {
  let from = cities[selectFrom];
  let to = cities1[selectTo];
  console.log(from, to);
  if (from === to && from === undefined && to === undefined) {
    answer.innerHTML = "Please Enter a Valid Input";
    return;
  }
  if (from !== undefined && to !== undefined) {
    final = shortPath(route, from, to);

    if (
      final &&
      // route[final.path] !== undefined &&
      final.distance !== "Infinity"
    ) {
      calculatingDays(final.path);
      settingUI(final.path, final.distance, daysFlow);
    } else {
      answer.innerHTML = "Route Not Found";
    }
  }
});
console.log(final);

const settingUI = function (path, totaldays, numberPath) {
  let append = "";
  let startingDate = new Date();
  let dayFrom1 = startingDate.getDate();
  let dayFrom = lastWord(dayFrom1);
  let monthFrom = months[startingDate.getMonth()];
  const dateShowing = showingDate(totaldays);
  let dayTo2 = dateShowing.getDate();
  let dayTo = lastWord(dayTo2);
  let monthTo = months[dateShowing.getMonth()];
  if (daysFlow.length !== 0) {
    path.forEach((e, index) => {
      if (index + 1 === path.length) {
        append += `${e}<br>`;
      } else {
        append += `${e} --> `;
      }
    });
    numberPath.forEach((e, index) => {
      if (numberPath.length === 1) {
        append += `${e} days.  `;
      } else if (numberPath.length === index + 1) {
        append += `${e} = ${totaldays} days.`;
      } else {
        append += `${e} + `;
      }
    });
    append += `  ${dayFrom} ${monthFrom} --> Arrive on ${dayTo} ${monthTo}`;
    answer.innerHTML = append;
  } else {
    answer.innerHTML = "Route Not Found";
  }

  daysFlow = [];
};
function showingDate(days) {
  let startDate = new Date();
  let endDate;
  let noOfDaysToAdd = days;
  let count = 0;
  while (count < noOfDaysToAdd) {
    endDate = new Date(startDate.setDate(startDate.getDate() + 1));
    if (endDate.getDay() != 0 && endDate.getDay() != 6) {
      count++;
    }
  }
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  return endDate;
}

const lastWord = function (d) {
  if (d > 3 && d < 21) return `${d}<sup>th</sup>`;
  switch (d % 10) {
    case 1:
      return `${d}<sup>st</sup>`;
    case 2:
      return `${d}<sup>nd</sup>`;
    case 3:
      return `${d}<sup>rd</sup>`;
    default:
      return `${d}<sup>th</sup>`;
  }
};
