let interestsToDom = require("./buildDOM");

const baseURL = "http://0.0.0.0:8088";

const APIManager = {
  getAllPlaces: function() {
    return fetch(`${baseURL}/places`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  getAllInterests: function() {
    return fetch(`${baseURL}/interests`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  addNewPlaces: function() {
    return fetch(`${baseURL}/places`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  addNewInterests: function(eventObj) {
    return fetch(`${baseURL}/interests`, {
      method: "POST",
      body: JSON.stringify(eventObj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  editInterests: function(id, eventObj) {
    return fetch(`${baseURL}/interests?id=${id}`, {
      method: "PUT",
      body: JSON.stringify(eventObj),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  deleteInterests: function(id) {
    return fetch(`${baseURL}/interests?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
  },
  ///////////////////////////////////EVENT LISTENERS//////////////////////////
  createNewEventOnClick() {
    document
      .getElementById("submit__interests")
      .addEventListener("click", function() {
        const newEventObj = {
            name: document.querySelector("#interests__name").value,
            description: document.querySelector("#interests__description").value,
            location: document.querySelector("#interests__location").value,
            cost: document.querySelector("#interests__cost").value
        };
        return APIManager.addNewInterests(newEventObj)
            .then(console.log(newEventObj));
      });
    },
    updateInterestsOnClick(id) {
        const eventObj = {
            name: document.querySelector("#interests__name").value,
            description: document.querySelector("#interests__description").value,
            location: document.querySelector("#interests__location").value,
            cost: document.querySelector("#interests__cost").value
        };
        return APIManager.editInterests(id, eventObj)
  },
};

export default APIManager;
