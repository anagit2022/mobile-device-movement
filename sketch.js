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
  if (frameCount % 30 === 0) {  // update once every 30 frames (~0.5 sec at 60fps)
    ax = accelerationX;
    ay = accelerationY;
    az = accelerationZ;
  }

  text("X: " + nf(ax, 1, 2), 20, 40);
  text("Y: " + nf(ay, 1, 2), 20, 80);
  text("Z: " + nf(az, 1, 2), 20, 120);
}
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
