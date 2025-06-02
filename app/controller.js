sap.ui.getCore().attachInit(function () {
  sap.ui.require([
    "sap/m/Input",
    "sap/m/Button",
    "sap/m/Text",
    "sap/m/MessageToast"
  ], function (Input, Button, Text, MessageToast) {
    const promptInput = new Input("promptInput");
    const responseText = new Text("responseText");

    window.onGetResponse = function () {
      const prompt = promptInput.getValue();
      if (!prompt) {
        MessageToast.show("Please enter a prompt");
        return;
      }

      fetch(`/cat/getGPTResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          return res.json();
        })
        .then((data) => {
          responseText.setText(data);
        })
        .catch(() => {
          MessageToast.show("Error fetching GPT response");
        });
    };
  });
});
