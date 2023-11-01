import { Typography } from "antd";

const { Title, Text } = Typography;

const txt = {
  joinCommunity: "Join our Advert platform today",
  dayGuarrantee: "30-day, hassle free, money back guarrantee",
  gainAccess: "Become a Premium member today and post unlimited ads",
  perfect: "Or Become a Mega member for ++ benefits",
  monthlySub: "Monthly Subscription",
  dollar: "kes 1500",
  perMonth: "per month",
  fullAccess: "Full access for a week At kes 500",
  signUp: "Sign Up",
  whyUs: "Kes 2500 -Mega package",
  msgs: [
    "Gain Unlimited access",
    "Make your ads a priority",
    "Full access for a week At kes 700",
  ],
};

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="main">
          <div id="topDiv" className="topContainer text-dark-900">
            <Title level={4} style={{ color: "" }}>
              {txt.joinCommunity}
            </Title>
            <Text
              style={{ color: "gray", fontSize: "18px", fontWeight: "bold" }}
            >
              On joining our community, you :
            </Text>
            <Text
              style={{ color: "#b2b6c1", fontSize: "18px", marginTop: "8px" }}
            >
              {txt.gainAccess}
            </Text>
            <Text style={{ color: "#b2b6c1", fontSize: "18px" }}>
              {txt.perfect}
            </Text>
          </div>
          <div id="bottomDiv" className="bottomContainer">
            <div id="bottom-left-div" className="bottomLeft">
              <Text className="heading">{txt.monthlySub}</Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                }}
              >
                <Title level={2} style={{ margin: "16px 0" }}>
                  {txt.dollar}
                </Title>
                <Text
                  style={{
                    color: "#ffffff77",
                    fontSize: "16px",
                    marginLeft: "8px",
                  }}
                >
                  {txt.perMonth}
                </Text>
              </div>
              <Text style={{ color: "#efefefdd", fontSize: "16px" }}>
                {txt.fullAccess}
              </Text>
              <button className="button bg-primary-orange">{txt.signUp}</button>
            </div>
            <div id="bottom-right-div" className="bottomRight">
              <Text className="heading" style={{ marginBottom: "12px" }}>
                {txt.whyUs}
              </Text>
              {txt.msgs.map((msg) => (
                <Text
                  style={{
                    color: "#ffffff99",
                    fontSize: "16px",
                    marginTop: "4px",
                  }}
                >
                  {msg}
                </Text>
              ))}
              <button className="button bg-primary-orange">{txt.signUp}</button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
