document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("searchbox");
    const priority = document.getElementById("priority");
    input.addEventListener("keydown", async function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            const value = input.value;
            const res = await fetch("/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: value })
                
            });
            const html = await res.text();
            document.getElementById("taskContainer").innerHTML = html;
        }
    });

    priority.addEventListener("change",async function(){
        const value = this.value;
        const res = await fetch("/option", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ query: value })
            });
            console.log(value);
            const html = await res.text();
            document.getElementById("taskContainer").innerHTML = html;


    })
});
