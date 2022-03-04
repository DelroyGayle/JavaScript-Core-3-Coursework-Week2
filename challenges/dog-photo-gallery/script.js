  const imageList = document.getElementById("imagelist");
  const dogCEOInfo = document.querySelector(".dogceo-info"); // Regards https://dog.ceo/ i.e. Dog CEO
  const errorMessagesElement = document.getElementsByClassName("error-messages");

  document.getElementById("nextdog").addEventListener("click", displayNextDog);

  let errorMessages;
  let errnum = 0;
  let firstFetch = true;

  setup();

  function setup() {
 // Info regarding Dog CEO Zine
 // EG <a href="https://dog.ceo/">Please note: The images displayed on this site have been sourced from Dog CEO</a>
   
    let dogInfoDiv = document.createElement('div');
    let paragraph = document.createElement('span');
    paragraph.innerText = "Please note: The images displayed on this site have been sourced from ";
    dogInfoDiv.appendChild(paragraph); 
    let theLink = document.createElement("a");
    theLink.href = "https://dog.ceo/";        
    theLink.textContent = "Dog CEO";
    theLink.setAttribute('target', '_blank'); // Open in another tab   
  // Recommended setting: https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
    theLink.setAttribute('rel', 'noreferrer noopener');
  
    dogInfoDiv.appendChild(theLink);
    dogCEOInfo.appendChild(dogInfoDiv);      
    
    errorMessages = "";
    errorMessagesElement[0].innerText = "Click the Next Dog Button to begin";
  }

  function displayNextDog() {
        if (firstFetch)
            errorMessagesElement[0].innerText = ""; // Clear 'Begin' Message

        fetch("https://dog.ceo/api/breeds/image/random")
        
            .then(response => {
                let status = response.status;

                if (status === 200) // successful FETCH
                {
                    firstFetch = false;
                    return response.json(); // CHAIN THE JSON DATA
                }

                else if (status === 500) {
                    alert("An Internal Server Error has occurred.\nPlease investigate your Server Application.");
                    throw new Error(`An Error Has Occurred. Error Code = ${status}`); // Terminate the program
                }

                else if (status === 404) {
                    let message = `It appears that An Incorrect Link Has Been Used.\nPlease Check This Link: "https://dog.ceo/api/breeds/image/random"` 
                    handleFetchError(message);
                }

                else {
                    let message = `An Error Has Occurred whilst fetching from "https://dog.ceo/api/breeds/image/random". Error Code = ${status}`; 
                    handleFetchError(message);
                }; 
             })

            // show the image 
            .then(body => {
                    addImage(body);
                    firstFetch = false;
             })

            .catch(error => {
                           let message = `An error occurred whilst fetching from "https://dog.ceo/api/breeds/image/random"`;
                           handleFetchError(message);
                        });
}

function handleFetchError(message) {

         if (firstFetch) { // This happened at the very beginning of the program
                           // i.e. the first ever Fetch, so abort
                           alert('Catastrophic error has occurred - investigate the link "https://dog.ceo/api/breeds/image/random"');
                           throw new Error(`Could not load dog pictures`); // Terminate the program
                         };    

         firstFetch = false;                  
         ++errnum;
         message += ` - ${errnum} error` + (errnum > 1 ? "s!" : "!");
         alert(message);
         errorMessages = `<p>${message}</p>`;
         errorMessagesElement[0].innerHTML = errorMessages;

}
function addImage(body) {
    const imageElem = document.createElement('img'); // an image
    imageElem.classList.add('image'); // apply class for padding etc
    imageElem.src = body.message;
    const theLI = document.createElement('li');
    theLI.appendChild(imageElem) // add the image
    imageList.appendChild(theLI); // add to the list

    // Scroll down a bit to show the newly added image
    dogCEOInfo.scrollIntoView();
    setTimeout(() => {
                        window.scrollBy(0,100)
                    }, 300);
}