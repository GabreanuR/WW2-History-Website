window.onload = function(){
    function culoareHeader(){
        let title = document.querySelector("body > header > h1");
        title.style.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
    }
    setInterval(function(){
        culoareHeader();
    },2000);
    let inputNume = document.getElementById("nume");
    let inputEmail = document.getElementById("email");
    let inputParola = document.getElementById("parola");
    let login = document.getElementById("login");
    let register = document.getElementById("register");
    let logout = document.createElement("button");
    logout.innerHTML = "Logout";
    let divUser = document.getElementById("Detalii Utilizator");
    let divUtilizator = document.getElementById("Utilizator");
    divUtilizator.appendChild(logout);
    divUtilizator.style.display = "None";
    let divQuiz = document.getElementById("Quiz");
    divQuiz.style.display = "None";
    let form = document.getElementsByClassName(".form > input");
    form.disabled = true;
    let q = document.getElementsByTagName("input");
    let submit = document.getElementById("submit");
    let enter = document.createElement("p");
    enter.innerHTML = "Apasa enter";
    let rezultate = document.getElementById("rezultate");
    rezultate.style.display = "None";
    let ob = [];
    let nruser = 0;
    let userEfectiv = document.createElement("h3");
    verify = function(){
        ob = JSON.parse(localStorage.getItem("date"));
        nruser = ob.length;   
    }
    register.onclick = function(){
        user = {
            nume: inputNume.value,
            email: inputEmail.value,
            parola: inputParola.value
        };
        let ok2 = 0;
        if(ok2 == 0){
            let patern1 = /[a-z]/;
            if(patern1.test(user.parola)!=0){
                let patern2 = /[A-Z]/;
                if(patern2.test(user.parola)!=0){
                    let patern3 = /[0-9]/;
                    if(patern3.test(user.parola)!=0){
                        if(user.parola.length >= 8){
                            ok2 = 1;
                        }
                        else{
                            alert("Parola are nevoie de minim 8 caractere");
                        }
                    }
                    else{
                        alert("Trebuie si cifre");
                    }
                }
                else{
                    alert("Trebuie si litere mari");
                }
            }
            else{
                alert("Trebuie litere mici");
            }
        }
        if(ok2 == 1){
            if(localStorage.getItem("date")){
                let array = JSON.parse(localStorage.getItem("date"));
                let ok = 1;
                for(let i = 0; i < nruser; i++){
                    let element = array.at(i);
                    let emailVerif = element.email;
                    if(emailVerif == user.email){
                        alert(`Emailul exista deja`);
                        ok = 0;
                    }
                }
                if(ok == 1){
                    ob.push(user);
                }
            }
            else{
                ob.push(user);
            }
            localStorage.setItem("date",JSON.stringify(ob));
            verify();
        }
    }
    login.onclick = function(){
        verify();
        if(nruser == 0){
            alert("Utilizator invalid");
        }
        let user = {
            nume: inputNume.value,
            email: inputEmail.value,
            parola: inputParola.value
        };
        if(localStorage.getItem("date")){
            let array = JSON.parse(localStorage.getItem("date"));
            for(let i = 0; i < nruser; i++){
                let element = array.at(i);
                let emailVerif = element.email;
                let numeVerif = element.nume;
                let parolaVerif = element.parola;
                if(emailVerif == user.email){
                    if(numeVerif == user.nume){
                        if(parolaVerif == user.parola){
                            divUser.style.display = "None";
                            divUtilizator.style.display = "Block";
                            divQuiz.style.display = "Block";
                            form.disabled = false;
                            userEfectiv.innerHTML = `${user.nume}`;
                            divUtilizator.appendChild(userEfectiv); 
                            break;
                        }
                        else{
                            alert(`Parola gresita`);
                        }
                    }
                    else{
                        alert("Nume gresit");
                    }
                }
                else{
                    alert("Email gresit");
                }
            }
        }
    }
    logout.onclick = function(){
        userEfectiv.remove();
        divUtilizator.style.display = "None";
        divUser.style.display = "Block";
        divQuiz.style.display = "None";
        for(let i = 0; i < q.length; i++){
            q[i].checked = false;
        }
        form.disabled = true;
    }
    submit.onclick = function(){
        divQuiz.appendChild(enter);
    }
    submit.addEventListener('keydown', function (e) {
        if(e.key == "Enter"){
            divQuiz.style.display = "None";
        }
    }, false);
    document.getElementById("submit").addEventListener('keydown', function(event) {
        if(event.key == "Enter"){
            divQuiz.style.display = "None";
            event.preventDefault(); 
            const raspunsuriCorecte = {
                q1: "corect",
                q2: "corect",
                q3: "corect",
                q4: "corect",
                q5: "corect",
                q6: "corect",
                q7: "corect"
            };
            let punctaj = 0;
            for (let intrebare in raspunsuriCorecte) {
                const raspunsSelectat = document.querySelector(`input[name='${intrebare}']:checked`);
                if (raspunsSelectat) {
                    if (raspunsSelectat.value.trim() === raspunsuriCorecte[intrebare]) {
                        punctaj++;
                    } 
                }
            }
            let date = new Date();
            alert(`Ai răspuns corect la ${punctaj} întrebări din 7!`);
            let rezultatNou = document.createElement("p");
            rezultatNou.innerHTML = `Date: ${date}, ${punctaj} din 7`;
            rezultate.appendChild(rezultatNou);
            rezultate.style.display = "Block";
        }
    },false);
    let titluMare = document.getElementById("titlumare");
    document.body.addEventListener("click",function(){
        let url = "http://localhost:8000/mesaje.json";
        fetch(url).then(function(response){
            if(response.status == 200){
                return response.json();
            }
            else{
                throw newError("Statusul este: " + response.status);
            }
        }).then(function(date){
            let cnt = Math.floor(Math.random()*4);
            let text = date[cnt].mesaj;
            titluMare.innerHTML = text;
        });
    });
    let headertop = document.getElementById("headertop").classList;
    headertop.add("headertopStyle");
    let canvas = document.getElementById("canvas");
    let context = canvas.getContext("2d");
    {
        let fade = context.createLinearGradient(0, 0, 200, 200);
        fade.addColorStop(0, "red");
        fade.addColorStop(0.4, "yellow");
        fade.addColorStop(0.7,"green");
        fade.addColorStop(1.0, "black");

        context.beginPath();
        context.moveTo(10,10);
        context.lineTo(50,190);
        context.lineTo(70,190);
        context.lineTo(110,30);
        context.lineTo(150,190);
        context.lineTo(170,190);
        context.lineTo(210,10);
        context.lineTo(190,10);
        context.lineTo(160,150);
        context.lineTo(130,10);
        context.lineTo(90,10);
        context.lineTo(60,150);
        context.lineTo(30,10);
        context.closePath();
        context.fillStyle = fade;
        context.fill();
        context.stroke();

        context.beginPath();
        context.moveTo(40,30);
        context.lineTo(80,210);
        context.lineTo(100,210);
        context.lineTo(140,50);
        context.lineTo(180,210);
        context.lineTo(200,210);
        context.lineTo(240,30);
        context.lineTo(220,30);
        context.lineTo(190,170);
        context.lineTo(160,30);
        context.lineTo(120,30);
        context.lineTo(90,170);
        context.lineTo(60,30);
        context.closePath();
        context.fillStyle = fade;
        context.fill();
        context.stroke();
    }
}