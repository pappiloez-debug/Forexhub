(function () {
    "use strict";

    /*
     * EZTradingHub Cookie Consent Manager
     *
     * Categories:
     * - necessary: always enabled
     * - analytics: disabled until consent
     * - advertising: disabled until consent
     */

    const CONSENT_KEY = "ezth_cookie_consent";
    const CONSENT_VERSION = "1.0";

    const defaultConsent = {
        version: CONSENT_VERSION,
        necessary: true,
        analytics: false,
        advertising: false,
        timestamp: null
    };

    function getConsent() {
        try {
            const saved = localStorage.getItem(CONSENT_KEY);

            if (!saved) {
                return null;
            }

            const parsed = JSON.parse(saved);

            if (parsed.version !== CONSENT_VERSION) {
                return null;
            }

            return {
                ...defaultConsent,
                ...parsed,
                necessary: true
            };

        } catch (error) {
            console.warn("Cookie consent could not be read.");
            return null;
        }
    }

    function saveConsent(settings) {

        const consent = {
            version: CONSENT_VERSION,
            necessary: true,
            analytics: Boolean(settings.analytics),
            advertising: Boolean(settings.advertising),
            timestamp: new Date().toISOString()
        };

        localStorage.setItem(
            CONSENT_KEY,
            JSON.stringify(consent)
        );

        applyConsent(consent);

        hideBanner();
        hideModal();

        window.dispatchEvent(
            new CustomEvent("ezthConsentUpdated", {
                detail: consent
            })
        );
    }


    /*
     * Apply consent to your website.
     *
     * Analytics and advertising scripts should be loaded
     * through the functions below.
     */

    function applyConsent(consent) {

        if (!consent) {
            return;
        }

        if (consent.analytics) {
            loadAnalytics();
        }

        if (consent.advertising) {
            loadAdvertising();
        }
    }


    /*
     * ANALYTICS
     *
     * Add your Google Analytics / other analytics code
     * inside loadAnalytics() when you are ready.
     */

    function loadAnalytics() {

        if (window.ezthAnalyticsLoaded) {
            return;
        }

        window.ezthAnalyticsLoaded = true;

        /*
         * EXAMPLE ONLY
         *
         * Replace G-XXXXXXXXXX with your real
         * Google Analytics Measurement ID.
         *
         * Uncomment this section when you are ready.
         */

        /*
        const script = document.createElement("script");

        script.async = true;

        script.src =
            "https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX";

        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];

        function gtag() {
            window.dataLayer.push(arguments);
        }

        window.gtag = gtag;

        gtag("js", new Date());

        gtag("config", "G-XXXXXXXXXX");
        */

        console.log("EZTradingHub analytics consent granted.");
    }


    /*
     * ADVERTISING
     *
     * Add AdSense or another advertising script here.
     *
     * Do NOT place advertising scripts directly in
     * index.html before consent if they use non-essential
     * cookies/storage or personalized advertising.
     */

    function loadAdvertising() {

        if (window.ezthAdvertisingLoaded) {
            return;
        }

        window.ezthAdvertisingLoaded = true;

        /*
         * Add your approved advertising integration here.
         */

        console.log("EZTradingHub advertising consent granted.");
    }


    /*
     * UI
     */

    function createConsentUI() {

        if (document.getElementById("ezth-cookie-banner")) {
            return;
        }

        const style = document.createElement("style");

        style.id = "ezth-cookie-styles";

        style.textContent = `

            #ezth-cookie-banner {
                position: fixed;
                left: 20px;
                right: 20px;
                bottom: 20px;
                max-width: 1100px;
                margin: auto;
                background: #0b1220;
                color: #ffffff;
                padding: 22px;
                border-radius: 18px;
                box-shadow: 0 15px 45px rgba(0,0,0,.30);
                z-index: 999999;
                border: 1px solid rgba(255,255,255,.10);
                animation: ezthCookieSlide .35s ease;
            }

            @keyframes ezthCookieSlide {
                from {
                    opacity: 0;
                    transform: translateY(25px);
                }

                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .ezth-cookie-content {
                display: flex;
                align-items: center;
                gap: 20px;
            }

            .ezth-cookie-icon {
                width: 52px;
                height: 52px;
                min-width: 52px;
                border-radius: 14px;
                background: rgba(34,197,94,.12);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 27px;
            }

            .ezth-cookie-text {
                flex: 1;
            }

            .ezth-cookie-text h3 {
                margin: 0 0 6px;
                color: #ffffff;
                font-size: 18px;
            }

            .ezth-cookie-text p {
                margin: 0;
                color: #cbd5e1;
                font-size: 14px;
                line-height: 1.6;
            }

            .ezth-cookie-text a {
                color: #4ade80;
                text-decoration: underline;
            }

            .ezth-cookie-buttons {
                display: flex;
                gap: 9px;
                flex-wrap: wrap;
                justify-content: flex-end;
            }

            .ezth-cookie-btn {
                border: none;
                border-radius: 9px;
                padding: 11px 17px;
                cursor: pointer;
                font-weight: 700;
                font-size: 13px;
                transition: .2s ease;
            }

            .ezth-cookie-accept {
                background: #22c55e;
                color: #ffffff;
            }

            .ezth-cookie-accept:hover {
                background: #16a34a;
            }

            .ezth-cookie-reject {
                background: #ffffff;
                color: #0f172a;
            }

            .ezth-cookie-reject:hover {
                background: #e2e8f0;
            }

            .ezth-cookie-settings {
                background: transparent;
                color: #cbd5e1;
                border: 1px solid #475569;
            }

            .ezth-cookie-settings:hover {
                background: rgba(255,255,255,.08);
            }


            /* MODAL */

            #ezth-cookie-modal {
                position: fixed;
                inset: 0;
                background: rgba(2,6,23,.72);
                z-index: 1000000;
                display: none;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }

            .ezth-cookie-modal-box {
                width: 100%;
                max-width: 650px;
                max-height: 90vh;
                overflow-y: auto;
                background: #ffffff;
                color: #1e293b;
                border-radius: 18px;
                padding: 30px;
                box-shadow: 0 25px 70px rgba(0,0,0,.35);
            }

            .ezth-cookie-modal-box h2 {
                margin: 0 0 8px;
                color: #0f172a;
            }

            .ezth-cookie-modal-box > p {
                color: #64748b;
                font-size: 14px;
                margin-bottom: 22px;
            }

            .ezth-cookie-option {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 20px;
                padding: 18px 0;
                border-bottom: 1px solid #e2e8f0;
            }

            .ezth-cookie-option h4 {
                margin: 0 0 5px;
                color: #0f172a;
            }

            .ezth-cookie-option p {
                margin: 0;
                color: #64748b;
                font-size: 13px;
            }

            .ezth-cookie-required {
                color: #16a34a;
                font-size: 12px;
                font-weight: 700;
            }

            .ezth-cookie-toggle {
                position: relative;
                width: 48px;
                height: 26px;
                min-width: 48px;
            }

            .ezth-cookie-toggle input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .ezth-cookie-slider {
                position: absolute;
                inset: 0;
                background: #cbd5e1;
                border-radius: 30px;
                cursor: pointer;
                transition: .2s;
            }

            .ezth-cookie-slider:before {
                content: "";
                position: absolute;
                width: 20px;
                height: 20px;
                left: 3px;
                top: 3px;
                background: #ffffff;
                border-radius: 50%;
                transition: .2s;
            }

            .ezth-cookie-toggle input:checked + .ezth-cookie-slider {
                background: #22c55e;
            }

            .ezth-cookie-toggle input:checked + .ezth-cookie-slider:before {
                transform: translateX(22px);
            }

            .ezth-cookie-modal-actions {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 25px;
            }

            @media (max-width: 700px) {

                #ezth-cookie-banner {
                    left: 10px;
                    right: 10px;
                    bottom: 10px;
                    padding: 18px;
                }

                .ezth-cookie-content {
                    align-items: flex-start;
                }

                .ezth-cookie-icon {
                    display: none;
                }

                .ezth-cookie-buttons {
                    width: 100%;
                    justify-content: stretch;
                }

                .ezth-cookie-btn {
                    flex: 1;
                }

                .ezth-cookie-modal-box {
                    padding: 22px;
                }

                .ezth-cookie-modal-actions {
                    flex-direction: column;
                }

                .ezth-cookie-modal-actions .ezth-cookie-btn {
                    width: 100%;
                }
            }
        `;

        document.head.appendChild(style);


        /*
         * BANNER
         */

        const banner = document.createElement("div");

        banner.id = "ezth-cookie-banner";

        banner.innerHTML = `
            <div class="ezth-cookie-content">

                <div class="ezth-cookie-icon">
                    🍪
                </div>

                <div class="ezth-cookie-text">

                    <h3>
                        Your Privacy Matters
                    </h3>

                    <p>
                        EZTradingHub uses necessary storage to keep the
                        website working. With your permission, we may also
                        use analytics and advertising technologies to
                        understand website usage and improve our services.
                        Read our
                        <a href="cookie-policy.html">
                            Cookie Policy
                        </a>.
                    </p>

                </div>

                <div class="ezth-cookie-buttons">

                    <button
                        type="button"
                        class="ezth-cookie-btn ezth-cookie-reject"
                        id="ezth-reject">
                        Reject Non-Essential
                    </button>

                    <button
                        type="button"
                        class="ezth-cookie-btn ezth-cookie-settings"
                        id="ezth-settings">
                        Settings
                    </button>

                    <button
                        type="button"
                        class="ezth-cookie-btn ezth-cookie-accept"
                        id="ezth-accept">
                        Accept All
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(banner);


        /*
         * MODAL
         */

        const modal = document.createElement("div");

        modal.id = "ezth-cookie-modal";

        modal.innerHTML = `

            <div class="ezth-cookie-modal-box">

                <h2>
                    Cookie Settings
                </h2>

                <p>
                    Choose which optional technologies you allow.
                    You can change your preferences later.
                </p>


                <div class="ezth-cookie-option">

                    <div>

                        <h4>
                            Necessary
                        </h4>

                        <p>
                            Required for essential website functionality,
                            security and remembering your consent choice.
                        </p>

                        <span class="ezth-cookie-required">
                            Always Active
                        </span>

                    </div>

                </div>


                <div class="ezth-cookie-option">

                    <div>

                        <h4>
                            Analytics
                        </h4>

                        <p>
                            Helps us understand how visitors use
                            EZTradingHub so we can improve the website.
                        </p>

                    </div>

                    <label class="ezth-cookie-toggle">

                        <input
                            type="checkbox"
                            id="ezth-analytics-toggle">

                        <span class="ezth-cookie-slider"></span>

                    </label>

                </div>


                <div class="ezth-cookie-option">

                    <div>

                        <h4>
                            Advertising
                        </h4>

                        <p>
                            Allows advertising and measurement technologies
                            where applicable.
                        </p>

                    </div>

                    <label class="ezth-cookie-toggle">

                        <input
                            type="checkbox"
                            id="ezth-advertising-toggle">

                        <span class="ezth-cookie-slider"></span>

                    </label>

                </div>


                <div class="ezth-cookie-modal-actions">

                    <button
                        type="button"
                        class="ezth-cookie-btn ezth-cookie-reject"
                        id="ezth-modal-reject">
                        Reject Optional
                    </button>

                    <button
                        type="button"
                        class="ezth-cookie-btn ezth-cookie-accept"
                        id="ezth-save">
                        Save Preferences
                    </button>

                </div>

            </div>
        `;

        document.body.appendChild(modal);


        /*
         * BUTTONS
         */

        document
            .getElementById("ezth-accept")
            .addEventListener("click", function () {

                saveConsent({
                    analytics: true,
                    advertising: true
                });

            });


        document
            .getElementById("ezth-reject")
            .addEventListener("click", function () {

                saveConsent({
                    analytics: false,
                    advertising: false
                });

            });


        document
            .getElementById("ezth-settings")
            .addEventListener("click", function () {

                showModal();

            });


        document
            .getElementById("ezth-modal-reject")
            .addEventListener("click", function () {

                saveConsent({
                    analytics: false,
                    advertising: false
                });

            });


        document
            .getElementById("ezth-save")
            .addEventListener("click", function () {

                saveConsent({
                    analytics:
                        document.getElementById(
                            "ezth-analytics-toggle"
                        ).checked,

                    advertising:
                        document.getElementById(
                            "ezth-advertising-toggle"
                        ).checked
                });

            });
    }


    function showModal() {

        const consent = getConsent();

        const analyticsToggle =
            document.getElementById("ezth-analytics-toggle");

        const advertisingToggle =
            document.getElementById("ezth-advertising-toggle");

        if (consent) {

            analyticsToggle.checked =
                consent.analytics;

            advertisingToggle.checked =
                consent.advertising;

        } else {

            analyticsToggle.checked = false;
            advertisingToggle.checked = false;

        }

        document.getElementById(
            "ezth-cookie-modal"
        ).style.display = "flex";
    }


    function hideModal() {

        const modal =
            document.getElementById("ezth-cookie-modal");

        if (modal) {
            modal.style.display = "none";
        }
    }


    function hideBanner() {

        const banner =
            document.getElementById("ezth-cookie-banner");

        if (banner) {
            banner.remove();
        }
    }


    /*
     * PUBLIC COOKIE SETTINGS BUTTON
     */

    window.EZTHCookieSettings = function () {
        showModal();
    };


    /*
     * INITIALIZE
     */

    function init() {

        createConsentUI();

        const consent = getConsent();

        if (consent) {

            hideBanner();

            applyConsent(consent);

        }

    }


    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            init
        );

    } else {

        init();

    }

})();