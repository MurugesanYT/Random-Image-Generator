function fetchRandomImage() {
  var category = document.getElementById('categoryInput').value;
  var apiKey = 'gej/LZaIpdCdX1iDG4QG+w==5Ndlcn9fAJpKOTmN'; // Replace with your API key
  var apiUrl = 'https://api.api-ninjas.com/v1/randomimage?category=' + category;

  fetch(apiUrl, {
    headers: {
      'X-Api-Key': apiKey,
      'Accept': 'image/jpg'
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.blob();
  })
  .then(imageBlob => {
    var imageURL = URL.createObjectURL(imageBlob);
    var imageElement = document.createElement('img');
    imageElement.src = imageURL;
    imageElement.onload = function() {
      imageElement.classList.add('loaded');
    };

    var downloadBtn = document.createElement('button');
    downloadBtn.textContent = 'Download Image';
    downloadBtn.className = 'download-btn';
    downloadBtn.onclick = function() {
      var a = document.createElement('a');
      a.href = imageURL;
      a.download = 'random_image.jpg';
      a.click();
    };

    var imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '';
    imageContainer.appendChild(imageElement);
    imageContainer.appendChild(downloadBtn);
  })
  .catch(error => {
    console.error('Error fetching image:', error);
    var imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '<p>Error fetching image. Please try again later.</p>';
  });
}
