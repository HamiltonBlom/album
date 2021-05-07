document.addEventListener("DOMContentLoaded", async e => {
    const data = await (await fetch("http://localhost:4000/uploads")).json();
    console.log(data);
    for (const item of data) {
        document.querySelector(".items").insertAdjacentHTML("afterbegin", `
        <a href="" class="box1">
            <div style="background-image: url('http://localhost:4000/uploads/${item.filepath}')" class="box2 box3">
                
            </div>
            <p>${item.name}</p>
        </a>

        `)
    }
});