function addProduction () {
    
    var current_productions = document.getElementById('productions');
    
    var newProduction = document.createElement("div");
    newProduction.classList.add("d-flex");
    newProduction.classList.add("flex-row");

    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 12%");
    var my_input = document.createElement("input");
    my_input.setAttribute("type", "text");
    my_input.classList.add("form-control");
    my_input.classList.add("first");
    my_div.appendChild(my_input);
    newProduction.appendChild(my_div);

    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "margin-top: 1%");
    var my_p = document.createElement("p");
    var node = document.createTextNode("→");
    my_p.appendChild(node);
    my_div.appendChild(my_p);
    newProduction.appendChild(my_div);
    
    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 12%");
    my_div.setAttribute("onkeydown", "keyAction(event)");
    var my_input = document.createElement("input");
    my_input.setAttribute("type", "text");
    my_input.setAttribute("placeholder", "Ɛ");
    my_input.classList.add("form-control");
    my_input.classList.add("first");
    my_div.appendChild(my_input);
    newProduction.appendChild(my_div);
    
    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 10%");
    var my_img = document.createElement("img");
    my_img.setAttribute("src", "imgs/close.svg");
    my_img.setAttribute("onclick", "delProduction(this)");
    my_img.classList.add("hov");
    my_div.appendChild(my_img);
    newProduction.appendChild(my_div);

    current_productions.appendChild(newProduction);
}

function delProduction(element) {
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)
}

function keyAction(event) {

    var target_element = event.target.parentNode.parentNode;

    if (event.keyCode === 13) {
        addProduction();
    }
    
    if (event.key === "|") {
        
        event.preventDefault();

        if (target_element.id === "startrow") {
            
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "margin-top: 1%");
            var my_p = document.createElement("p");
            var node = document.createTextNode("|");
            my_p.appendChild(node);
            my_div.appendChild(my_p);
            target_element.appendChild(my_div);
            
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "width: 12%");
            my_div.setAttribute("onkeydown", "keyAction(event)");
            var my_input = document.createElement("input");
            my_input.setAttribute("type", "text");
            my_input.setAttribute("placeholder", "Ɛ");
            my_input.classList.add("form-control");
            my_div.appendChild(my_input);
            target_element.appendChild(my_div);

        }
        else {
            if (target_element.lastChild.nodeName === "#text") {
                target_element.removeChild(target_element.childNodes[target_element.childNodes.length - 2]);
            }
            else {
                target_element.removeChild(target_element.lastChild);                
            }

            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "margin-top: 1%");
            var my_p = document.createElement("p");
            var node = document.createTextNode("|");
            my_p.appendChild(node);
            my_div.appendChild(my_p);
            target_element.appendChild(my_div);
            
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "width: 12%");
            my_div.setAttribute("onkeydown", "keyAction(event)");
            var my_input = document.createElement("input");
            my_input.setAttribute("type", "text");
            my_input.setAttribute("placeholder", "Ɛ");
            my_input.classList.add("form-control");
            my_div.appendChild(my_input);
            target_element.appendChild(my_div);
            
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "width: 10%");
            var my_img = document.createElement("img");
            my_img.setAttribute("src", "imgs/close.svg");
            my_img.setAttribute("onclick", "delProduction(this)");
            my_img.classList.add("hov");
            my_div.appendChild(my_img);
            target_element.appendChild(my_div);
        }
    }

    if (event.target.value.length === 0 && event.keyCode === 8 && event.target.className != "form-control first") {
        target_element.removeChild(event.target.parentNode.previousElementSibling);      
        target_element.removeChild(event.target.parentNode);
    }
}

function generateCFG() {
    
    var example_box = document.getElementById("example");
    if (example_box) {
        example_box.remove();
    }

    var example_box = document.createElement("div");
    example_box.classList.add("content-section");
    example_box.setAttribute("id", "example");

    var heading = document.createElement("h3");
    var node = document.createTextNode("Examples");
    heading.appendChild(node);

    example_box.appendChild(heading);

    var main = document.getElementById("main-blocks");
    main.appendChild(example_box);
}