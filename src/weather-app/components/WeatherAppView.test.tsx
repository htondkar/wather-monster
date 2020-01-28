import React from "react";
import ReactDOM from "react-dom";
import { act } from "react-dom/test-utils";

import { WeatherAppView } from "./WeatherAppView";

let container: HTMLElement | null;

beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  if (container) {
    document.body.removeChild(container);
  }
  container = null;
});

describe("App", () => {
  it("should match the snapshot", () => {
    act(() => {
      ReactDOM.render(
        <WeatherAppView
          addCity={() => {}}
          removeCity={() => {}}
          weatherReports={[["London", { min: 10, max: 20 }]]}
          cities={[]}
          selectedCities={[]}
        />,
        container
      );
    });

    expect(container).toMatchInlineSnapshot(`
      <div>
        <section
          class="sc-AykKH ffFGXC"
        >
          <h2
            class="MuiTypography-root MuiTypography-h2"
          >
            Weather Monster
          </h2>
          <div>
            <form
              class="sc-AykKC bZhDMb"
            >
              <div
                class="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-fullWidth MuiInput-fullWidth"
              >
                <input
                  class="MuiInputBase-input MuiInput-input"
                  placeholder="Search in Germany"
                  type="text"
                  value=""
                />
              </div>
            </form>
          </div>
          <div
            class="sc-AykKG iNYSeo"
          >
            <div
              class="MuiPaper-root MuiCard-root MuiPaper-elevation1 MuiPaper-rounded"
              data-testid="weather-report-card"
            >
              <div
                class="MuiCardHeader-root"
              >
                <div
                  class="MuiCardHeader-content"
                >
                  <span
                    class="MuiTypography-root MuiCardHeader-title MuiTypography-h5 MuiTypography-displayBlock"
                  >
                    LONDON
                  </span>
                  <span
                    class="MuiTypography-root MuiCardHeader-subheader MuiTypography-body1 MuiTypography-colorTextSecondary MuiTypography-displayBlock"
                  >
                    1/28/2020
                  </span>
                </div>
                <div
                  class="MuiCardHeader-action"
                >
                  <button
                    aria-label="remove"
                    class="MuiButtonBase-root MuiIconButton-root"
                    tabindex="0"
                    type="button"
                  >
                    <span
                      class="MuiIconButton-label"
                    >
                      <svg
                        aria-hidden="true"
                        class="MuiSvgIcon-root"
                        focusable="false"
                        role="presentation"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
                        />
                      </svg>
                    </span>
                    <span
                      class="MuiTouchRipple-root"
                    />
                  </button>
                </div>
              </div>
              <div
                class="MuiCardContent-root sc-AykKF dYPWCK"
              >
                <p
                  class="MuiTypography-root MuiTypography-body2"
                >
                  Min: 
                  10
                </p>
                <p
                  class="MuiTypography-root MuiTypography-body2"
                >
                  Max: 
                  20
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    `);
  });
});
