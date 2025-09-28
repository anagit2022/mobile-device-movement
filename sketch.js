let permissionGranted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);
  noStroke();
  fill(255);

  // Stop draw loop until permission is given
  noLoop();
}

function draw() {
  if (!permissionGranted) return; // wait for user

  background(0, 64);

  let x = map(accelerationX, -10, 10, 0, width);
  let y = map(accelerationY, -10, 10, 0, height);
  let diameter = map(accelerationZ, -10, 10, 10, 100);

  circle(x, y, diameter);
}

function touchStarted() {
  // For iOS: request permission
  if (typeof DeviceMotionEvent !== "undefined" &&
      typeof DeviceMotionEvent.requestPermission === "function") {
    DeviceMotionEvent.requestPermission()
      .then(response => {
        if (response === "granted") {
          permissionGranted = true;
          loop(); // start drawing
        }
      })
      .catch(console.error);
  } else {
    // Android usually works without asking
    permissionGranted = true;
    loop();
  }

  return false; // prevent default touch behavior
}
