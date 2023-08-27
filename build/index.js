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
    let element = document.getElementById("v_count");
    if(new_value == null){
        element.style.setProperty("display","none")
    }
    else{
        element.style.setProperty("--num",parseInt(new_value))
    }
}

async function check_visit_and_increment(){
    let v_count_local = sessionStorage.getItem("v_count_local");

    if(v_count_local === null){
        const url = "https://kdy0eottji.execute-api.us-east-1.amazonaws.com/serverless_lambda_stage/visitor_count";

        const response = await fetch(url, {
            method: "PATCH",
            mode: "cors"
        });

        let res = await response.json();
        v_count_local = res.v_count;
        if(v_count_local){
            sessionStorage.setItem("v_count_local", v_count_local);
        }
    }

    setCounter(v_count_local);
    
}



check_visit_and_increment();
