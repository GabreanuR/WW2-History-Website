window.onload = function(){
    function culoareHeader(){
        let title = document.querySelector("body > header > h1");
        title.style.color = `rgb(${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)},${Math.floor(Math.random()*256)})`;
    }
    setInterval(function(){
        culoareHeader();
    },2000);
    document.body.addEventListener("click",function(event){
        let notificare = document.createElement("div");
        notificare.innerHTML = `<p>Virus Enervant! :)))</p>`;
        notificare.classList.add("popup");
        document.body.appendChild(notificare);
        //console.log(event.clientX + " " + event.clientY);

        notificare.style.position = "absolute";
        notificare.style.left = event.clientX + "px";
        notificare.style.top = event.clientY + "px"; 
        console.log(getComputedStyle(notificare).width);
        console.log(getComputedStyle(notificare).border);

        let buton = document.createElement("button");
        buton.innerHTML = `Sterge`;
        buton.classList.add("buton");
        notificare.appendChild(buton);

        document.body.addEventListener("click",function(notif){
            notif.stopPropagation();
            let text = event.target.nodeName;
            let text2 = document.createElement("p");
            text2.innerHTML = text
            notificare.appendChild(text2);
            let text3 = event.currentTarget;
            let text4 = document.createElement("p");
            text4.innerHTML = text3
            notificare.appendChild(text4);
        });

        setTimeout(function(){
            notificare.style.animation = "disparitie 3s";
            setTimeout(function(){
                notificare.remove();
            },3000);
        },5000);
    });
}