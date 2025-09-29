let permissionGranted = false;
let button;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  fill(255);

  // Add a button for iOS
  button = createButton("Enable Motion");
  button.position(width / 2 - 60, height / 2);
  button.mousePressed(requestAccess);

  noLoop(); // wait until permission is granted
}

function draw() {
  if (!permissionGranted) return;

  background(220, 50);
  fill('magenta');
  ellipse(accelerationX, height / 2, 20);
  describe('Magnitude of device acceleration is displayed as ellipse size.');
}

function requestAccess() {
  if (typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function") {
    // iOS
    DeviceMotionEvent.requestPermission()
      .then(response => {
        if (response === "granted") {
          permissionGranted = true;
          button.remove(); // hide button
          loop();
        }
      })
      .catch(console.error);
  } else {
    // Android / Desktop
    permissionGranted = true;
    button.remove();
    loop();
  }
}
