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
                <button>&#10006;</button>
                <h2>Settings</h2>
                <label for="volume-slider">- Background Music Volume</label>
                <input type="range" name="volume-slider" min="0" max="1" step="0.01" value="0">
                <a href="">- Your History 🔗</a>
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
                width: 400px;
                height: 100vh;
                background-color: #013348;
                flex-direction: column;
                box-sizing: border-box;
                padding-left: 30px;
                display: none;
                z-index: 2;
            }
            
            #setting-panel > button {
                background-color: transparent;
                color: #d2b78e;
                border: none;
                height: auto;
                padding: 1px 8px;
                align-self: flex-end;
                margin-top: 18px;
                margin-right: 28px;
                font-size: 2rem;
            }
            
            h2 {
                color: #d2b78e;
                text-align: left;
                font-size: 3rem;
                margin-top: 25px;
                margin-bottom: 30px;
            }
            
            label {
                color: #d2b78e;
                text-align: left;
                font-size: 1.2rem;
            }
            
            input[type="range"] {
                -webkit-appearance: none;
                width: 60%;
                margin-top: 30px;
                background: transparent;
                position: relative;
            }

            input[type="range"]::-webkit-slider-runnable-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                animate: 0.2s;
                background: #b8916e; /* Inactive track color */
                border-radius: 10px; /* Increased border radius */
                border: 0.2px solid #010101;
                position: relative;
            }

            input[type="range"]::-webkit-slider-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px; /* Increased border radius */
                background: #d2b78e; /* Thumb color */
                cursor: pointer;
                -webkit-appearance: none;
                margin-top: -14px;
                position: relative;
                z-index: 1;
            }

            input[type="range"]::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 8.4px;
                background: #d2b78e; /* Active track color */
                border-radius: 10px; /* Increased border radius */
                z-index: 0;
                width: var(--active-width, 0);
            }

            input[type="range"]::-moz-range-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                animate: 0.2s;
                background: #b8916e; /* Inactive track color */
                border-radius: 10px; /* Increased border radius */
                border: 0.2px solid #010101;
            }

            input[type="range"]::-moz-range-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px; /* Increased border radius */
                background: #d2b78e; /* Thumb color */
                cursor: pointer;
            }

            input[type="range"]::-ms-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                animate: 0.2s;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }

            input[type="range"]::-ms-fill-lower {
                background: #d2b78e; /* Active track color */
                border: 0.2px solid #010101;
                border-radius: 10px; /* Increased border radius */
            }

            input[type="range"]::-ms-fill-upper {
                background: #b8916e; /* Inactive track color */
                border: 0.2px solid #010101;
                border-radius: 10px; /* Increased border radius */
            }

            input[type="range"]::-ms-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px; /* Increased border radius */
                background: #d2b78e; /* Thumb color */
                cursor: pointer;
            }

            #setting-panel > a {
                text-align: left;
                color: #d2b78e;
                text-decoration: none;
                margin-top: 30px;
                font-size: 1.2rem;
              }
        `);
    shadow.adoptedStyleSheets = [sheet];

    const volumeSlider = this.shadowRoot.querySelector("input");
    const closeButton = this.shadowRoot.querySelector(
      "#setting-panel > button"
    );
    const settingButton = this.shadowRoot.querySelector("#setting");

    let volume = localStorage.getItem("volume");
    if (volume != null) {
      volumeSlider.value = volume;
    }

    volumeSlider.addEventListener("change", this.changeVolume);
    closeButton.addEventListener("click", this.closeSetting.bind(this));
    settingButton.addEventListener("click", this.openSetting.bind(this));
  }

  changeVolume(element) {
    const backgroundMusic = document.getElementById("background-music");
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
