let motionEnabled = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(0);

  let enableBtn = createButton("Enable Motion");
  enableBtn.mousePressed(async () => {
    if (typeof DeviceMotionEvent !== "undefined" &&
        typeof DeviceMotionEvent.requestPermission === "function") {
      let response = await DeviceMotionEvent.requestPermission();
      if (response === "granted") {
        motionEnabled = true;
      }
    } else {
      motionEnabled = true; // Android or already granted
    }
  });

  let disableBtn = createButton("Disable Motion");
  disableBtn.mousePressed(() => {
    motionEnabled = false; // stops reacting, but doesn’t revoke system permission
  });
}

function deviceMoved() {
  if (!motionEnabled) return; // ignore motion when disabled

  let x = map(accelerationX, -10, 10, 0, width);
  let y = map(accelerationY, -10, 10, 0, height);
  let d = map(accelerationZ, -10, 10, 10, 100);

  background(0, 64);
  circle(x, y, d);
}
