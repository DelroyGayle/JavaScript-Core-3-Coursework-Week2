  const xkcdImage = document.getElementById("xkcd-image");
  const xkcdInfo = document.querySelector(".xkcd-info"); // Regards XKCD API Proxy - https://xkcd.vercel.app/
 
  const errorMessagesElement = document.getElementsByClassName("error-messages");

  let errorMessages;
  let firstFetch = true;

  setup();
  displayXKCDImage();

  function setup() {
 // Info regarding XKCD API Proxy
 // EG <a href="https://xkcd.vercel.app/">Please note: The above image was sourced from XKCD API Proxy</a>
   
    let xkcdInfoDiv = document.createElement('div');
    let paragraph = document.createElement('span');
    paragraph.innerText = "Please note: The above image was sourced from ";
    xkcdInfoDiv.appendChild(paragraph); 
    let theLink = document.createElement("a");
    theLink.href = "https://xkcd.vercel.app/";        
    theLink.textContent = "XKCD API Proxy";
    theLink.setAttribute('target', '_blank'); // Open in another tab   
  // Recommended setting: https://www.freecodecamp.org/news/how-to-use-html-to-open-link-in-new-tab/
    theLink.setAttribute('rel', 'noreferrer noopener');
  
    xkcdInfoDiv.appendChild(theLink);
    xkcdInfo.appendChild(xkcdInfoDiv);      
    
    errorMessages = "";
  }

  function displayXKCDImage() {
        fetch("https://xkcd.now.sh/?comic=latest")
        
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
                    let message = `It appears that An Incorrect Link Has Been Used.\nPlease Check This Link: "https://xkcd.now.sh/?comic=latest"` 
                    handleFetchError(message);
                }

                else {
                    let message = `An Error Has Occurred whilst fetching from "https://xkcd.now.sh/?comic=latest". Error Code = ${status}`; 
                    handleFetchError(message);
                }; 
             })

            // show the image 
            .then(body => {
                    addImage(body);
                    firstFetch = false;
             })

            .catch(error => {
                           let message = `An error occurred whilst fetching from "https://xkcd.now.sh/?comic=latest"`;
                           handleFetchError(message);
                        });
}

function handleFetchError(message) {
         firstFetch = false;                  
         alert(message);
         errorMessages = `<p>${message}</p>`;
         errorMessagesElement[0].innerHTML = errorMessages;
         throw new Error(`Could not load XKCD image`); // Terminate the program

}
function addImage(body) {
    const imageElem = document.createElement('img'); // an image
    imageElem.classList.add('image'); // apply class for padding etc
    imageElem.src = body.img;
    imageElem.alt = body.alt;
    console.log(body)
    xkcdImage.appendChild(imageElem) // add the image
}