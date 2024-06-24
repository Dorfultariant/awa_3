
document.addEventListener("DOMContentLoaded", () => {
    const inputName = document.getElementById('input-name');
    const inputTask = document.getElementById('input-task');
    const submitBtn = document.getElementById('submit-data');

    const searchName = document.getElementById("search-name");
    const searchBtn = document.getElementById("search");
    const itemList = document.getElementById("itemlist");

    submitBtn.addEventListener('click', async () => {
        const name = inputName.value;
        const task = inputTask.value;

        try {
            const res = await fetch('/todo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, task }),
            });

            if (res.ok) {
                const data = await res.json();
                const stats = document.getElementById("status");

                const statusMsg = document.createElement("p");
                statusMsg.textContent = data.msg;

                stats.appendChild(statusMsg);
                console.log(data.msg);

            } else {
                const statusMsg = document.createElement("p");
                statusMsg.textContent = "Something went sideways";
            }

        } catch (error) {
            console.error('An error occurred:', error);

            const statusMsg = document.createElement("p");
            statusMsg.textContent = error;
        }
    });

    searchBtn.addEventListener("click", async () => {
        const name = searchName.value;
        console.log("NAME TO SEARCH FOR: ", name);
        try {
            const res = await fetch(`/user/${name}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            console.log(res);

            if (res.ok) {
                const data = await res.json();
                console.log(data);

                const nameHead = document.createElement("h3");
                if (data.msg) {
                    // Username header
                    nameHead.textContent = "User not found";
                    const parag = document.createElement("p");
                    parag.textContent = data.msg;

                } else {

                    nameHead.textContent = data.user;

                    if (data.tasks) {
                        // Show all the tasks
                        for (const task of data.tasks) {
                            const todo = document.createElement("p");
                            todo.textContent = task;
                            nameHead.appendChild(todo);
                        }
                    }


                    // Show button to delete corresponding user
                }
                itemList.appendChild(nameHead);

            } else {
                console.log("Nope");
            }
        }
        catch (error) {
            console.log(error);
        }
    });

});
