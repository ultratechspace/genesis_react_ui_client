import React from "react";
import { store } from "./app-redux/store";
import { injectStore } from "./common/api/apiClient";
// import { IdleTimeOut } from "./common/api/idleTimeout";
import { WithNotifications } from "./notifications/WithNotifications";
import { AppRouting } from "./routes/AppRouting";
import { CustomMuiTheme } from "./theme/CustomMuiTheme";

function App() {
  injectStore(store); // to access store outside React FunctionComponent
  // IdleTimeOut();
  console.log("App Rendered 🚀🚀🚀");
  return (
    <CustomMuiTheme>
      <WithNotifications>
        <AppRouting />
      </WithNotifications>
    </CustomMuiTheme>
  );
}

export default App;
