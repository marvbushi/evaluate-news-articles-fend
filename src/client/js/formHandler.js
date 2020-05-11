const userUrl = require('valid-url');

const handleSubmit = function (event) {
    event.preventDefault();

let formText = document.getElementById('name').value;
    // check for valid url
    if (userUrl.isWebUri(formText)) {
        console.log("::: Form Submitted :::");
        fetchData('http://localhost:8080/article', formText);
    } else {
        document.getElementById('error').innerHTML = 'Please Enter a Valid URL.';
        }
};

    const fetchData = async (url, input) => {
        const res = await fetch(url, {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input })
        });
        try {
            const data = await res.json();
            if(res.status >= 200 && res.status < 400) {
                //const list = document.createElement('li');
                document.getElementById('polarity').innerHTML = data.polarity;
                document.getElementById('polarity_conf').innerHTML = data.polarity_confidence;
                document.getElementById('subjectivity').innerHTML = data.subjectivity;
            }
            } catch(error) {
                console.log("error", error)
            }
        }

export { handleSubmit, fetchData }