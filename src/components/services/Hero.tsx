import photo from "../../assets/cart.jpg"; // Replace this with your musician's photo

const Hero = () => {
  return (
    <section className="bg-hero-pattern h-screen bg-no-repeat bg-cover flex justify-center items-center p-5">
      <div
        className="banner bg-black bg-opacity-70 p-8 text-white rounded-xl flex flex-col md:flex-row items-center mt-3"
        style={{ width: "95%", marginTop: "10px" }}
      >
        <div className="order-2 md:order-1 md:w-1/2 md:pr-8">
          <h1 className="text-2xl md:text-4xl lg:text-3xl font-bold mb-4">
            Welcome to EDUKA
          </h1>
          <p className=" mb-6">We are the number one Advertisement platform</p>
          <p className="text-base md:text-lg">
            Join us in the world of online retail advertising and unlock the
            potential to showcase your products to a broader audience or
            discover a Veriety of consumables
          </p>
          <button
            className="bg-orange-700 w-24 text-white h-[40px] rounded  hover:bg-orange-600 translate-x-2 mt-4"
            type="submit"
          >
            <strong>Subscribe</strong>
          </button>
        </div>
        <div className="order-1 md:order-2 md:w-1/2">
          <img
            src={photo}
            alt="Sample Musician"
            className="w-64 sm:w-96 h-64 sm:h-96 object-cover rounded-full shadow-lg mx-auto md:mx-0 mb-6"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
