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

var symbol_map;
var non_terminals_arr;
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

        var membership_box = document.getElementById("membership");
        if (membership_box) {
            membership_box.remove();
        }

    }

    var ret = getInput();

    if (ret === 1) {
        return;
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
        input_box.setAttribute("oninput", "testMembership()");
        input_box.setAttribute("id", "input_strings");

        input_div.appendChild(input_label);
        input_div.appendChild(input_box);

        test_box.appendChild(input_div);

        main = document.getElementById("side-blocks");
        main.appendChild(test_box);
    }

    // Create new Membership Box
    {
        membership_box = document.createElement("div");
        membership_box.classList.add("content-section");
        membership_box.setAttribute("id", "membership");

        var heading = document.createElement("h3");
        var node = document.createTextNode("Membership");
        heading.appendChild(node);

        membership_box.appendChild(heading);

        var my_table = document.createElement("table");
        my_table.classList.add("table");
        my_table.classList.add("table-borders");
        my_table.classList.add("text-center");

        
        var table_heading = document.createElement("thead");
        table_heading.classList.add("thead-my");

        var row = document.createElement("tr");
        var col = document.createElement("td");
        var node = document.createTextNode("String");
        col.classList.add("w-75");
        col.appendChild(node);
        row.appendChild(col);

        col = document.createElement("td");
        node = document.createTextNode("Member");
        col.appendChild(node);
        row.appendChild(col);

        table_heading.appendChild(row);

        my_table.appendChild(table_heading);

        var table_body = document.createElement("tbody");
        table_body.setAttribute("id", "table-body");
        my_table.appendChild(table_body);

        membership_box.appendChild(my_table);

        var main = document.getElementById("main-blocks");
        main.appendChild(membership_box);
    }

}


function getInput() {
    // Get input from the input box
    {
        var current_nt;
        var form = document.getElementById("grammar").elements;
        symbol_map = new Map();
        non_terminals_arr = [];
        rules = [];
        for(var i = 0; i < form.length - 2; i++) {
            var item = form.item(i);
            if (item.classList[1] == "NT") {
                current_nt = item.value;
                if (current_nt === "") {
                    myAlert("Invalid Grammar Entered!");
                    return 1;
                }
                symbol_map.set(item.value, 1);
                non_terminals_arr.push(item.value);
            }
            else {
                var my_val = item.value;
                if (my_val === "") {
                    my_val = "Ɛ";
                }
                symbol_map.set(my_val, 0);
                rules.push([current_nt, my_val]);
            }
        }

        return 0;
    }
}

function init(S, len) {
    S = [...Array(len + 1)].map(elem => new Set());
    return S;
}

function predictor(S, state, j) {
    for (var rule = 0; rule < rules.length; rule++) {
        if (rules[rule][0] === state[1][state[1].indexOf('.') + 1]) {
            S[j].add(JSON.stringify([rules[rule][0], "." + rules[rule][1], j])); 
        }
    }
    return S;
}

function scanner(S, state, j, character) {
    console.log("Scanner");
    if (state[1][state[1].indexOf('.') + 1] === character) {
        var split_rule = state[1].split('.');
        S[j + 1].add(JSON.stringify([state[0], split_rule[0] + split_rule[1][0] + "." + split_rule[1].substring(1), state[2]]));
    }
    return S;
}

function completer() {
    console.log("completer");
}

var S;

function testMembership() {
    var input_strings = document.getElementById("input_strings").value;
    input_strings = input_strings.split("\n");
    
    for (var i = 0; i < input_strings.length; i++) {
        S = init(S, input_strings[i].length);

        S[0].add(JSON.stringify(["γ", ".S", 0]));
        
        for (var j = 0; j <= input_strings[i].length; j++) {
            for (var k = 0; k < S[j].size; k++) {
                var current_rule = JSON.parse(Array.from(S[j])[k]);

                if (current_rule[1][current_rule[1].length - 1] === ".") {
                    completer();
                }
                else {
                    if (symbol_map.get(current_rule[1][current_rule[1].indexOf('.') + 1]) === 1) {
                        S = predictor(S, current_rule, j);
                        // console.log(S);
                    }
                    else {
                        S = scanner(S, current_rule, j, input_strings[i][j]);
                        console.log(S);
                    }
                }
            }
        }
        // Add to table here
    }
}