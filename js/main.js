


var constraints = {
    video: true
  };
  
  var video = document.querySelector('video');

  Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
    faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
  faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
  faceapi.nets.faceExpressionNet.loadFromUri("/models"),
 
  ]).then(startVideo)

  function startVideo(){
  function handleSuccess(stream) {
    window.stream = stream; // only to make stream available to console
    video.srcObject = stream;
  }
  
  function handleError(error) {
    console.log('getUserMedia error: ', error);
  }
  
  navigator.mediaDevices.getUserMedia(constraints).
    then(handleSuccess).catch(handleError);
}
video.addEventListener('play',()=>{
    console.log('hello')
    setInterval(async () => {
        const displaySize = { width: video.width, height: video.height };
        const detections = await faceapi
      .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
      console.log(detections)
      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      if (resizedDetections && Object.keys(resizedDetections).length > 0) {
          const expressions = resizedDetections.expressions;
          const maxValue = Math.max(...Object.values(expressions));
          const emotion = Object.keys(expressions).filter(
            item => expressions[item] === maxValue
          );
          //document.getElementById("emotion").innerText = `Emotion - ${emotion[0]}`;
          //here goes the GIFs
          let giphyURL= "https://api.giphy.com/v1/gifs/search?q="+emotion[0]+"+face&api_key=p9274pzliNt4B4dfBY19BrUyZerDtC82&rating=pg"
          fetch(giphyURL)
                .then(response => {
                    return response.json();
                })
                .then(json => {
                  console.log(json)
                    console.log(json.data[0].images.original.url);

                    var data = result.data;
                    var output = "";
                  //   for (var index in data){
                      for (var index = 0; index < 8; index++){
                        var gifObject = data[index];
                      var gifURL = gifObject.images.original.url;
                      console.log(gifURL);
                      output += "<img id='loadedImg' width='200px' src='"+gifURL+"'/>";
                    }
                    var x = document.getElementById("loading");
                    if(x){
                   
              x.style.display = "none";
            }
            else{
              x.style.display = "block";
            }
                    $("#gif").html(output);
                })

                .catch(err => console.log(err));
        //   //older_way
        //   $.ajax({
        //     url: "https://api.giphy.com/v1/gifs/search?q="+emotion[0]+"+face&api_key=p9274pzliNt4B4dfBY19BrUyZerDtC82&rating=pg",
        //     success: function(result) {
             
        //     },
        //     error: function(error) {
        //       var x = document.getElementById("loading");
        // x.style.display = "block";
        //       console.log(error);
        //     }
        //   });
          
      }
      // else{
      //   var x = document.getElementById("loading");
      //   x.style.display = "block";
      // }
    },100)

   
})