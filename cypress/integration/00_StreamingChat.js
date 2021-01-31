/// <reference types="cypress" />
context('User - JoinRoom', () => {
    beforeEach(() => {
        // cy.wait(1000);    
    })
    joinRoom();
    checkMessageRecieved();
    checkPrayerRequestRecieved();
});
function joinRoom() {
    it('Check JoinRoom , setName,  updateAttendance and sendMessage ', () => {
        const socket=new WebSocket(Cypress.env('chatServiceUrl'));
        let length=0;
        socket.onopen=function(e){
            socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': "church_55", 'token': '' }));
        }
        socket.onmessage=(event)=> {
            let data= JSON.parse(event.data);
            length++;
            if(length===1){ 
                socket.send(JSON.stringify({ 'action': 'setName', 'userGuid': '123', 'displayName': 'David' }));
            cy.expect(data).to.have.property("action", "updateAttendance");
            cy.expect(data).to.have.property("totalViewers",2);
            cy.expect(data).to.have.property("viewers");
            }
            if(length===2){
                const viewers=data.viewers;
                socket.send(JSON.stringify({ 'action': 'sendMessage', 'room': "church_55", 'userGuid': '123', 'name': "David", 'msg': "Hello", 'token': "" }));
                cy.expect(data).to.have.property("action", "updateAttendance");
                cy.expect(data).to.have.property("totalViewers",2);
                cy.expect(viewers[0]).to.have.property("displayName", "David"); 
            }
            if(length===3){
                console.log(JSON.stringify(data));
                cy.expect(data).to.have.property("action", "sendMessage");
                cy.expect(data).to.have.property("name","David");
                cy.expect(data).to.have.property("msg","Hello");
                
            }
        };
    });
}

function checkMessageRecieved() {
    it('check Catchup message ', () => {
        const socket=new WebSocket(Cypress.env('chatServiceUrl'));
        let length=0;
        
        socket.onopen=function(e){
            socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': "church_55", 'token': '' }));
        }
        socket.onmessage = function (event) {
            let data=JSON.parse(event.data);
            length++;
            if(length===1){
                const messages=data.messages;
                cy.expect(data).to.have.property("action", "catchup");
                cy.expect(data).to.have.property("messages");
                cy.expect(messages[0]).to.have.property("msg","Hello");
            }
            if(length===2){
                socket.send(JSON.stringify({ 'action': 'requestPrayer', 'room': "church_" + 55, 'name': 'Yonas', 'userGuid': 321 }));
                cy.expect(data).to.have.property("action", "updateAttendance");
                cy.expect(data).to.have.property("totalViewers",3);
                cy.expect(data).to.have.property("viewers");
            }
        };
    });
}
function checkPrayerRequestRecieved() {
    it('check request prayer message recieved', () => {
        const socket=new WebSocket(Cypress.env('chatServiceUrl'));
        let length=0;
        socket.onopen=function(e){
            login().then(res=>{
                socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': "church_55.host", 'token': res.token }));
                socket.send(JSON.stringify({ 'action': 'joinRoom', 'room': "church_55", 'token': res.token }));
            }); 
        }
        socket.onmessage = function (event) {
            let data=JSON.parse(event.data);
            length++;
            if(length===1){
                const messages=data.messages;
                cy.expect(data).to.have.property("action", "catchup");
                cy.expect(data).to.have.property("messages");
                cy.expect(messages[0]).to.have.property("action","requestPrayer");
                cy.expect(messages[0]).to.have.property("room","church_55");               
            }
            if(length===2){
                const messages=data.messages;
                cy.expect(data).to.have.property("action", "catchup");
                cy.expect(data).to.have.property("messages");
                cy.expect(messages[0]).to.have.property("msg","Hello"); 
                
                
            }
        };

    });
}

function login(){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({email:Cypress.env('email'), password:Cypress.env('password'),appName:"StreamingLive"})
    };
    return fetch(Cypress.env("accessManagmentUrl")+"/users/login", requestOptions).then(response => response.json())
    
}