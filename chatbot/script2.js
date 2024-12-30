//send the user message and get a response from Django API
function sendMessage() {
    let input=document.getElementById("input").value;
    if (input) {
        displayUserMessage(input);
        // Send the message to the Django API
        fetch("/chatbot/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // Django expects form data
            },
            body: `message=${encodeURIComponent(input)}`,
        })
        .then(response => response.json())
        .then(data => {
            // Display the bot's response
            displayBotMessage(data.response);
        })
        .catch(error => {
            console.error("Error:", error);
            displayBotMessage("Error communicating with chatbot.");
        });

        // Clear the input field
        document.getElementById("input").value = "";
    } 
    }

// Display user message on the chat
function displayUserMessage(message){ 
    let chat=document.getElementById("chat");
    let userMessage=document.createElement("div");
    userMessage.classList.add("message");
    userMessage.classList.add("user");
    let userAvatar=document.createElement("div");
    userAvatar.classList.add("avatar");
    let userText=document.createElement("div");
    userText.classList.add("text");
    userText.innerHTML = message;
    userMessage.appendChild(userAvatar);
    userMessage.appendChild(userText);
    chat.appendChild(userMessage);
    chat.scrollTop = chat.scrollHeight;
}

// Display bot message on the chat
function displayBotMessage(message){
    let chat=document.getElementById("chat");
    let botMessage=document.createElement("div");
    botMessage.classList.add("message");
    botMessage.classList.add("bot");
    let botText=document.createElement("div");
    botText.classList.add("text");
    botText.innerHTML = message;
    let botAvatar=document.createElement("div");
    botAvatar.classList.add("avatar");
    botMessage.appendChild(botAvatar);
    botMessage.appendChild(botText);
    chat.appendChild(botMessage);
    chat.scrollTop = chat.scrollHeight;
}

//send the user message and get a response
function sendMessage() {
    let input=document.getElementById("input").value;
    if (input) {
        displayUserMessage(input);
        // Send the message to the Django API
        fetch("/chatbot/", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded", // Django expects form data
            },
            body: `message=${encodeURIComponent(input)}`,
        })
        .then(response => response.json())
        .then(data => {
            // Display the bot's response
            displayBotMessage(data.response);
        })
        .catch(error => {
            console.error("Error:", error);
            displayBotMessage("Error communicating with chatbot.");
        });

        // Clear the input field
        document.getElementById("input").value = "";
    } 
    }

//scroll the chat
document.addEventListener("keydown", function (event) {
    const chat = document.getElementById("chat");
    if (event.key === "ArrowUp") {
        chat.scrollTop -= 30; // Scroll up by 30px
        event.preventDefault(); // Prevent any default action of the arrow key
    } else if (event.key === "ArrowDown") {
        chat.scrollTop += 30; // Scroll down by 30px
        event.preventDefault();
    }
});

//add a click event listener to the button
document.getElementById("button").addEventListener("click", sendMessage);

//add a keypress event listener to the input
document.getElementById("input").addEventListener("keydown", function(event) {
    if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault(); // Prevent adding a new line
        sendMessage();
    }
})
//define infputField
const inputField = document.getElementById("input");
//new line in input
inputField.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.shiftKey) {
        let cursorPos = inputField.selectionStart;
        inputField.value = inputField.value.substring(0, cursorPos) + "\n" + inputField.value.substring(cursorPos);
        event.preventDefault();
    }
});