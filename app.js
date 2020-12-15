/**
 * Helper function to create new 
 * productions in the input area.
 */
function addProduction () {
    
    // Get current productions
    var current_productions = document.getElementById('productions');
    
    // Create new row for production
    var newProduction = document.createElement("div");
    newProduction.classList.add("d-flex");
    newProduction.classList.add("flex-row");
    newProduction.classList.add("flex-wrap");

    // Create Non-Terminal
    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 15%");
    var my_input = document.createElement("input");
    my_input.setAttribute("type", "text");
    my_input.setAttribute("maxlength", "1");
    my_input.classList.add("form-control");
    my_input.classList.add("NT");
    my_div.appendChild(my_input);
    newProduction.appendChild(my_div);

    // Connector
    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "margin-top: 1%");
    var my_p = document.createElement("p");
    var node = document.createTextNode("→");
    my_p.appendChild(node);
    my_div.appendChild(my_p);
    newProduction.appendChild(my_div);
    
    // Create space for Terminal
    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 15%");
    my_div.setAttribute("onkeydown", "keyAction(event)");
    var my_input = document.createElement("input");
    my_input.setAttribute("type", "text");
    my_input.setAttribute("placeholder", "Ɛ");
    my_input.classList.add("form-control");
    my_input.classList.add("first");
    my_div.appendChild(my_input);
    newProduction.appendChild(my_div);
    
    // Button to delete production
    var my_div = document.createElement("div");
    my_div.classList.add("p-2");
    my_div.setAttribute("style", "width: 10%");
    var my_img = document.createElement("img");
    my_img.setAttribute("src", "imgs/close.svg");
    my_img.setAttribute("onclick", "delProduction(this)");
    my_img.classList.add("hov");
    my_div.appendChild(my_img);
    newProduction.appendChild(my_div);

    // Add new production to DOM
    current_productions.appendChild(newProduction);
}

/**
 * Helper function to delete a 
 * production from the input area.
 * 
 * @param {*} element The production to delete
 */
function delProduction(element) {
    element.parentNode.parentNode.parentNode.removeChild(element.parentNode.parentNode)
}

/**
 * Helper function to control
 * productions via keyboard.
 * 
 * @param {*} event Key press
 */
function keyAction(event) {

    // Find target element.
    var target_element = event.target.parentNode.parentNode;

    // If Enter, create new production.
    if (event.keyCode === 13) {
        addProduction();
    }
    
    // If [|], add new rule to current production.
    if (event.key === "|") {
        
        // Prevent treating [|] like a character.
        event.preventDefault();

        // If this is the first row.
        if (target_element.id === "startrow") {
            
            // Create the space for the new rule.
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "margin-top: 1%");
            var my_p = document.createElement("p");
            var node = document.createTextNode("|");
            my_p.appendChild(node);
            my_div.appendChild(my_p);
            target_element.appendChild(my_div);
            
            // Create the actual box for the rule.
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "width: 15%");
            my_div.setAttribute("onkeydown", "keyAction(event)");
            var my_input = document.createElement("input");
            my_input.setAttribute("type", "text");
            my_input.setAttribute("placeholder", "Ɛ");
            my_input.classList.add("form-control");
            my_div.appendChild(my_input);
            target_element.appendChild(my_div);
        }
        else {
            // Hacky fix to prevent weird behaviour on deletion.
            if (target_element.lastChild.nodeName === "#text") {
                target_element.removeChild(target_element.childNodes[target_element.childNodes.length - 2]);
            }
            else {
                target_element.removeChild(target_element.lastChild);                
            }

            // Create the space for the new rule.
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "margin-top: 1%");
            var my_p = document.createElement("p");
            var node = document.createTextNode("|");
            my_p.appendChild(node);
            my_div.appendChild(my_p);
            target_element.appendChild(my_div);
            
            // Create the actual box for the rule.
            var my_div = document.createElement("div");
            my_div.classList.add("p-2");
            my_div.setAttribute("style", "width: 15%");
            my_div.setAttribute("onkeydown", "keyAction(event)");
            var my_input = document.createElement("input");
            my_input.setAttribute("type", "text");
            my_input.setAttribute("placeholder", "Ɛ");
            my_input.classList.add("form-control");
            my_div.appendChild(my_input);
            target_element.appendChild(my_div);
            
            // Add delete button here.
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

    // Deleting rules on backspace, but be careful not to delet the first rule.
    if (event.target.value.length === 0 && event.keyCode === 8 && event.target.className != "form-control first") {
        target_element.removeChild(event.target.parentNode.previousElementSibling);      
        target_element.removeChild(event.target.parentNode);
    }
}

/**
 * Helper function to fade out
 * a pop up.
 * 
 * @param {*} my_element The element to fade out 
 */
function fadeOut(my_element) {
    if (my_element.style.opacity > 0) {
        my_element.style.opacity = my_element.style.opacity - 0.01;
        setTimeout(fadeOut, 50, my_element);
    }
    else {
        my_element.parentNode.removeChild(my_element);
    }
}


/**
 * Helper function to print a
 * fading alert at the top of 
 * the application.
 * 
 * @param {*} message The message to display in the alert
 */
function myAlert(message) {
    // If an alert already exists, return.
    var alert_box = document.getElementById("wrong");
    if (alert_box) {
        return;
    }

    // Create the alert box.
    alert_box = document.createElement("div");
    alert_box.classList.add("alert-danger");
    alert_box.classList.add("content-section");
    alert_box.setAttribute("style", "opacity: 1")
    alert_box.setAttribute("id", "wrong");
    
    // Add the text to the alert box.
    var text = document.createElement("h5");
    var node = document.createTextNode(message);
    text.appendChild(node);

    // Append the text to the box.
    alert_box.appendChild(text);

    // Append the box to the top of the application.
    var main = document.getElementById("main-blocks");
    main.prepend(alert_box);

    // Fade the box after 5000 ms.
    setTimeout(fadeOut, 5000, alert_box);

}

// Set of all rules received from input.
var rules;

// A map of all symbols, 1 indicates NT, 0 indicates T.
var symbol_map;

// Nullable Non Terminals.
var null_set;

// Map of rules to backpointers.
var ptr_map;

// The array of all States.
var S;

/**
 * Function that takes user
 * input from the input box
 * and populates various data
 * structures.
 */
function getInput() {
    // Get input from the input box.
    {
        // Initialize things.
        var current_nt;
        symbol_map = new Map();
        rules = [];
        null_set = new Set();

        // Get user input.
        var form = document.getElementById("grammar").elements;
        
        // Convert user input to some usable form.
        {
            // Iterate over all form items.
            for(var i = 0; i < form.length - 2; i++) {
                var item = form.item(i);

                // If current item is a Non-Terminal, update current NT.
                if (item.classList[1] == "NT") {
                    current_nt = item.value;

                    // If the NT is empty, grammar is invalid. Throw error.
                    if (current_nt === "") {
                        myAlert("Invalid Grammar Entered!");

                        // Exit Code 1: Invalid Grammar.
                        return 1;
                    }

                    // Populate our map of all Symbols, and set value to Non-Terminal.
                    symbol_map.set(item.value, 1);
                }

                // Terminal 
                else {
                    var my_val = item.value;

                    // If current terminal is empty character, add the current NT to nullable set.
                    if (my_val === "") {
                        null_set.add(current_nt);
                    }
                    
                    // Populate our map of all Symbols, and set value to Terminal.
                    if (!symbol_map.get(my_val)===1)
                    {
                        symbol_map.set(my_val, 0);
                    }

                    // Add new rule to set of all rules.
                    rules.push([current_nt, my_val]);
                }
            }

            // Make sure our nullable set is correct.
            // Loop over all rules and keep adding nullable
            // symbols till null set size does not increase
            // anymore.
            var curr_null_set_size = null_set.size;
            while (true) {
                for (var rule = 0; rule < rules.length; rule++) {
                    if (!null_set.has(rules[rule][0])) {
                        var flag = 1;
                        var curr_string = rules[rule][1];
                        for (var str_iter = 0; str_iter < curr_string.length; str_iter++) {
                            if (!null_set.has(curr_string[str_iter])) {
                                flag = 0;
                            }
                        }
                        if (flag) {
                            null_set.add(rules[rule][0]);
                        }
                    }
                }
                if (null_set.size === curr_null_set_size) {
                    break;
                }
                else {
                    curr_null_set_size = null_set.size;
                }
            }

        }
        // Exit Code 0: All good. Yay!
        return 0;
    }
}


/**
 * Function that sets up the required
 * frontend elements and initializes
 * the state for the back-end for parsing.
 */
function prepare() {
    
    // Remove existing boxes.
    {
        // Remove existing example box.
        var example_box = document.getElementById("example");
        if (example_box) {
            example_box.remove();
        }

        // Remove existing test box.
        var test_box = document.getElementById("test");
        if (test_box) {
            test_box.remove();
        }

        // Remove existing membership box.
        var membership_box = document.getElementById("membership");
        if (membership_box) {
            membership_box.remove();
        }
    }

    // Get the input CFG.
    var ret = getInput();
    
    // If input CFG is wrong, stop.
    if (ret === 1) {
        return;
    }

    // Create new Example Box.
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
    
    // Create new Test Box.
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

    // Create new Membership Box.
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

    // MILESTONE 2 ENDS HERE. 

    // Start testing for membership.
    testMembership();

    // Show an example for the input CFG.
    addExample(createExample());

}


/**
 * Helper function to add an
 * example for the given CFG
 * to the application.
 * 
 * @param {*} my_string The example string
 */
function addExample(my_string) {
    var example_box = document.getElementById("example");

    var new_example = document.createElement("input");
    new_example.classList.add("form-control");
    new_example.setAttribute("readonly", "readonly");
    new_example.setAttribute("style", "cursor: not-allowed; width: 75%; margin-bottom: 10px;");
    new_example.setAttribute("value", my_string);

    example_box.appendChild(new_example);
}

/**
 * Helper function to check if given
 * string has any Non-Terminals or not.
 * Used in example generation.
 * 
 * @param {*} my_string The string to check
 */
function isNotResolved(my_string) {
    
    // Iterate over the string and return true if any NT is found.
    for (var i = 0; i < my_string.length; i++) {
        if (symbol_map.get(my_string[i]) == 1) {
            return true;
        }
    }
    // No NT found, string is resolved.
    return false;
}

/**
 * Low cost, naive, example generation
 * algorithm. It's not the best, but it
 * gets the job done for now.
 * In the future, a more sophisticated
 * algorithm can be implemented.
 * Example - http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.32.8707
 */
function createExample() {

    // Take the very first rule in the grammar, and set number of tries to 0.
    var curr_str = rules[0][1];
    var tries = 0;
    var curr_index = 0;

    // While the given string does not fully consist of Terminals, 
    // and number of tries are less than 20, keep trying.
    // The 20 number has been chosen to keep this fast.
    // Another reason for limiting the tries is to make sure that
    // this naive algorithm actually terminates. Otherwise we can
    // run into some pretty nasty cases when a NT can be resolved to itself.
    while(isNotResolved(curr_str) && tries <= 20) {
        
        // If the element at the current index is a Terminal, advance the index.
        if (symbol_map.get(curr_str[curr_index]) != 1) {
            curr_index++;
        }
        // Non-Terminal 
        else {
            var flag = 0;
            var prev_rule;

            // Iterate over the set of all rules.
            for (var rule = 0; rule < rules.length; rule++) {
                
                // If the rule is a match, check if the LHS is resolvable.
                if (rules[rule][0] == curr_str[curr_index]) {

                    // If LHS is not resolvable, try to find a resolvable LHS.
                    // Set flag, which indicates a rule for the current 
                    // Non-Terminal was seen. Store this rule in Previous. 
                    if (isNotResolved(rules[rule][1])) {
                        flag = 1;
                        prev_rule = rule;
                    }

                    // If LHS is resolvable, we are done. Advance the index of the 
                    // string and break out of the loop. Unset flag.
                    else {
                        flag = 0;
                        curr_str = [curr_str.slice(0, curr_index), curr_str.slice(curr_index + 1)];
                        curr_str = curr_str[0] + rules[rule][1] + curr_str[1];
                        break;
                    }
                }
            }

            // If flag is set, no resolvable rule was found. 
            // Apply the last seen non-resolvable rule.
            if (flag === 1) {
                curr_str = [curr_str.slice(0, curr_index), curr_str.slice(curr_index + 1)];
                curr_str = curr_str[0] + rules[prev_rule][1] + curr_str[1];
            }

            // Increment number of tries.
            tries++;
        }
    }

    // If the final string remanining at loop exit was unresolved,
    // we were unable to find an example using this algorithm.
    if (isNotResolved(curr_str)) {
        return "Sorry, example unavailable.";
    }
    
    // Example generated! 
    else {
        if (curr_str == "") {
            curr_str = "Ɛ";
        }
        return curr_str;
    }
}

/**
 * Helper function that constructs back-pointers
 * for completed rules and populates our pointer map.
 * @param {*} rule The rule for which back_ptr needs to be constructed
 * @param {*} j Chart column of back-pointer
 * @param {*} k Chart row of back-pointer
 * @param {*} temp_rule The rule that caused a match
 * @param {*} prev Chart column of the matched rule
 */
function addPtr(rule, j, k, temp_rule, prev) {

    // New representation for map.
    rule = String(j) + rule;

    // If there already exists a pointer for given rule.
    if (ptr_map.get(rule)) {
        
        // Add new backpointers to existing pointer array. 
        temp_arr = ptr_map.get(rule);
        
        // If the matched string itself has backpointers, they need to be added.
        if (ptr_map.get(String(prev) + temp_rule)) {
            var iter_arr = ptr_map.get(String(prev) + temp_rule);
            for (var i = 0; i < iter_arr.length; i++) {
                var curr_arr = [];
                curr_arr.push([j, k]);
                for (var i2 = 0; i2 < iter_arr[i].length; i2++) {
                    curr_arr.push(iter_arr[i][i2]);
                }
                temp_arr.push(curr_arr);
            }
        }

        // If pointers for prior rules don't exist.
        else {
            var curr_arr = [];
            curr_arr.push([j, k]);
            temp_arr.push(curr_arr);
        }

        // Push all back pointers in our pointer map.
        ptr_map.set(rule, temp_arr);
    }

    // If no backpointers existed for this rule.
    else {

        // Create new pointer array and add back-pointers.
        temp_arr = [];

        // If the matched string itself has backpointers, they need to be added.
        if (ptr_map.get(String(prev) + temp_rule)) {
            var iter_arr = ptr_map.get(String(prev) + temp_rule);
            for (var i = 0; i < iter_arr.length; i++) {
                var curr_arr = [];
                curr_arr.push([j, k]);
                for (var i2 = 0; i2 < iter_arr[i].length; i2++) {
                    curr_arr.push(iter_arr[i][i2]);
                }
                temp_arr.push(curr_arr);
            }
        }

        // If pointers for prior rules don't exist.
        else {
            var curr_arr = [];
            curr_arr.push([j, k]);
            temp_arr.push(curr_arr);
        }
        
        // Push all back pointers in our pointer map.
        ptr_map.set(rule, temp_arr);
    }
}

/**
 * Function that copies the backpointers
 * of scanned or predicted rule from
 * parent rule.
 * @param {*} rule The rule for which back-ptr needs to be copied
 * @param {*} j Chart column
 * @param {*} k Chart row
 * @param {*} temp_rule The rule that caused the match
 * @param {*} prev Chart column of the matched rule
 */
function copyPtr(rule, j, k, temp_rule, prev) {

    // New representation for map.
    rule = String(j) + rule;

    // If there already exists a pointer for given rule.
    if (ptr_map.get(rule)) {
        
        // Add new backpointers to existing pointer array. 
        temp_arr = ptr_map.get(rule);
        
        // If the matched string itself has backpointers, they need to be added.
        if (ptr_map.get(String(prev) + temp_rule)) {
            var iter_arr = ptr_map.get(String(prev) + temp_rule);
            for (var i = 0; i < iter_arr.length; i++) {
                var curr_arr = [];
                for (var i2 = 0; i2 < iter_arr[i].length; i2++) {
                    curr_arr.push(iter_arr[i][i2]);
                }
                if (curr_arr !== []) {
                    temp_arr.push(curr_arr);
                }
            }
        }

        // Push all back pointers in our pointer map.
        ptr_map.set(rule, temp_arr);
    }

    // If no backpointers existed for this rule.
    else {

        // Create new pointer array and add back-pointers.
        temp_arr = [];

        // If the matched string itself has backpointers, they need to be added.
        if (ptr_map.get(String(prev) + temp_rule)) {
            var iter_arr = ptr_map.get(String(prev) + temp_rule);
            for (var i = 0; i < iter_arr.length; i++) {
                var curr_arr = [];
                for (var i2 = 0; i2 < iter_arr[i].length; i2++) {
                    curr_arr.push(iter_arr[i][i2]);
                }
                if (curr_arr.length) {
                    temp_arr.push(curr_arr);
                }
            }
        }

        // Push all back pointers in our pointer map.
        if (temp_arr.length) {
            ptr_map.set(rule, temp_arr);
        }
    }

}


/**
 * Initialize the chart.
 * We start with an array with n + 1 columns
 * where n is number of tokens. Each of these
 * columns contains a set.
 * @param {*} S Empty array of all states
 * @param {*} len The number of tokens
 */
function init(S, len) {
    S = [...Array(len + 1)].map(elem => new Set());
    return S;
}


/**
 * Predicts rules from non-terminals next 
 * to the current position and adds to state
 * array. For example, rules of the form
 * φNT are replaced with φα where NT -> α.
 * @param {*} S The state array
 * @param {*} state Current state
 * @param {*} j Chart column
 */
function predictor(S, state, j, k) {
    
    // Iterate over all rules. 
    for (var rule = 0; rule < rules.length; rule++) {

        // Check if rules of the form NT -> α exist when current state is φNT.
        if (rules[rule][0] === state[1][state[1].indexOf("φ") + 1]) {
            
            // Construct and add new rule.
            var new_rule = JSON.stringify([rules[rule][0], "φ" + rules[rule][1], j]);
            S[j].add(new_rule);
            
            // Handle nullable rules.
            // Essentially, doing a complete step here.
            if (null_set.has(rules[rule][0])) {
                
                // Construct and add new rule.
                var split_rule = state[1].split("φ");
                new_rule = JSON.stringify([state[0][0], split_rule[0] + split_rule[1][0] + "φ" + split_rule[1].substring(1), state[2]]);
                S[j].add(new_rule);

                // TODO: Nullable case backpointers. So far works without it. Any counter example?
            }
        }
    }
    return S;
}


/**
 * Scans a terminal and adds new
 * rules after scanning. For example,
 * rules of the form φT are replaced
 * with Tφ, and the new state is added
 * to the next column.
 * @param {*} S The state array
 * @param {*} state Current state
 * @param {*} j Chart column
 * @param {*} character Next character in input string
 */
function scanner(S, state, j, character, k) {
    
    // Check if the current rule contains the same 
    // character as the next character in input string. 
    if (state[1][state[1].indexOf("φ") + 1] === character) {
        
        // Construct and add new rule in the next column.
        var split_rule = state[1].split("φ");
        var new_rule = JSON.stringify([state[0], split_rule[0] + split_rule[1][0] + "φ" + split_rule[1].substring(1), state[2]]);
        S[j + 1].add(new_rule);

        // Copy pointers of parent.
        copyPtr(new_rule, j + 1, k, JSON.stringify(state), j);
        
    }
    return S;
}

/**
 * When a given rule completes, add
 * the previously seen rules of which
 * the given rule was a sub-part while
 * updating the φ position. For Example,
 * rules of the form A -> Bφ 
 * originating from index x go from 
 * C -> DφB to C -> DBφ if such a rule
 * exists in column x.
 * @param {*} S The state array
 * @param {*} state Current state
 * @param {*} j Chart column
 * @param {*} k Chart row
 */
function completer(S, state, j, k) {

    // Iterate over the rules in the column 
    // where the current rule originated
    for (var rule = 0; rule < S[state[2]].size; rule++) {
        var temp_rule = JSON.parse(Array.from(S[state[2]])[rule]);

        // If a rule of the form C -> DφB exists, update and add.
        if (temp_rule[1][temp_rule[1].indexOf("φ") + 1] === state[0]) {

            // Construct and add new rule.
            var split_rule = temp_rule[1].split("φ");
            var new_rule = JSON.stringify([temp_rule[0], split_rule[0] + split_rule[1][0] + "φ" + split_rule[1].substring(1), temp_rule[2]]);
            S[j].add(new_rule);
            temp_rule = Array.from(S[state[2]])[rule];

            // Add back-pointers.
            addPtr(new_rule, j, k, temp_rule, state[2]); 
        }
    }
    return S;
}

/**
 * This function runs the parser
 * on the input strings and calls
 * the create table method to show
 * the matches.
 */
function testMembership() {

    // Get all the input strings.
    var input_strings = document.getElementById("input_strings").value;
    input_strings = input_strings.split("\n");

    // Run the parser for each input string.
    for (var i = 0; i < input_strings.length; i++) {

        // Initialize the state array, and the 
        // back-pointer map for each string.
        S = init(S, input_strings[i].length);
        ptr_map = new Map();

        // Add the gamma rule, base case.
        S[0].add(JSON.stringify(["γ", "φS", 0]));

        // Run for each character in input string.
        for (var j = 0; j <= input_strings[i].length; j++) {

            // Run for all the rules in the current column.
            // Note that this set size can increase on the fly.
            for (var k = 0; k < S[j].size; k++) {

                // Get the current rule.
                var current_rule = JSON.parse(Array.from(S[j])[k]);

                // If the current rule has completed, run completer.
                if (current_rule[1][current_rule[1].length - 1] === "φ") {
                    S = completer(S, current_rule, j, k);
                }

                // If the rule has not completed.
                else {

                    // If the next character is a Non-Terminal, run predictor.
                    if (symbol_map.get(current_rule[1][current_rule[1].indexOf("φ") + 1]) === 1) {
                        S = predictor(S, current_rule, j, k);
                    }

                    // If the next character is a Terminal, run scanner.
                    else {
                        S = scanner(S, current_rule, j, input_strings[i][j], k);
                    }
                }
            }
        }
        // Add to table here
        createTable(i, input_strings[i]);
    }
}

/**
 * This function adds a given input string
 * to the table and detects if it is a match
 * from the parse.
 * @param {*} i String number
 * @param {*} input_string Parsed string
 */ 
function createTable (i, input_string) {

    // Starting assumptions - it is not a match, and not ambiguous.
    var match = false;
    var ambiguous = false;

    var start_rule;
    var start_index;

    // Iterate over the last column in the chart, to find a completed gamma rule originating from 0.
    for(var final_chart_iterator = 0; final_chart_iterator < S[S.length - 1].size; final_chart_iterator++) {
        var curr_rule = JSON.parse(Array.from(S[S.length - 1])[final_chart_iterator]);

        // If completed gamma rule originating at index 0 is found, we have a match.
        if (curr_rule[2] === 0 && curr_rule[1][curr_rule[1].length - 1] === "φ" && curr_rule[0] === "γ") {
            
            // Set match.
            match = true;

            // Go one level down in parse tree.
            try {

                var back_ptrs = ptr_map.get(String(S.length - 1) + Array.from(S[S.length - 1])[final_chart_iterator]);
                var back_rule = Array.from(S[back_ptrs[0][0][0]])[back_ptrs[0][0][1]];
                
                start_rule = JSON.parse(Array.from(S[S.length - 1])[final_chart_iterator]);
                start_index = S.length - 1;
                
                // If the first rule has multiple possible parses, this is an ambiguous grammar.
                if(ptr_map.get(String(back_ptrs[0][0][0]) + String(back_rule)).length > 1) {
                    ambiguous = true;
                }
            }

            // Just some error handling, ambiguity detection is not complete right now.
            catch (err) {
                console.log("Ambiguity Corner Case: Scanned");
            }
        }
    }
    
    // Create entry on table.
    {

        // Remove table entry if already exists for given row.
        var current_row = document.getElementById("member" + i);
        if (current_row) {
            current_row.remove();
        }
        

        // Remove existing parse trees.
        {
            var current_der1 = document.getElementById("member" + i + "Der1");
            var current_der2 = document.getElementById("member" + i + "Der2");
            var current_tog1 = document.getElementById("member" + i + "Tog1");
            var current_tog2 = document.getElementById("member" + i + "Tog2");

            if (current_der1) {
                current_der1.remove();
            }
            
            if (current_der2) {
                current_der2.remove();
            }

            if (current_tog1) {
                current_tog1.remove();
            }

            if (current_tog2) {
                current_tog2.remove();
            }
        }

        // Populate the table.
        var my_table = document.getElementById("table-body");
        
        var row = document.createElement("tr");
        row.setAttribute("id", "member" + i);
        var col = document.createElement("td");
        var my_text = input_string;

        // Handling epsilon.
        if (input_string === "") {
            my_text = "Ɛ";
            if (i !== 0) {
                return;
            }
        }
        var node = document.createTextNode(my_text);
        col.classList.add("w-75");
        col.appendChild(node);
        row.appendChild(col);

        var anchor;
        var anchor2;
        var dec_node;

        col = document.createElement("td");
        if (match) {

            // Create the button to display derivations.
            anchor = document.createElement("a");
            anchor.setAttribute("id", "member" + i + "Tog1");
            anchor.setAttribute("data-toggle", "collapse");
            anchor.setAttribute("href", "#member" + i + "Der1");
            anchor.setAttribute("role", "button");
            anchor.setAttribute("aria-expanded", "false");
            anchor.setAttribute("aria-controls", "member" + i + "Der1");
            anchor.classList.add("collapsed");
            node = document.createTextNode("[1]");
            anchor.appendChild(node);

            dec_node = document.createTextNode("Yes ");
            if (ambiguous) {
                anchor2 = document.createElement("a");
                anchor2.setAttribute("id", "member" + i + "Tog2");
                anchor2.setAttribute("data-toggle", "collapse");
                anchor2.setAttribute("href", "#member" + i + "Der2");
                anchor2.setAttribute("role", "button");
                anchor2.setAttribute("aria-expanded", "false");
                anchor2.setAttribute("aria-controls", "member" + i + "Der2");
                anchor2.classList.add("collapsed");
                node = document.createTextNode(" [2]");
                anchor2.appendChild(node);

                row.classList.add("table-amb");
            }
            else {
                row.classList.add("table-s");
            }
        }
        else {
            dec_node = document.createTextNode("No");
            row.classList.add("table-d");
        }

        col.appendChild(dec_node);
        
        if (match) {
            col.appendChild(anchor);
            if (ambiguous) {
                col.appendChild(anchor2);
            }
        }

        row.appendChild(col);
        my_table.appendChild(row);    

        if (match) {
            // Create derivation box.
            var outer = document.createElement("div");
            outer.classList.add("collapse");
            outer.setAttribute("id", "member" + i + "Der1");
            
            var inner = document.createElement("div");
            inner.classList.add("card");
            inner.classList.add("card-body");

            
            // This is the code that generates the tree.
            var start = new Node("γ");
            var derivation = new Tree(start);
            derivation.buildTree(start, start_rule, start_index);
            console.log(derivation);


            var derivation_flag = 1;
            var curr_nodes = [derivation.root];

            var para = document.createElement("p");
            var data = document.createTextNode(curr_nodes[0].data);

            para.appendChild(data);
            inner.appendChild(para);

            // TODO: Display Tree on Frontend. 
            // Below is some broken code to do so.

            // while(derivation_flag) {
            //     derivation_flag = 0;
            //     para = document.createElement("p");
            //     data = ""
            //     var temp_nodes = [];
            //     for (var i = 0; i < curr_nodes.length; i++) {
            //         if (curr_nodes[i].children) {
            //             for (var j = 0; j < curr_nodes[i].children.length; j++) {
            //                 temp_nodes.push(curr_nodes[i].children);
            //                 derivation_flag = 1;
            //                 data = data + curr_nodes[i].children[j].data;
            //             }
            //         }
            //     }
            //     curr_nodes = temp_nodes;
            //     data = document.createTextNode(data);
            //     para.appendChild(data);
            //     inner.appendChild(para);
            // }

            if (ambiguous) {

                var outer2 = document.createElement("div");
                outer2.classList.add("collapse");
                outer2.setAttribute("id", "member" + i + "Der2");
                
                var inner2 = document.createElement("div");
                inner2.classList.add("card");
                inner2.classList.add("card-body"); 

                inner.classList.add("table-amb");
                inner2.classList.add("table-amb");

                row.classList.add("table-amb");

                outer.appendChild(inner);
                outer2.appendChild(inner2);

                my_table.append(outer);
                my_table.append(outer2);
            }
            else {
                inner.classList.add("table-s");

                outer.appendChild(inner);

                my_table.append(outer);     
                
                console.log("inner appended");
            }
        }
    }
}

/**
 * Tree type object.
 * @param {*} node Root node
 */
function Tree(node) {
    this.root = node;
}

/**
 * This function recursively creates
 * the parse tree using the ptr_map
 * data structure. It is essentially
 * a modified Depth first search.
 * @param {*} parent The parent node
 * @param {*} rule The current rule
 * @param {*} index The current index
 */
Tree.prototype.buildTree = function (parent, rule, index) {
    var tree = this;

    // Base case. If the rule is resolved, 
    // we can add it to parent and return.
    if (!isNotResolved(rule[1])) {
        for (var i = 0; i < rule[1].length; i++) {
            if (rule[1][i] === "φ") {
                continue;
            }
            var node = new Node(rule[1][i]);
            parent.addChild(node);
        }
    }
    else {
        var back_ptrs = ptr_map.get(String(index) + JSON.stringify(rule))[0];
        var ptr = back_ptrs.length - 1;

        // Add each child to current parent node.
        for (var i = 0; i < rule[1].length; i++) {
            if (rule[1][i] === "φ") {
                continue;
            }
            var child = new Node(rule[1][i]);
            parent.addChild(child);

            // For each non-terminal child, recursively add children.
            if (symbol_map.get(rule[1][i])) {
                tree.buildTree(child, JSON.parse(Array.from(S[back_ptrs[ptr][0]])[back_ptrs[ptr][1]]), back_ptrs[ptr][0]);
                ptr = ptr - 1; 
            }
        }
    }
}

/**
 * Node type object.
 * @param {*} data The data to store
 */
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

/**
 * This function adds a child
 * node to the given node.
 * @param {*} child The node to be added as a child
 */
Node.prototype.addChild = function (child) {
    var node = this;
    node.children.push(child);
    child.parent = node;
}