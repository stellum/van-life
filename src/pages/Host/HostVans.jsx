import { Suspense } from "react";
import { Link, useLoaderData, defer, Await } from "react-router-dom";
import { getHostVans } from "../../api";
import { requireAuth } from "../../utils";

export async function loader({ request }) {
  requireAuth(request);
  return defer({ hostVans: getHostVans() });
}

const HostVans = () => {
  const dataPromise = useLoaderData();

  return (
    <section>
      <h1 className="host-vans-title">Your listed vans</h1>
      <Suspense fallback={<h2>Loading vans...</h2>}>
        <Await resolve={dataPromise.hostVans}>
          {(vans) => {
            const hostVanEls = vans.map((van) => (
              <Link to={van.id} key={van.id} className="host-van-link-wrapper">
                <div className="host-van-single" key={van.id}>
                  <img src={van.imageUrl} alt={`Photo of ${van.name}`} />
                  <div className="host-van-info">
                    <h3>{van.name}</h3>
                    <p>${van.price}/day</p>
                  </div>
                </div>
              </Link>
            ));

            return (
              <div className="host-vans-list">
                <section>{hostVanEls}</section>
              </div>
            );
          }}
        </Await>
      </Suspense>
    </section>
  );
};

export default HostVans;
