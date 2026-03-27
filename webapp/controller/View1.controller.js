sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/Button",
    "sap/m/Image",
    "sap/m/VBox"
], function (Controller, Button, Image, VBox) {
    "use strict";

    return Controller.extend("project4.controller.View1", {

        onInit: function () {

            // ===== OPERATOR CODE =====
            let result = "";
            result += "== Operator Results:\n";
            result += "0 == false : " + (0 == false) + "\n";
            result += '"5" == 5 : ' + ("5" == 5) + "\n\n";

            result += "=== Operator Results:\n";
            result += "0 === false : " + (0 === false) + "\n";
            result += '"5" === 5 : ' + ("5" === 5) + "\n\n";

            this.getView().byId("txtResult").setText(result);

            // ===== PROMISE CODE =====
            const myPromise = new Promise((resolve, reject) => {

                let success = true;

                setTimeout(() => {
                    if (success) {
                        resolve("Promise: Data loaded successfully\n");
                    } else {
                        reject("Promise: Error while loading data\n");
                    }
                }, 2000);

            });

            myPromise
                .then(resultPromise => {
                    let currentText = this.getView().byId("txtResult").getText();
                    currentText += resultPromise;
                    this.getView().byId("txtResult").setText(currentText);
                })
                .catch(error => {
                    let currentText = this.getView().byId("txtResult").getText();
                    currentText += error;
                    this.getView().byId("txtResult").setText(currentText);
                });

            // ===== ASYNC FUNCTION CALL =====
            this.example();

            // ===== IMAGE + BUTTON LOGIC =====
            var oRoot = this.getView().byId("rootBox");

            this.oImgBox = new VBox({
                width: "100%",
                height: "400px"
            });

            // Open Button
            this.oOpenBtn = new Button({
                text: "Open Image",
                type: "Default",
                press: this.onShowImage.bind(this)
            });

            // Close Button
            this.oCloseBtn = new Button({
                text: "Close",
                type: "Default",
                visible: false,
                press: this.onCloseImage.bind(this)
            });

            // Apply theme colors using controller
            this.oOpenBtn.addEventDelegate({
                onAfterRendering: function () {
                    var $btn = this.$().find(".sapMBtnInner");
                    $btn.css("background-color", "var(--sapButton_Background)");
                    $btn.css("color", "var(--sapPositiveColor)");
                }
            }, this.oOpenBtn);

            this.oCloseBtn.addEventDelegate({
                onAfterRendering: function () {
                    var $btn = this.$().find(".sapMBtnInner");
                    $btn.css("background-color", "var(--sapButton_Background)");
                    $btn.css("color", "var(--sapNegativeColor)");
                }
            }, this.oCloseBtn);

            // Add controls
            oRoot.addItem(this.oOpenBtn);
            oRoot.addItem(this.oCloseBtn);
            oRoot.addItem(this.oImgBox);
        },

        // ===== IMAGE FUNCTIONS =====
        onShowImage: function () {

            this.oImgBox.removeAllItems();

            var oImage = new Image({
                src: "./image/image_2.jpg",
                width: "100%",
                height: "100%"
            });

            this.oImgBox.addItem(oImage);

            this.oOpenBtn.setVisible(false);
            this.oCloseBtn.setVisible(true);
        },

        onCloseImage: function () {

            this.oImgBox.removeAllItems();

            this.oOpenBtn.setVisible(true);
            this.oCloseBtn.setVisible(false);
        },

        // ===== ASYNC FUNCTION =====
        example: async function () {

            let oView = this.getView();

            let resultText = oView.byId("txtResult").getText();

            resultText += "\nAsync/Await:\nStart\n";
            oView.byId("txtResult").setText(resultText);

            let result = await new Promise((resolve) => {
                setTimeout(() => resolve("Done!\n"), 2000);
            });

            resultText = oView.byId("txtResult").getText();

            resultText += result + "End\n";

            oView.byId("txtResult").setText(resultText);
        }

    });
});
