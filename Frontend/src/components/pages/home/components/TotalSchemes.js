import { FileText, Building, Landmark, Search } from "lucide-react";

const StatCard = ({ icon: Icon, title, value }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <Icon size={48} className="text-primary-blue mr-4" />
        <div>
            <h3 className="text-2xl font-bold">{value}</h3>
            <p className="text-gray-600">{title}</p>
        </div>
    </div>
);

const TotalSchemes = () => {
    return (
        <section className="px-8 py-12 bg-background-light">
            <h1 className="text-3xl font-bold text-center mb-8">Total Available Schemes</h1>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    <StatCard icon={FileText} title="Total Schemes Available" value="500+" />
                    <StatCard icon={Building} title="Total Central Schemes" value="200+" />
                    <StatCard icon={Landmark} title="Total Schemes for States" value="300+" />
                </div>
                <div className="text-center">
                    <button className="bg-primary-blue text-white px-6 py-3 rounded-full text-lg font-semibold flex items-center mx-auto hover:bg-secondary-blue transition duration-300">
                        <Search className="mr-2" />
                        Find Schemes for You
                    </button>
                </div>
            </div>
        </section>
    );
};

export default TotalSchemes