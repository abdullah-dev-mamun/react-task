import React, { useState } from "react";

const Problem1 = () => {
  const [show, setShow] = useState("all");
  const [values, setValues] = useState({
    name: "",
    status: "",
  });
  const [items, setItems] = useState([]);

  const handleClick = (val) => {
    setShow(val);
  };

  function handleChange(e) {
    const key = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    setValues((values) => ({
      ...values,
      [key]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const newItems = [...items];
    newItems.push({
      name: values.name,
      status: values.status,
    });
    setItems(newItems);
  }

  function reorderItems(data) {
    const order = ["active", "completed", "pending", "archive"];
    const newItems = data.sort(function (a, b) {
      return order.indexOf(a.status) - order.indexOf(b.status);
    });
    return newItems;
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-1</h4>
        <div className="col-6 ">
          <form
            onSubmit={handleSubmit}
            className="row gy-2 gx-3 align-items-center mb-4"
          >
            <div className="col-auto">
              <input
                name="name"
                value={values.name}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Name"
                required
              />
            </div>
            <div className="col-auto">
              <select
                className="form-control"
                name="status"
                value={values.status}
                onChange={handleChange}
                required
              >
                <option value="">Select Status</option>
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="archive">Archive</option>
              </select>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
        <div className="col-8">
          <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <button
                className={`nav-link ${show === "all" && "active"}`}
                type="button"
                onClick={() => handleClick("all")}
              >
                All
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "active" && "active"}`}
                type="button"
                onClick={() => handleClick("active")}
              >
                Active
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${show === "completed" && "active"}`}
                type="button"
                onClick={() => handleClick("completed")}
              >
                Completed
              </button>
            </li>
          </ul>
          <div className="tab-content">{/* {JSON.stringify(items)} */}</div>
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {reorderItems(items)
                .filter((i) => (show != "all" ? i.status === show : true))
                .map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.name}</td>
                      <td>{item.status}</td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Problem1;
