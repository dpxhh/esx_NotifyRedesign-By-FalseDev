const types = {
  success: { icon: "check_circle" },
  error: { icon: "error" },
  info: { icon: "info" },
};

const codes = {
  "~r~": "red",
  "~b~": "#378cbf",
  "~g~": "green",
  "~y~": "yellow",
  "~p~": "purple",
  "~c~": "grey",
  "~m~": "#212121",
  "~u~": "black",
  "~o~": "orange",
};

const replaceColors = (str, obj) => {
  let strToReplace = str;
  for (const id in obj) {
    strToReplace = strToReplace.replace(new RegExp(id, "g"), obj[id]);
  }
  return strToReplace;
};

const notification = (data) => {
  // Ensure message is a string and handle undefined/null
  const message = typeof data.message === "string" ? data.message : String(data.message || "No message provided");
  const type = data.type in types ? data.type : "info"; // Default to info if type is invalid
  const duration = Number(data.length) || 5000; // Default to 5s if duration is invalid

  // Replace color codes
  let formattedMessage = message;
  for (const color in codes) {
    if (message.includes(color)) {
      const objArr = {
        [color]: `<span style="color: ${codes[color]}">`,
        "~s~": "</span>",
      };
      formattedMessage = replaceColors(message, objArr);
    }
  }

  // Create notification element
  const $notification = $(`
    <div class="notify ${type}">
      <div class="innerText">
        <span class="material-symbols-outlined icon">${types[type].icon}</span>
        <p class="text">${formattedMessage}</p>
      </div>
      <div class="progress"></div>
    </div>
  `).appendTo(".notify-container");

  // Set progress bar animation duration
  $notification.find(".progress").css("animation-duration", `${duration}ms`);

  // Remove notification after duration
  setTimeout(() => {
    $notification.css("animation", "slideOut 0.3s ease-in forwards");
    setTimeout(() => $notification.remove(), 300); // Remove after animation
  }, duration);

  return $notification;
};

$(document).ready(() => {
  // Ensure container exists
  if (!$(".notify-container").length) {
    $("body").append('<div class="notify-container"></div>');
  }

  // Listen for NUI messages
  window.addEventListener("message", (event) => {
    if (event.data && event.data.type && event.data.message) {
      notification({
        type: event.data.type,
        message: event.data.message,
        length: event.data.length,
      });
    }
  });
});