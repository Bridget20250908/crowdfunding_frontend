// display all fundraisers
import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
    const { fundraisers, isLoading, error } = useFundraisers();
    if (isLoading) {
       return (<p>loading...</p>)
    }
      return (
          <div id="fundraiser-list">
              {fundraisers.map((fundraiserData, key) => {
                  return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
              })}
          </div>
      );
}

export default HomePage;