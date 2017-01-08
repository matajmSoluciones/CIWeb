var cv = require('opencv');
var getPixels = require("get-pixels");

var COLOR = [0, 255, 0]; // default red
var thickness = 2; // default 1
 
/*getPixels('./test/JVision/img.png', function(err, pixels) {
  if (err) throw err;
  var img=pixels.data;
  console.log(img);
});*/
cv.readImage('./test/JVision/img.png', function(err, im) {
  if (err) throw err;
  if (im.width() < 1 || im.height() < 1) throw new Error('Image has no size');

  im.detectObject('haarcascade_frontalface_alt2.xml', {}, function(err, faces) {
    if (err) throw err;
    console.log(faces);
    for (var i = 0; i < faces.length; i++) {
      face = faces[i];
      im.rectangle([face.x, face.y], [face.width, face.height], COLOR, 2);
    }
    im.save('./test/examples/face-detection-rectangle.png');
    //console.log('Image saved to ./tmp/face-detection-rectangle.png');
  });
});