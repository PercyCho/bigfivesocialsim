let n = 36;
class Person {
    constructor(id, name, e, a, o, c, n) {
        this.name = name;
        this.e = e;
        this.a = a;
        this.o = o;
        this.c = c;
        this.n = n;
        this.id = id;
        this.hangOut = []; //list of people they have ever hung out with
        this.hangOutToday = []; // list of people they hung out with today
        this.friends = []; //list of Person objects
        this.aqtnce = []; //list of 2-length arrays, first entry is the 0 tru 1 num of the likeliness of them interacting, the second entry is the Person object
        this.groups = []; //this is tough; todo
    }
    
    hangOutRequest(aperson){
        //checks if the person is actually of the Person class
        if (aperson instanceof Person) {
        //checks if your friend list is full based on your extrovert level 
            if(this.hangOutToday.length <= Math.ceil(circularFriendLookup[this.e]/2.5)){
                //console.log(Math.ceil(circularFriendLookup[this.e]/2.5));
        //checks to see if your agreeableness levels are compatible
                //if(((aperson.a * -0.6) + 60 <= this.a) && ((aperson.a * -(10/6)) + 100 <= this.a)){
                if(Math.min((this.a*(5/6) + aperson.a*0.5),(this.a*0.5 + aperson.a*(5/6))) > 50){ //AGREEABLENESS: some math, showing how high A levels attract and low A levels detract
                    if(((((this.o + aperson.o)/2) - Math.abs(1.25*this.o - 1.25*aperson.o) + 50) > 50) && //OPENNESS
                    (Math.max((125 - Math.abs(this.n - 1.8*aperson.n + 25)),(125 - Math.abs(aperson.n - 1.8* this.n + 25))) > 50) && //NEUROTICISM
                    (Math.round(getNormallyDistributedRandomNumber(50+((aperson.c - this.c)/20), 5)) > 50)){ //CONTIENTIOUSNESS                        
                        if(this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))>=0){ //checks if they're in the hangOut array yet
                            //if so, add to how many times they've hung out
                            //console.log(Math.round(this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0]));
                            this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] = Math.round(this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0]) + 1;
                            aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0] = Math.round(aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0]) + 1;
                            if(this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] >= 3){ //if you hang out with them enough, they become friends!
                                this.friends.push(this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][1]); //if statement subject to change from just "3" based on openness value
                                aperson.friends.push(aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][1]);
                            }
                            this.hangOutToday.push(aperson);
                            aperson.hangOutToday.push(this);
                            return true;
                        } else { //if not, add them to the array
                            this.hangOut.push([1, aperson]);
                            aperson.hangOut.push([1, this]);
                            this.hangOutToday.push(aperson);
                            aperson.hangOutToday.push(this);
                            return true;
                        }
                    } 
                }
            }
            if(this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))>0){
                if(this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] > 0){
                    this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] -= 0.1;
                    aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0] -= 0.1;
                } else if ((this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] != undefined) && (this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] < 0)){
                    this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] += 0.1;
                    aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0] += 0.1;
                }
            }
        } else {
            return false;
        }
    }

    friendHangOutRequest(aperson){
        if (aperson instanceof Person) {
            if(this.hangOutToday.length <= Math.ceil(circularFriendLookup[this.e]/2.5)){
                if(Math.min((this.a*(5/6) + aperson.a*0.5),(this.a*0.5 + aperson.a*(5/6))) > 40){ //AGREEABLENESS: some math, showing how high A levels attract and low A levels detract
                    if(((((this.o + aperson.o)/2) - Math.abs(1.25*this.o - 1.25*aperson.o) + 50) > 40) && //OPENNESS
                    (Math.max((125 - Math.abs(this.n - 1.8*aperson.n + 25)),(125 - Math.abs(aperson.n - 1.8* this.n + 25))) > 40) && //NEUROTICISM
                    (Math.round(getNormallyDistributedRandomNumber(50+((aperson.c - this.c)/20), 5)) > 40)){ //CONTIENTIOUSNESS                        
                        this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] = Math.round(this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0]) + 1;
                        aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0] = Math.round(aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0]) + 1;
                        this.hangOutToday.push(aperson);
                        aperson.hangOutToday.push(this);
                        return true;
                    }
                }
            }
            if(this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))>0){
                this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] -= 0.05;
                aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0] -= 0.05;
            } else if (this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] < 0){
                this.hangOut[this.hangOut.indexOf(this.hangOut.find(({1:n}) => n === aperson))][0] += 0.05;
                aperson.hangOut[aperson.hangOut.indexOf(aperson.hangOut.find(({1:n}) => n === this))][0] += 0.05;
            }
        } else {
            return false;
        }

    }
    //The requesting system is already in the main function so we don't need a "sendRequest" function
}

/*
OK SO
-E: Your friend list size
    How many people you friend per iteration
    likeliness you'll friend others outside your group

-A: Likeliness you'll be friended:
        -The higher the A level, the more you attract other higher A levels and some lower A levels
        -The lower the A level, the more you detract other lower A levels and some higher A levels

-O: Likeliness you'll accept a friend request (based on the other person's stats)
    Likeliness you'll stay with a friend group/friend if their stats change

-C: How often you'll spend time with others closer to your values

-N: Detracts others from friending you (kinda the opposite of A)
    Attracts other people with similar N values (if they're high enough)
*/

                          //0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94, 95, 96, 97, 98, 99,100
let circularFriendLookup = [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9,10,11,11,12,12,13,14,14,15,16,17,17,18,19,19,20,21,22,23,24,25,26,27,28,29,30,31,33,34,35,37,38,39,40,42,43,45,46,48,50,52,53,55,57,58,60,63,65,68,70,73,75,78,80,83,85,89,92,96,99,103,112,122,131,141,150]
//the lookup above is for extrovert levels, translating their e level (the index in the array) to how many max friends they can have. I wanted this to be an equation (so it's easy) but I liked the circle one best sooooo I just estimated it and make a lookup here
let personList = [];
let simulationStart = false;
let meanE = 55;
let meanA = 67;
let meanO = 65;
let meanC = 60;
let meanN = 45;
const stddev = 14;
var sortedE;
var sortedA;
var sortedO;
var sortedC;
var sortedN;
let sortedHighAvg;
let sortedVariance;
let defaultPersonList;
let modalNum;
let modalOpen = false;
let itr = 0;
let chosenSort = 0;

// createPeople();
// peopleDisplay();
// let welcomeAnimation = setInterval(function (){
//     document.getElementById("people-screen").innerHTML = "";
//     personList = [];
//     createPeople();
//     peopleDisplay();
//     console.log(simulationStart);
// }, 2000);

const quickSort = (arr) => {
    if (arr.length <= 1) {
      return arr;
    }
  
    let pivot = arr[0];
    let leftArr = [];
    let rightArr = [];

    for (let i = 1; i < arr.length; i++) {
      if (arr[i][0] > pivot[0]) {
        leftArr.push(arr[i]);
      } else {
        rightArr.push(arr[i]);
      }
    }
    // console.log(pivot);
    // console.log(leftArr);
    // console.log(rightArr);
  
    return [...quickSort(leftArr), pivot, ...quickSort(rightArr)];
};

function boxMullerTransform() {
    const u1 = Math.random();
    const u2 = Math.random();
    
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    const z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
    
    return { z0, z1 };
}

function getNormallyDistributedRandomNumber(mean, stddev) {
    const { z0, _ } = boxMullerTransform();
    let value = z0 * stddev + mean;
    if (value>100){
        value = 100;
    } else if (value<0){
        value = 0;
    }
    return value
}

const findVariance = (arr = []) => {
    if(!arr.length){
       return 0;
    };
    const sum = arr.reduce((acc, val) => acc + val);
    const { length: num } = arr;
    const median = sum / num;
    let variance = 0;
    arr.forEach(num => {
       variance += ((num - median) * (num - median));
    });
    variance /= num;
    return variance;
};

function nodeToString ( node ) {
    var tmpNode = document.createElement( "div" );
    tmpNode.appendChild( node.cloneNode( true ) );
    var str = tmpNode.innerHTML;
    tmpNode = node = null; // prevent memory leaks in IE
    return str;
}

function sortAllLists(){
    let sortableE = [];
    let sortableA = [];
    let sortableO = [];
    let sortableC = [];
    let sortableN = [];
    let sortableAvg = [];
    let sortableVar = [];
    for(let i = 0; i<personList.length; i++){
        sortableE.push([personList[i].e,personList[i]]);
        sortableA.push([personList[i].a,personList[i]]);
        sortableO.push([personList[i].o,personList[i]]);
        sortableC.push([personList[i].c,personList[i]]);
        sortableN.push([personList[i].n,personList[i]]);
        sortableAvg.push([(personList[i].e+personList[i].a+personList[i].o+personList[i].c+personList[i].n)/5,personList[i]]);
        sortableVar.push([findVariance([personList[i].e,personList[i].a,personList[i].o,personList[i].c,personList[i].n]),personList[i]]);
    }
    console.log(sortableAvg);
    sortedE = quickSort(sortableE);
    sortedA = quickSort(sortableA);
    sortedO = quickSort(sortableO);
    sortedC = quickSort(sortableC);
    sortedN = quickSort(sortableN);
    sortedHighAvg = quickSort(sortableAvg);
    sortedVariance = quickSort(sortableVar);
}

function createPeople(){
    /*for(i=0; i<n*5; i++){
        let rng = Math.floor((Math.random() * 100));
        rngList.push(rng);
    }*/
    for(i=0; i<n; i++){
        /*let psn = person;
        psn.name = "Person" + i;
        psn.e = rngList[(i*5) + 0];
        psn.a = rngList[(i*5) + 1];
        psn.o = rngList[(i*5) + 2];
        psn.c = rngList[(i*5) + 3];
        psn.n = rngList[(i*5) + 4];*/

        //makes all the people in the personList randomly and according to the mean A,E,O,C,N
        personList.push(new Person(i, "Person_" + i, Math.floor(getNormallyDistributedRandomNumber(meanE, stddev)),Math.floor(getNormallyDistributedRandomNumber(meanA, stddev)),Math.floor(getNormallyDistributedRandomNumber(meanO, stddev)),Math.floor(getNormallyDistributedRandomNumber(meanC, stddev)),Math.floor(getNormallyDistributedRandomNumber(meanN, stddev))));
        
        //personList.push(new Person("Person" + i, Math.floor((Math.random() * 100)),Math.floor((Math.random() * 100)),Math.floor((Math.random() * 100)),Math.floor((Math.random() * 100)),Math.floor((Math.random() * 100))));
    }
    defaultPersonList = [...personList];
    console.log(defaultPersonList);
    sortAllLists();
    // for(var i=0;i<sortedE.length;i++){
    //     personList[i] = sortedE[i][1];
    // }
    // for(var i=0;i<sortedA.length;i++){
    //     personList[i] = sortedA[i][1];
    // }
    // for(var i=0;i<sortedO.length;i++){
    //     personList[i] = sortedO[i][1];
    // }
    // for(var i=0;i<sortedC.length;i++){
    //     personList[i] = sortedC[i][1];
    // }
    // for(var i=0;i<sortedN.length;i++){
    //     personList[i] = sortedN[i][1];
    // }
    // console.log(sortedE);
}

function peopleDisplay(){
    let prsn = document.createElement("div");
    prsn.className = "person-box";
    let psName = document.createElement("div");
    psName.className = "person-name";
    let infoBox = document.createElement("div");
    infoBox.className = "info-box";
    infoBox.appendChild(psName);
    prsn.appendChild(infoBox);
    let addedChildren = "";
    for(i=0; i<n; i++){
        let nPrsn = prsn;
        nPrsn.id = "person-" + i;
        nPrsn.firstChild.firstChild.innerHTML = personList[i].name;
        /*let rng1 = Math.floor((Math.random() * 360));
        let rng2 = Math.floor((Math.random() * 100));
        let rng3 = Math.floor((Math.random() * 60));*/
        //nPrsn.setAttribute("style", "background-color:hsl(" + rng1 + "," + rng2 + "%," + rng3 + "%)");
        nPrsn.setAttribute("style", "background-color:rgb(" + (personList[i].e*2.56) + "," + (personList[i].a*2.56) + "," + (personList[i].c*2.56) + "); border-radius:" + personList[i].o*0.4 + "px;");
        nPrsn.firstChild.setAttribute("style", "border-radius:" + ((100-personList[i].n)/4) + "px;");//+"border-color:hsl(0,0%," + (personList[i].n*2.56) + "%);");
        nPrsn.firstChild.setAttribute("onclick", "showModal(" + i + ")");
        let psNameTemp = nodeToString(nPrsn.firstChild.firstChild);
        let infoStats = "<hr style='width: 80%'>E: <progress class='val-bar bar-e' value='" + personList[i].e + "' max='100'></progress> <span id='" + i + "e'>" + personList[i].e + "</span><br>A: <progress class='val-bar bar-a' value='" + personList[i].a + "' max='100'></progress> <span id='" + i + "a'>" + personList[i].a + "</span><br>O: <progress class='val-bar bar-o' value='" + personList[i].o + "' max='100'></progress> <span id='" + i + "o'>" + personList[i].o + "</span><br>C: <progress class='val-bar bar-c' value='" + personList[i].c + "' max='100'></progress> <span id='" + i + "c'>" + personList[i].c + "</span><br>N: <progress class='val-bar bar-n' value='" + personList[i].n + "' max='100'></progress> <span id='" + i + "n'>" + personList[i].n + "</span>";
        // console.log(infoStats);
        nPrsn.firstChild.innerHTML = psNameTemp + infoStats
        // console.log(nPrsn.lastChild.innerHTML);
        addedChildren += nodeToString(nPrsn);
    }
    document.getElementById("people-screen").innerHTML = addedChildren;
}

function updateModal(num){
    modalPerson = personList[num];
    document.getElementById("modal-name").innerHTML = modalPerson.name;
    document.getElementById("e-stat").innerHTML = modalPerson.e;
    document.getElementById("a-stat").innerHTML = modalPerson.a;
    document.getElementById("o-stat").innerHTML = modalPerson.o;
    document.getElementById("c-stat").innerHTML = modalPerson.c;
    document.getElementById("n-stat").innerHTML = modalPerson.n;
    document.getElementById("modal-e-bar").value = modalPerson.e;
    document.getElementById("modal-a-bar").value = modalPerson.a;
    document.getElementById("modal-o-bar").value = modalPerson.o;
    document.getElementById("modal-c-bar").value = modalPerson.c;
    document.getElementById("modal-n-bar").value = modalPerson.n;
    console.log(modalPerson.hangOutToday);
    let hangOutTodayList = "";
    let friendsList = "";
    if(modalPerson.hangOutToday.length > 0) {
        for(i=0;i<modalPerson.hangOutToday.length;i++){
            hangOutTodayList += "<span class='modal-link' onclick='showModal(" + personList.indexOf(modalPerson.hangOutToday[i]) + ")'>" + modalPerson.hangOutToday[i].name + "</span>, ";
        }
        hangOutTodayList = hangOutTodayList.slice(0,-2);
        document.getElementById("hangout-stat").innerHTML = hangOutTodayList;
    }
    if(modalPerson.friends.length > 0) {
        for(i=0;i<modalPerson.friends.length;i++){
            friendsList += "<span class='modal-link' onclick='showModal(" + personList.indexOf(modalPerson.friends[i]) + ")'>" + modalPerson.friends[i].name + "</span>, ";
        }
        friendsList = friendsList.slice(0,-2);
        document.getElementById("friend-stat").innerHTML = friendsList;
    }
}

function showModal(num) {
    modalOpen = true;
    modalNum = num;
    updateModal(num);
    document.getElementById("welcome-screen").style.display = "block";
    document.getElementById("close-modal").setAttribute("onclick", "closeModal()"); 
    document.getElementById("modal").style.display = "inline-block";
    if(num > 0){
        document.getElementById("modal-left-arrow").style.display = "table";
    }else {
        document.getElementById("modal-left-arrow").style.display = "none";
    }
    if(num < personList.length - 1){
        document.getElementById("modal-right-arrow").style.display = "table";
    } else {
        document.getElementById("modal-right-arrow").style.display = "none";
    }
}

function closeModal(){
    modalOpen = false;
    document.getElementById("welcome-screen").style.display = "none";
}

function rightModalScroll(){
    modalNum++;
    updateModal(modalNum);
    if(modalNum == personList.length - 1){
        document.getElementById("modal-right-arrow").style.display = "none";
    } else if(modalNum == 1) {
        document.getElementById("modal-left-arrow").style.display = "table";
    }
}

function leftModalScroll(){
    modalNum--;
    updateModal(modalNum);
    if(modalNum == 0){
        document.getElementById("modal-left-arrow").style.display = "none";
    } else if(modalNum == personList.length - 2) {
        document.getElementById("modal-right-arrow").style.display = "table";
    }
}

function startSimulation(){
    // take in the options they put in
    // clearInterval(welcomeAnimation);
    simulationStart = true;
    document.getElementById("people-screen").innerHTML = "";
    personList = [];
    document.getElementById("welcome-screen").style.display = "none";
    document.getElementById("welcome-modal").style.display = "none";
    document.getElementById("screen").style.filter = "blur(0px)";
    document.getElementById("modal-left-arrow").style.display = "table";
    document.getElementById("modal-right-arrow").style.display = "table";
    createPeople();
    peopleDisplay();
}

let edotorHangOut = "graph{";

function nextIteration(){
    itr++;
    document.getElementById("itr-button").style.opacity = 0.6;
    document.getElementById("itr-button").style.cursor = "auto";
    document.getElementById("itr-button").disabled = true;
    let itrPause = setTimeout(function () {
        document.getElementById("itr-button").style.opacity = 1;
        document.getElementById("itr-button").style.cursor = "pointer";
        document.getElementById("itr-button").disabled = false;
    }, 2000);
    for(i=0;i<personList.length;i++){
        personList[i].hangOutToday = [];
    }
    for(var i=0;i<sortedA.length;i++){
        console.log(personList[i]);
        personList[i] = sortedA[i][1];
        console.log(personList[i]);
    }
    console.log(personList);
    edotorHangOut = "graph{";
    for(i=0;i<sortedE.length;i++){
        let highExtro = sortedE[i][1];
        personList.splice(personList.indexOf(highExtro),1); //removes the highest extroverted people from the agreeableness array each cycle so they don't meet each other
        //edit: I stayed up until 4 wondering why this was being stupid, realized I needed to add the ",1" at the end of the splice command aghghgh
        edotorHangOut += String(sortedE[i][1].name) + " -- {";
        console.log(personList);
        let tempPL = [...personList];
        for(k=0;k<sortedE[i][1].friends.length;k++){
            console.log(sortedE[i][1].friends);
            if(sortedE[i][1].hangOutToday.length <= Math.ceil(circularFriendLookup[sortedE[i][1].e]/2.5)){
                console.log(sortedE[i][1].friends[k]);
                let result = sortedE[i][1].friends[k].friendHangOutRequest(sortedE[i][1]);
                if(result){
                    console.log(sortedE[i][1].name + " hung out with friend " + sortedE[i][1].friends[k].name);
                    edotorHangOut += String(sortedE[i][1].friends[k].name) + " ";
                } else {
                    console.log(sortedE[i][1].name + " DID NOT hang out with friend " + sortedE[i][1].friends[k].name);
                }
            }
            tempPL.splice(personList.indexOf(sortedE[i][1].friends[k]),1);
            console.log(tempPL.length);
        }
        console.log(personList.length);
        for(j=0;j<tempPL.length;j++){
            if(sortedE[i][1].hangOutToday.length <= Math.ceil(circularFriendLookup[sortedE[i][1].e]/2.5)){
                let result = tempPL[j].hangOutRequest(sortedE[i][1]);
                if(result){
                    console.log(sortedE[i][1].name + " hung out with " + tempPL[j].name);
                    edotorHangOut += String(tempPL[j].name) + " ";
                } else {
                    console.log(sortedE[i][1].name + " DID NOT hang out with " + tempPL[j].name);
                }
            }
        }
        edotorHangOut += "}; "
    }
    edotorHangOut += "}";
    switch (chosenSort){
        case 0:
            sortByNum();
            break;
        case 1:
            sortByE();
            break;
        case 2:
            sortByA();
            break;
        case 3:
            sortByO();
            break;
        case 4:
            sortByC();
            break;
        case 5:
            sortByN();
            break;
        case 6:
            sortByHighAvg();
            break;
        case 7:
            sortByVariance();
            break;
    }
    
    peopleDisplay();
}

function sortByE(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedE);
    chosenSort = 1;
    for(var i=0;i<sortedE.length;i++){
        personList[i] = sortedE[i][1];
    }
    peopleDisplay();
}
function sortByA(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedA);
    chosenSort = 2;
    for(var i=0;i<sortedA.length;i++){
        personList[i] = sortedA[i][1];
    }
    peopleDisplay();
}
function sortByO(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedO);
    chosenSort = 3;
    for(var i=0;i<sortedO.length;i++){
        personList[i] = sortedO[i][1];
    }
    peopleDisplay();
}
function sortByC(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedC);
    chosenSort = 4;
    for(var i=0;i<sortedC.length;i++){
        personList[i] = sortedC[i][1];
    }
    peopleDisplay();
}
function sortByN(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedN);
    chosenSort = 5;
    for(var i=0;i<sortedN.length;i++){
        personList[i] = sortedN[i][1];
    }
    peopleDisplay();
}
function sortByHighAvg(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedHighAvg);
    chosenSort = 6;
    for(var i=0;i<sortedHighAvg.length;i++){
        personList[i] = sortedHighAvg[i][1];
    }
    peopleDisplay();
}
function sortByVariance(){
    document.getElementById("people-screen").innerHTML = "";
    console.log(sortedVariance);
    chosenSort = 7;
    for(var i=0;i<sortedHighAvg.length;i++){
        personList[i] = sortedVariance[i][1];
    }
    peopleDisplay();
}
function sortByNum(){
    document.getElementById("people-screen").innerHTML = "";
    personList = [...defaultPersonList];
    chosenSort = 0;
    peopleDisplay();
}

document.addEventListener('keydown', (event) => {
    if(modalOpen && event.key == "ArrowLeft" && modalNum > 0){
        leftModalScroll();
    } else if (modalOpen && event.key == "ArrowRight" && modalNum < personList.length - 1){
        rightModalScroll();
    } else if (modalOpen && event.key == "Escape") {
        closeModal();
    }
}, false);
