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
                <form method="post" action="/logout/attempt/">
                    <button type="submit" >Logout</button>
                </form>
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
                margin-top: 20px;
                background: transparent;
                position: relative;
            }

            input[type="range"]::-webkit-slider-runnable-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                background: #b8916e;
                border-radius: 10px;
                border: 0.2px solid #010101;
                position: relative;
            }

            input[type="range"]::-webkit-slider-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px;
                background: #d2b78e;
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
                background: #d2b78e;
                border-radius: 10px;
                z-index: 0;
                width: var(--active-width, 0);
            }

            input[type="range"]::-moz-range-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                background: #b8916e;
                border-radius: 10px;
                border: 0.2px solid #010101;
            }

            input[type="range"]::-moz-range-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px;
                background: #d2b78e;
                cursor: pointer;
            }

            input[type="range"]::-ms-track {
                width: 100%;
                height: 8.4px;
                cursor: pointer;
                background: transparent;
                border-color: transparent;
                color: transparent;
            }

            input[type="range"]::-ms-fill-lower {
                background: #d2b78e;
                border: 0.2px solid #010101;
                border-radius: 10px;
            }

            input[type="range"]::-ms-fill-upper {
                background: #b8916e;
                border: 0.2px solid #010101;
                border-radius: 10px;
            }

            input[type="range"]::-ms-thumb {
                border: 1px solid #000000;
                height: 36px;
                width: 16px;
                border-radius: 10px;
                background: #d2b78e;
                cursor: pointer;
            }

            #setting-panel > a {
                text-align: left;
                color: #d2b78e;
                text-decoration: none;
                margin-top: 40px;
                font-size: 1.2rem;
              }
            
            
            form{
                text-align: left;
                padding-top: 10%;
            }

            form button {
                background-color: var(--button-background);
                color: var(--general-border);
                border-color: var(--general-border);
                border-radius: 12px;
                font-size: 1rem;
            }

            form button {
                border-style: outset;
                border-width: 2px;
                height: auto;
                padding: 3%;
                text-decoration: none;
            }

            form button button:hover{
                background-color: var(--button-hover-background) !important;
                box-shadow: 0rem 0rem 0.5rem beige;
                color: beige;
                transition: 0.3s;
                cursor: pointer;
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
