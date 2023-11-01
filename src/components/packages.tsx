import PaymentIcon from "@mui/icons-material/Payment";

const TwoColorDiv = () => {
  return (
    <div
      className="p-4"
      style={{
        height: "80vh",
        position: "relative",
        backgroundColor: "#f6f9fc",
        fill: "#425466",
      }}
    >
      <div
        className="bg-gray-light"
        style={{ width: "100%", height: "200px", position: "relative" }}
      >
        <h1 className="text-center uppercase text-2xl py-8">Choose a plan</h1>
        <div className="absolute w-full h-1/2 flex py-6 gap-2 bottom-7">
          <div
            className="p-4 h-96  shadow-custom rounded border-t-4 border-red-300"
            style={{ backgroundColor: "" }}
          >
            <div className="flex flex-col items-center justify-center">
              <PaymentIcon style={{ fontSize: 40 }} />
              <h2 className="text-xl font-semibold ml-3 text-green-500">
                Freemium Plan
              </h2>
            </div>
            <h2 className="text-center text-2xl mt-2">Kshs 0</h2>
            <p className="text-center">Per month</p>
            <p className="mt-4">
              Start with our Freemium plan today and enjoy up to 20 Ads per
              month.
            </p>
            <p className="mt-4">Get up to 4 ads a week</p>
            <p className="mt-4">Start with our Freemium plan.</p>
            <button className="bg-black text-white p-2 rounded hover:bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom mt-5">
              start
            </button>
          </div>
          <div className="p-4 h-96 shadow-custom rounded  border-t-4 border-green-300">
            <div className="flex flex-col items-center justify-center">
              <PaymentIcon style={{ fontSize: 40, color: "red" }} />
              <h2 className="text-xl font-semibold ml-3 text-red-600">
                Basic plan
              </h2>
            </div>
            <h2 className="text-center text-2xl mt-2">Kshs 1500</h2>
            <p className="text-center">Per month</p>
            <p className="mt-4">Get upto 50 ads per month</p>
            <p className="mt-4">Get 2 priority ads per month</p>
            <p className="mt-4">Start with us today.</p>
            <button className="bg-black text-white p-2 rounded hover-bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom mt-5">
              start
            </button>
          </div>
          <div className="p-4 h-96 shadow-custom rounded border-t-4 border-red-600">
            <div className="flex flex-col items-center justify-center">
              <PaymentIcon style={{ fontSize: 40, color: "orange" }} />
              <h2 className="text-xl font-semibold ml-3 text-orange-300">
                Standard plan
              </h2>
            </div>
            <h2 className="text-center text-2xl mt-2">Kshs 3500</h2>
            <p className="text-center">Per month</p>
            <p className="mt-4">Get unlimited ads per month</p>
            <p className="mt-4">Get up to upto 10 priority ads per month</p>
            <p className="mt-4">Get sponsorship for your ads</p>
            <button className="bg-black text-white p-2 rounded hover:bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom mt-5">
              start
            </button>
          </div>
          <div className="p-4 h-96 shadow-custom rounded border-t-4 border-green-600">
            <div className="flex flex-col items-center justify-center">
              <PaymentIcon
                style={{ fontSize: 40 }}
                className="text-orange-600"
              />
              <h2 className="text-xl font-semibold ml-3 text-orange-600">
                Premium plan
              </h2>
            </div>
            <h2 className="text-center text-2xl mt-2">Kshs 5000</h2>
            <p className="text-center">Per month</p>
            <p className="mt-4">Get Unlimited adds per month</p>
            <p className="mt-4">Get priority for your Ads</p>
            <p className="mt-4">Get sponsorship for your Ads</p>
            <button className="bg-black text-white p-2 rounded hover:bg-secondary-orange transition-colors delay-300 w-[250px] outline-none shadow-custom mt-5">
              start
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TwoColorDiv;
