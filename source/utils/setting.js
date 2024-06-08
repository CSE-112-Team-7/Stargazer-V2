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
                <h2>Setting</h2>
                <label for="volume-slider">Background Music Volume</label>
                <input type="range" name="volume-slider" min="0" max="1" step="0.01" value="0">
                <a href="">Your History</a>
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
                background-color: #c9c9c9;
                flex-direction: column;
                box-sizing: border-box;
                padding-left: 15px;
                display: none;
                z-index: 2;
            }
            
            #setting-panel > button {
                background-color: transparent;
                color: black;
                border: none;
                height: auto;
                padding: 1px 8px;
                align-self: flex-end;
                margin-top: 18px;
                margin-right: 28px;
                font-size: 2rem;
            }
            
            h2 {
                color: black;
                text-align: left;
                font-size: 2rem;
                margin: 0;
            }
            
            label {
                color: black;
                text-align: left;
                margin-top: 20px;
            }
            
            input {
                margin-top: 10px;
                width: 60%;
            }

            #setting-panel > a {
                text-align: left;
                color: black;
                text-decoration: none;
                margin-top: 20px;
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
