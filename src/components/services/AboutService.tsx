import Photo from '../../assets/gallery.png';

import Robot from '../../assets/robot.avif';

const AboutPage = () => {
    return (
        <div className="bg-[#001e2b] text-white flex flex-col w-full py-20">
            <div className="max-w-[90rem] mx-auto ">
                <div className="md:flex md:items-center md:space-x-8 justify-around">
                    <div className="md:w-1/3">
                        <img
                            src={Photo}
                            alt="Sample Musician"
                            className="w-full h-full object-cover rounded-full shadow-lg mb-6"
                        />
                    </div>
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 text-center ">
                            Starting A Business?
                        </h2>
                        <p className="text-center">eDUKA has your back...</p>
                        <p className="my-6 text-base">
                            Embarking on a new business venture can be both exhilarating and
                            challenging. eDUKA, an online advertisement shop, serves as a valuable
                            ally for newcomers, reducing costs associated with physical stores
                            through cost-effective digital marketing solutions. By leveraging
                            eDUKA's expertise in online advertising, new entrepreneurs gain access
                            to a broader audience, allowing them to focus on their vision while
                            minimizing the financial burdens of traditional storefronts.
                        </p>
                        <p className="text-lg mb-6">
                            eDUKA, at the forefront of entrepreneurial support, bridges innovation
                            and success for newcomers. Their expert online advertising empowers new
                            businesses in the digital market, providing accessible, efficient, and
                            affordable advertising solutions. With eDUKA, entrepreneurs focus on
                            their vision, while eDUKA handles audience engagement, making the
                            journey towards business success achievable, exciting, and promising.
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-[90rem] mx-auto py-4 mt-5">
                <div className=" flex flex-wrap-reverse md:items-center md:space-x-8 justify-around">
                    <div className="md:w-1/2">
                        <h2 className="text-3xl md:text-4xl lg:text-4xl font-bold mb-6 text-center ">
                            Already In Business?
                        </h2>
                        <p className="text-center">Elevate your Sales with eDUKA...</p>
                        <p className="text-base my-6">
                            For seasoned entrepreneurs, the business landscape is an ever-shifting
                            terrain demanding constant adaptation and innovative strategies. eDUKA,
                            an established online advertisement shop, serves as a partner in this
                            dynamic realm, offering advanced digital marketing tools and expertise.
                            With a thorough understanding of the market intricacies, eDUKA empowers
                            established businesses to recalibrate their advertising approach,
                            harnessing the power of online platforms to maintain a competitive edge.
                            Their comprehensive solutions streamline the process, allowing
                            businesses to focus on growth and expansion, fostering connections with
                            a broader audience and strengthening brand presence in an increasingly
                            digital marketplace.
                        </p>
                        <p className="text-lg mb-6">
                            By leveraging eDUKA's wealth of experience in online advertising,
                            established entrepreneurs adapt their strategies for the digital age,
                            targeting specific audiences with precision and optimizing their
                            marketing efforts. eDUKA's tailored approach allows businesses to
                            fine-tune their branding and outreach, creating deeper connections with
                            customers and reinforcing their position in the market. As a reliable
                            partner, eDUKA assists established businesses in navigating the
                            ever-evolving business landscape, ensuring they stay competitive and
                            innovative in their industry.
                        </p>
                    </div>
                    <div className="md:w-1/3">
                        <img
                            src={Robot}
                            alt="Sample Musician"
                            className="h-[300px]  w-[300px] lg:h-[500px]  lg:w-[500px] object-cover rounded-full shadow-lg mb-6"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
