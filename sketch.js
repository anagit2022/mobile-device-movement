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

  background(0, 64);

  let x = map(accelerationX, -10, 10, 0, width);
  let y = map(accelerationY, -10, 10, 0, height);
  let diameter = map(accelerationZ, -10, 10, 10, 100);

  circle(x, y, diameter);
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
