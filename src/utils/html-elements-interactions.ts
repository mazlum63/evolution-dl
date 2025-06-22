var sensorStatusSelector = document.getElementById(
  "sensorStatus"
) as HTMLSelectElement;

sensorStatusSelector.addEventListener("change", () => {
  if (
    sensorStatusSelector.value == "show" ||
    sensorStatusSelector.value == "hide" ||
    sensorStatusSelector.value == "half"
  ) {
    showSensor = sensorStatusSelector.value;
  } else {
    showSensor = "show";
  }
});

export let showSensor: "show" | "half" | "hide" = "show";
