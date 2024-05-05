// ==UserScript==
// @name         MSQ
// @namespace    http://tampermonkey.net/
// @version      2024-05-04
// @description  Script to index all the quest in FFXIV
// @author       You
// @match        https://ffxiv.consolegameswiki.com/wiki/Main_Scenario_Quests
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function () {
  "use strict";
  var questMap = {};
  var GradaniaQuestMap = {};
  var LimasQuestMap = {};
  var UlDahQuestMap = {};

  var MSQTables = document.getElementsByClassName("pve");
  var counter = 0;
  var closeToHome = 0;

  IndexQuestline();

  function StarterQuestline(questName) {
    if (questName === "Close to Home") {
      closeToHome += 1;
      switch (closeToHome) {
        case 1:
          counter = 1;
          GradaniaQuestMap["Close to Home Gradania"] = counter;
          break;
        case 2:
          counter = 1;
          LimasQuestMap["Close to Home Limsa Lominsa"] = counter;
          break;
        case 3:
          counter = 1;
          UlDahQuestMap["Close to Home Ul'dah"] = counter;
          break;
      }
    } else {
      switch (closeToHome) {
        case 1:
          GradaniaQuestMap[questName] = counter;
          break;
        case 2:
          LimasQuestMap[questName] = counter;
          break;
        case 3:
          UlDahQuestMap[questName] = counter;
          break;
      }
    }
  }

  function IndexQuestline() {
    for (let i = 0; i < MSQTables.length; i++) {
      let QuestTable = Array.prototype.slice.call(
        MSQTables[i].getElementsByTagName("tr")
      );
      QuestTable.shift();
      for (let j = 0; j < QuestTable.length; j++) {
        counter = counter + 1;
        var questName = QuestTable[j].getElementsByTagName("td")[0].innerText;
        if (i == 0 || i == 1 || i == 2) {
          StarterQuestline(questName);
        } else if (questName == "It's Probably Pirates") {
          counter = 1;
          questMap[questName] = counter;
        } else {
          questMap[questName] = counter;
        }
      }
    }
  }
})();