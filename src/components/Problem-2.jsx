import React, { useState, useEffect, Fragment } from "react";

const Problem2 = () => {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState({});
  const [values, setValues] = useState({
    query: "",
    type: "all",
  });

  useEffect(() => {
    setTimeout(() => {
      handleSearch(values.type);
    }, 500);
  }, [values.query]);

  useEffect(() => {
    // console.log(data);
  }, [data]);

  function handleChange(e) {
    const key = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  async function getDataFromApi(type) {
    let apiUrl = `https://contact.mediusware.com/api/contacts/${
      values.query ? `?search=${values.query}` : ``
    }`;
    if (type == "us") {
      apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20States/${
        values.query ? `?search=${values.query}` : ``
      }`;
    }
    // console.log(apiUrl);
    const response = await fetch(apiUrl);
    return response.json();
  }

  async function handleOpen(type) {
    handleChange({ target: { name: "type", value: type } });
    setShowModal(true);
    setData(await getDataFromApi(type));
  }

  async function handleSearch(type) {
    setData(await getDataFromApi(type));
  }

  function onClose() {
    handleChange({ target: { name: "query", value: "" } });
    setData({});
    setShowModal(false);
  }

  function renderButtons() {
    return (
      <Fragment>
        <button
          onClick={() => {
            setData({});
            handleOpen("all");
          }}
          className="btn btn-lg btn-outline-primary"
          type="button"
        >
          All Contacts
        </button>
        <button
          onClick={() => {
            setData({});
            handleOpen("us");
          }}
          className="btn btn-lg btn-outline-warning"
          type="button"
        >
          US Contacts
        </button>
      </Fragment>
    );
  }

  const renderModal = () => {
    return (
      <div
        style={{ backgroundColor: "#5A5A5A" }}
        className="w-100 h-100  position-fixed top-0 start-0 overflow-scroll overflow-x-hidden py-5"
      >
        <div style={{ width: "800px" }} className="mx-auto">
          <h4 className="text-center text-uppercase mb-5 text-white font-monospace">
            Contact List
          </h4>
          <form className="row gy-2 gx-3 align-items-center mb-4">
            <div className="col-auto w-50">
              <input
                name="query"
                value={values.query}
                onChange={handleChange}
                type="text"
                className="form-control w-100"
                placeholder="Search..."
              />
            </div>
          </form>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">S/L</th>
                <th scope="col">Phone Number</th>
                <th scope="col">Country</th>
              </tr>
            </thead>
            <tbody>
              {data.results && data.results.length
                ? data.results.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.phone}</td>
                        <td>{item.country.name}</td>
                      </tr>
                    );
                  })
                : null}
            </tbody>
          </table>
          <div className="d-flex justify-content-center gap-3">
            {renderButtons()}
            <button
              onClick={onClose}
              className="btn btn-lg btn-outline-danger"
              type="button"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container ">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>
        <div className="d-flex justify-content-center gap-3">
          {renderButtons()}
        </div>
      </div>
      {showModal ? renderModal() : null}
    </div>
  );
};

export default Problem2;
