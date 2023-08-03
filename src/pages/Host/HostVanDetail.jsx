import { Suspense } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLoaderData,
  defer,
  Await,
} from "react-router-dom";
import { getVan } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ params, request }) {
  await requireAuth(request);
  return defer({ currentVan: getVan(params.id) });
}

const HostVanDetail = () => {
  const dataPromise = useLoaderData();

  const activeStyles = {
    fontWeight: "bold",
    textDecoration: "underline",
    color: "#161616",
  };

  const renderVanDetail = (currentVan) => {
    return (
      <div className="host-van-detail-layout-container">
        <div className="host-van-detail">
          <img src={currentVan.imageUrl} />
          <div className="host-van-detail-info-text">
            <i className={`van-type ${currentVan.type} selected`}>
              {currentVan.type}
            </i>
            <h2>{currentVan.name}</h2>
            <p className="van-price">
              <span>${currentVan.price}</span>/day
            </p>
          </div>
        </div>
        <p>{currentVan.description}</p>

        <nav className="host-van-detail-nav">
          <NavLink
            to="."
            end
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Details
          </NavLink>
          <NavLink
            to="pricing"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Pricing
          </NavLink>
          <NavLink
            to="photos"
            style={({ isActive }) => (isActive ? activeStyles : null)}
          >
            Photos
          </NavLink>
        </nav>
        <Outlet context={{ currentVan }} />
      </div>
    );
  };

  return (
    <section>
      <Link to=".." relative="path" className="back-button">
        &larr;
        <span>Back to all vans</span>
      </Link>
      <Suspense fallback={<h2>Loading a van...</h2>}>
        <Await resolve={dataPromise.currentVan}>{renderVanDetail}</Await>
      </Suspense>
    </section>
  );
};

export default HostVanDetail;
