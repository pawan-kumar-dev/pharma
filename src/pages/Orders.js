import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { InputField, MainModal } from "../components";
import { orderValidation } from "../utils/formValidations";
import { MANAGER } from "../utils/roles";
import {
  generateId,
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/setInitialData";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [medicines, setMedicines] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({
    customerName: "",
    contactNumber: "",
    products: [],
    amount: 0,
  });
  useEffect(() => {
    const totalOrders = getLocalStorageData("orders") || [];
    setOrders(totalOrders);
    const totalMedicines = getLocalStorageData("medicines") || [];
    setMedicines(totalMedicines);
  }, []);
  const onCloseModal = () => {
    setOpenModal(false);
    setEditData({
      customerName: "",
      contactNumber: "",
      products: [],
      amount: 0,
    });
  };
  const onAddEditOrders = (data) => {
    let totalOrders = getLocalStorageData("orders") || [];
    if (editData.customerName && data.id) {
      totalOrders = totalOrders.filter((order) => order.id !== data.id);
      totalOrders.push(data);
      const orderData = [...orders].filter((order) => order.id !== data.id);
      orderData.push(data);
      setOrders(orderData);
      setLocalStorageData("orders", totalOrders);
    } else {
      totalOrders = [...totalOrders, { ...data, id: generateId(totalOrders) }];
      setLocalStorageData("orders", totalOrders);

      const orderData = [...orders, { ...data, id: generateId(orders) }];
      setOrders(orderData);
    }
    onCloseModal();
  };
  const deleteOrder = (id) => {
    let totalOrders = getLocalStorageData("orders") || [];
    totalOrders = totalOrders.filter((order) => order.id !== id);
    setLocalStorageData("orders", totalOrders);
    const orderData = [...orders].filter((order) => order.id !== id);
    setOrders(orderData);
  };

  const addNewProduct = (values, setValues, medicine, event) => {
    let products = [...values.products];
    if (event.target.checked) {
      products.push({ ...medicine, quantity: 0 });
    } else {
      products = products.filter((pro) => pro.id !== medicine.id);
    }
    setValues({ ...values, products });
  };
  const loggedInRole = getLocalStorageData("loggedInRole");
  return (
    <div>
      <MainModal
        open={openModal}
        onClose={() => onCloseModal()}
        title={editData.id ? "Edit Order" : "Add Order"}
        editData={editData}
      >
        <Formik
          initialValues={editData}
          onSubmit={onAddEditOrders}
          validateOnBlur
          validationSchema={orderValidation}
        >
          {({ values, handleChange, setValues }) => (
            <Form style={{ width: "100%" }}>
              <InputField
                name="customerName"
                label="Customer Name"
                value={values.customerName || ""}
                onChange={handleChange}
              />
              <InputField
                name="contactNumber"
                label="Contact Number"
                value={values.contactNumber || ""}
                onChange={handleChange}
              />
              <div>Select Product </div>
              {medicines.map((medicine) => (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    style={{ marginRight: "8px" }}
                    checked={values.products
                      .map((pro) => pro.name)
                      .includes(medicine.name)}
                    onClick={(event) =>
                      addNewProduct(values, setValues, medicine, event)
                    }
                  />
                  <span>{medicine.name}</span>
                </div>
              ))}
              <div>Selected Products</div>
              {values.products.map((medicine) => (
                <div className="flex justify-between">
                  <span>{medicine.name}: </span>
                  Quantity
                  <input
                    value={medicine.quantity}
                    className="
                    block
                    mt-1
                    text-sm
                    dark:border-gray-600 dark:bg-gray-700
                    focus:border-purple-400
                    focus:outline-none
                    focus:shadow-outline-purple
                    dark:text-gray-300 dark:focus:shadow-outline-gray
                    form-input
                  "
                    type="number"
                    onChange={(e) => {
                      const products = [...values.products];
                      const findProduct = products.findIndex(
                        (pro) => pro.name === medicine.name
                      );
                      if (findProduct !== -1) {
                        products[findProduct].quantity = e.target.value;
                      }
                      setValues({ ...values, products });
                    }}
                  />
                </div>
              ))}
              <InputField
                name="amount"
                label="Total Amount"
                type="number"
                value={values.amount || ""}
                onChange={handleChange}
              />
              <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mt-1">
                {editData.id ? "Edit Order" : "Add Order"}
              </button>
            </Form>
          )}
        </Formik>
      </MainModal>
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
        Orders
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add Order
        </button>
      </h4>
      {orders.length > 0 ? (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Order Id</th>
                  <th className="px-4 py-3">Customer Name</th>
                  <th className="px-4 py-3">Customer Contact Number</th>
                  <th className="px-4 py-3">Products</th>
                  <th className="px-4 py-3">Total Amount</th>
                  {loggedInRole === MANAGER && (
                    <th className="px-4 py-3">Actions</th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {orders.map((order) => (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{order.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{order.customerName}</td>
                    <td className="px-4 py-3 text-xs">{order.contactNumber}</td>
                    <td className="px-4 py-3 text-sm">
                      {order.products.map((pro) => (
                        <>
                          Name: {pro.name}, Quantity: {pro.quantity} <br />
                        </>
                      ))}
                    </td>
                    <td className="px-4 py-3 text-sm">{order.amount}</td>
                    {loggedInRole === MANAGER && (
                      <td className="px-4 py-3">
                        <div className="flex items-center space-x-4 text-sm">
                          <button
                            onClick={() => {
                              setEditData(order);
                              setOpenModal(true);
                            }}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Edit"
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteOrder(order.id)}
                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-purple-600 rounded-lg dark:text-gray-400 focus:outline-none focus:shadow-outline-gray"
                            aria-label="Delete"
                          >
                            <svg
                              className="w-5 h-5"
                              aria-hidden="true"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                clip-rule="evenodd"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 flex justify-center">
          No Orders Added Yet.
        </h4>
      )}
    </div>
  );
};

export default Orders;
