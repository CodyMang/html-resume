window.addEventListener('keydown', function(event) {
    if (event.ctrlKey && event.key === 'p') {
        event.preventDefault();
        printMainContent();
    }
});

function printMainContent() {
    var printContents = document.querySelector('main').innerHTML;
    var originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
}

function setCounter(new_value){
    document.getElementById("v_count").innerHTML = new_value;
}

async function check_visit_and_increment(){
    let v_count_local = localStorage.getItem("v_count_local");

    if(v_count_local === null){
        const url = "https://kdy0eottji.execute-api.us-east-1.amazonaws.com/serverless_lambda_stage/visitor_count";

        const response = await fetch(url, {
            method: "PATCH",
            mode: "cors"
        });

        let res = await response.json();
        v_count_local = res.v_count;
        if(v_count_local){
            localStorage.setItem("v_count_local", v_count_local);
        }
    }
    
    setCounter(v_count_local);
}

document.getElementById("close_button")
.addEventListener("click", (event) => {
    const elem = document.getElementsByClassName("visit_counter")[0];
    elem.style.display = "none";
});


check_visit_and_increment();
