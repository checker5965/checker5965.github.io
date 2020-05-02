function addProduction () {
    
    var current_productions = document.getElementById('productions');
    
    var newProduction = document.createElement("div");
    newProduction.classList.add("d-flex");
    newProduction.classList.add("flex-row");
    newProduction.classList.add("flex-wrap");

    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 12%");
    var my_input = document.createElement("input");
    my_input.setAttribute("type", "text");
    my_input.setAttribute("maxlength", "1");
    my_input.classList.add("form-control");
    my_input.classList.add("NT");
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

function fadeOut(my_element) {
    if (my_element.style.opacity > 0) {
        my_element.style.opacity = my_element.style.opacity - 0.01;
        setTimeout(fadeOut, 50, my_element);
    }
    else {
        my_element.parentNode.removeChild(my_element);
    }
}

function myAlert(message) {
    var alert_box = document.getElementById("wrong");
    if (alert_box) {
        return;
    }

    alert_box = document.createElement("div");
    alert_box.classList.add("alert-danger");
    alert_box.classList.add("content-section");
    alert_box.setAttribute("style", "opacity: 1")
    alert_box.setAttribute("id", "wrong");
    
    var text = document.createElement("h5");
    var node = document.createTextNode(message);
    text.appendChild(node);

    alert_box.appendChild(text);

    var main = document.getElementById("main-blocks");
    main.prepend(alert_box);

    setTimeout(fadeOut, 5000, alert_box);

}

var non_terminals;
var rules;

function prepare() {
    
    // Remove existing boxes
    {
        // Remove existing example box
        var example_box = document.getElementById("example");
        if (example_box) {
            example_box.remove();
        }

        // Remove existing test box
        var test_box = document.getElementById("test");
        if (test_box) {
            test_box.remove();
        }
    }
    
    // Get input from the input box
    {
        var current_nt;
        var form = document.getElementById("grammar").elements;
        non_terminals = [];
        rules = [];
        for(var i = 0; i < form.length - 2; i++) {
            var item = form.item(i);
            if (item.classList[1] == "NT") {
                current_nt = item.value;
                if (current_nt === "") {
                    myAlert("Invalid Grammar Entered!");
                    return;
                }
                non_terminals.push(item.value);
            }
            else {
                var my_val = item.value;
                if (my_val === "") {
                    my_val = "Ɛ";
                }
                rules.push(current_nt + "->" + my_val);
            }
        }
        console.log(non_terminals);
        console.log(rules);
    }

    // Create new Example Box
    {
        example_box = document.createElement("div");
        example_box.classList.add("content-section");
        example_box.setAttribute("id", "example");

        var heading = document.createElement("h3");
        var node = document.createTextNode("Examples");
        heading.appendChild(node);

        example_box.appendChild(heading);

        var my_text = document.createElement("p");
        node = document.createTextNode("An example string from this language is: ");
        my_text.appendChild(node);

        example_box.appendChild(my_text);

        var main = document.getElementById("side-blocks");
        main.appendChild(example_box);
    }
    
    // Create new Test Box
    {
        test_box = document.createElement("div");
        test_box.classList.add("content-section");
        test_box.setAttribute("id", "test");

        heading = document.createElement("h3");
        node = document.createTextNode("Test");
        heading.appendChild(node);

        test_box.appendChild(heading);

        var input_div = document.createElement("div");
        input_div.classList.add("form-group");
        
        var input_label = document.createElement("label");
        input_label.setAttribute("for", "input_strings");
        node = document.createTextNode("Input String: ");
        input_label.appendChild(node);

        var input_box = document.createElement("textarea");
        input_box.classList.add("form-control");
        input_box.setAttribute("rows", "3");
        input_box.setAttribute("id", "input_strings");

        input_div.appendChild(input_label);
        input_div.appendChild(input_box);

        test_box.appendChild(input_div);

        main = document.getElementById("main-blocks");
        main.appendChild(test_box);
    }

}

