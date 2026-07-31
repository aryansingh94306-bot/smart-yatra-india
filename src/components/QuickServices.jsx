import "./QuickServices.css";

function QuickServices() {

    const services = [

        {
            title: "Nearby Bus",
            icon: "🚌",
            value: "250 m Away"
        },

        {
            title: "Nearest Metro",
            icon: "🚇",
            value: "1.8 km"
        },

        {
            title: "Auto Stand",
            icon: "🛺",
            value: "Available"
        },

        {
            title: "Parcel Service",
            icon: "📦",
            value: "Book Now"
        },

        {
            title: "Estimated Fare",
            icon: "💳",
            value: "₹48"
        },

        {
            title: "AI Route",
            icon: "🤖",
            value: "Fastest Route"
        }

    ];

    return (

        <section className="services">

            <h2>Nearby Transport & Smart Services</h2>

            <div className="service-grid">

                {services.map((item,index)=>(

                    <div className="service-card" key={index}>

                        <h1>{item.icon}</h1>

                        <h3>{item.title}</h3>

                        <p>{item.value}</p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default QuickServices;