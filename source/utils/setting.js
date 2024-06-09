import playBgMusic from "/utils/playmusic/script";

class SettingPanel extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    shadow.innerHTML = `
            <button id="setting"><img src="/assets/icons/setting/img" width="50"/></button>
            <div id="setting-panel">
                <button id="close">&#10006;</button>
                <h2>Settings</h2>
                <label for="volume-slider">Background Music Volume</label>
                <input type="range" name="volume-slider" min="0" max="1" step="0.01" value="0">
                <a href="/login/page" id="login">Log In to Save your Fortune &rarr;</a>
                <a href="/history/page" id="history">Your History &rarr;</a>
                <button id="logout">Logout</button>
            </div>
        `;
    const sheet = new CSSStyleSheet();
    sheet.replaceSync(`
            #setting {
                position: absolute;
                top: 0;
                right: 0;
                background-color: transparent;
                border: none;
                height: 52px;
                padding: 1px 8px;
                margin-top: 10px;
                margin-right: 15px;
            }
            
            #setting-panel {
                position: absolute;
                top: 0;
                right: 0;
                width: 320px;
                height: 100vh;
                background-color: #013348;
                flex-direction: column;
                box-sizing: border-box;
                padding-left: 30px;
                display: none;
                z-index: 2;
            }
            
            #close {
                background-color: transparent;
                color: var(--general-border);
                border: none;
                height: auto;
                padding: 1px 8px;
                align-self: flex-end;
                margin-top: 18px;
                margin-right: 28px;
                font-size: 2rem;
            }
            
            h2 {
                color: var(--general-border);
                text-align: left;
                font-size: 2.5rem;
                margin-top: 25px;
                margin-bottom: 30px;
            }
            
            label {
                color: var(--general-border);
                text-align: left;
                font-size: 1.2rem;
            }
            
            input {
                -webkit-appearance: none;
                width: 60%;
                margin-top: 20px;
                background: transparent;
                position: relative;
            }
            
            input::-webkit-slider-runnable-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                background: #b8916e;
                border-radius: 10px;
                border: 0.2px solid #010101;
                position: relative;
            }
            
            input::-webkit-slider-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px;
                background: var(--general-border);
                cursor: pointer;
                -webkit-appearance: none;
                margin-top: -14px;
                position: relative;
                z-index: 1;
            }
            
            input::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 8.4px;
                background: var(--general-border);
                border-radius: 10px;
                z-index: 0;
                width: var(--active-width, 0);
            }
            
            input::-moz-range-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                background: #b8916e;
                border-radius: 10px;
                border: 0.2px solid #010101;
            }
            
            input::-moz-range-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px;
                background: var(--general-border);
                cursor: pointer;
            }
            
            input::-ms-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }
            
            input::-ms-fill-lower {
                background: var(--general-border);
                border: 0.2px solid #010101;
                border-radius: 10px;
            }
            
            input::-ms-fill-upper {
                background: #b8916e;
                border: 0.2px solid #010101;
                border-radius: 10px;
            }
            
            input::-ms-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px;
                background: var(--general-border);
                cursor: pointer;
            }
            
            #setting-panel > a {
                text-align: left;
                color: var(--general-border);
                margin-top: 40px;
                font-size: 1.2rem;
            }
            
            #history {
                display: none;
            }
            
            #logout {
                align-self: flex-start;
                background-color: var(--button-background);
                color: var(--general-border);
                border-color: var(--general-border);
                border-radius: 12px;
                font-size: 1.2rem;
                margin-top: 40px;
                height: auto;
                padding: 3%;
                display: none;
            }
        `);
    shadow.adoptedStyleSheets = [sheet];

    const volumeSlider = this.shadowRoot.querySelector("input");
    const closeButton = this.shadowRoot.querySelector("#close");
    const settingButton = this.shadowRoot.querySelector("#setting");
    const loginLink = this.shadowRoot.querySelector("#login");
    const logoutButton = this.shadowRoot.querySelector("#logout");
    const historyLink = this.shadowRoot.querySelector("#history");

    let volume = localStorage.getItem("volume");
    if (volume != null) {
      volumeSlider.value = volume;
    }

    if (document.cookie.includes("loggedin=true")) {
      loginLink.style.display = "none";
      logoutButton.style.display = "block";
      historyLink.style.display = "block";
    } else {
      logoutButton.style.display = "none";
      historyLink.style.display = "none";
      loginLink.style.display = "block";
    }

    logoutButton.addEventListener("click", this.logoutFunction);
    volumeSlider.addEventListener("change", this.changeVolume);
    closeButton.addEventListener("click", this.closeSetting.bind(this));
    settingButton.addEventListener("click", this.openSetting.bind(this));
  }

  logoutFunction() {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "/logout/attempt");
    xhr.onload = function () {
      if (xhr.status === 200) {
        window.location.href = "/";
      } else {
        console.error("Error:", xhr.statusText);
      }
    };
    xhr.send();
  }

  changeVolume(element) {
    const backgroundMusic = document.getElementById("background-music");
    let currentVolume = localStorage.getItem("volume");
    if (currentVolume == null || currentVolume == "0") {
      backgroundMusic.currentTime = 0;
    }
    let setVolume = element.currentTarget.value;
    localStorage.setItem("volume", setVolume);
    playBgMusic(backgroundMusic, false);
  }

  closeSetting() {
    const settingPanel = this.shadowRoot.querySelector("#setting-panel");
    settingPanel.style.display = "none";
  }

  openSetting() {
    const settingPanel = this.shadowRoot.querySelector("#setting-panel");
    settingPanel.style.display = "flex";
  }
}

customElements.define("setting-panel", SettingPanel);
