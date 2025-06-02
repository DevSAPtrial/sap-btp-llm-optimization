sap.ui.define([
  "sap/ui/core/UIComponent",
  "sap/ui/model/json/JSONModel"
], function(UIComponent, JSONModel) {
  "use strict";

  return UIComponent.extend("sap.btp.llm.ui.Component", {
    metadata: {
      manifest: "json"
    },

    init: function() {
      UIComponent.prototype.init.apply(this, arguments);
      const oData = {
        prompt: "",
        response: ""
      };
      this.setModel(new JSONModel(oData));
    }
  });
});
