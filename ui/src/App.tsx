import React from "react";
import "./App.css";

import { Auth } from "aws-amplify";

import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import AppLayout, { getStructureItem } from "./components/AdminLayout";
import { DashboardOutlined, PercentageOutlined } from "@ant-design/icons";
import { Page } from "./pages/Page";
import { useNavigate } from "react-router-dom";

function App() {
  // const [collapsed, setCollapsed] = useState(false);
  // const query = gql`
  //   query {
  //     test
  //   }
  // `;
  // const { loading, data, error, refetch } = useQuery(query, {
  //   // fetchPolicy: "cache-first",
  //   // nextFetchPolicy: "cache-only",
  // });
  return (
    <AppLayout
      username="john.doe"
      structure={[
        getStructureItem(
          "Dashboard",
          "/",
          <DashboardOutlined />,
          <>dashboard</>
        ),
        getStructureItem(
          "Page1",
          "/page1",
          <PercentageOutlined />,
          <>page1</>,
          [getStructureItem("Page1", "/:id", <PercentageOutlined />, <Page />)]
        ),
      ]}
      onLogout={async () => {
        try {
          await Auth.signOut();
          window.location.reload();
        } catch (err) {
          console.error(err);
        }
      }}
    />
  );
}

export default withAuthenticator(App);
