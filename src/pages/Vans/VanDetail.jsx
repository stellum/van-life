import { Suspense } from "react";
import {
  Link,
  useLocation,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVans } from "../../api";

export function loader({ params }) {
  return defer({ van: getVans(params.id) });
}

const VanDetail = () => {
  const location = useLocation();
  const dataPromise = useLoaderData();

  const search = location.state?.search || "";
  const type = location.state?.type || "all";

  const renderVanDetail = (van) => {
    return (
      <>
        {van ? (
          <div className="van-detail">
            <img src={van.imageUrl} />
            <i className={`van-type ${van.type} selected`}>{van.type}</i>
            <h2>{van.name}</h2>
            <p className="van-price">
              <span>${van.price}</span>/day
            </p>
            <p>{van.description}</p>
            <button className="link-button">Rent this van</button>
          </div>
        ) : (
          <h2>Loading...</h2>
        )}
      </>
    );
  };

  return (
    <div className="van-detail-container">
      <Link to={`..${search}`} relative="path" className="back-button">
        &larr;
        <span>Back to {type} vans</span>
      </Link>
      <Suspense fallback={<h2>Loading a van...</h2>}>
        <Await resolve={dataPromise.van}>{renderVanDetail}</Await>
      </Suspense>
    </div>
  );
};

export default VanDetail;
