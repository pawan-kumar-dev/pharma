import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { InputField, MainModal } from "../components";
import { medicineValidation } from "../utils/formValidations";
import {
  generateId,
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/setInitialData";

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    manufacturerName: "",
    price: 0,
    stock: 0,
    discount: 0,
  });
  useEffect(() => {
    const totalMedicines = getLocalStorageData("medicines") || [];
    setMedicines(totalMedicines);
  }, []);
  const onCloseModal = () => {
    setOpenModal(false);
    setEditData({
      name: "",
      manufacturerName: "",
      price: 0,
      stock: 0,
      discount: 0,
    });
  };
  const onAddEditMedicine = (data) => {
    let totalMedicines = getLocalStorageData("medicines") || [];
    if (editData.name && data.id) {
      totalMedicines = totalMedicines.filter(
        (medicine) => medicine.id !== data.id
      );
      totalMedicines.push(data);
      const medicinesData = [...medicines].filter(
        (medicine) => medicine.id !== data.id
      );
      console.log(totalMedicines);
      medicinesData.push(data);
      setLocalStorageData("medicines", totalMedicines);
      setMedicines(medicinesData);
    } else {
      totalMedicines = [
        ...totalMedicines,
        { ...data, id: generateId(totalMedicines) },
      ];
      setLocalStorageData("medicines", totalMedicines);

      const medicinesData = [
        ...medicines,
        { ...data, id: generateId(medicines) },
      ];
      setMedicines(medicinesData);
    }

    onCloseModal();
  };
  const deleteMedicine = (id) => {
    let totalMedicines = getLocalStorageData("medicines") || [];
    totalMedicines = totalMedicines.filter((medicine) => medicine.id !== id);
    setLocalStorageData("medicines", totalMedicines);

    const medicinesData = [...medicines].filter(
      (medicine) => medicine.id !== id
    );
    setMedicines(medicinesData);
  };

  return (
    <div>
      <MainModal
        open={openModal}
        onClose={() => onCloseModal()}
        title={editData.name ? "Edit Medicine" : "Add Medicine"}
        editData={editData}
      >
        <Formik
          initialValues={editData}
          onSubmit={onAddEditMedicine}
          validateOnBlur
          validationSchema={medicineValidation}
        >
          {({ values, handleChange }) => (
            <Form style={{ width: "100%" }}>
              <InputField
                name="name"
                label="Name"
                value={values.name || ""}
                onChange={handleChange}
              />
              <InputField
                name="manufacturerName"
                label="Manufacturer Name"
                value={values.manufacturerName || ""}
                onChange={handleChange}
              />
              <InputField
                name="price"
                label="Price"
                value={values.price || ""}
                onChange={handleChange}
              />
              <InputField
                name="stock"
                label="Stock"
                value={values.stock || ""}
                onChange={handleChange}
              />
              <InputField
                name="discount"
                label="Discount"
                value={values.discount || ""}
                onChange={handleChange}
              />
              <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mt-1">
                {editData.name ? "Edit Medicine" : "Add Medicine"}
              </button>
            </Form>
          )}
        </Formik>
      </MainModal>
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
        Medicines
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add Medicines
        </button>
      </h4>
      {medicines.length > 0 ? (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Manufacturer Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Stock</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {medicines.map((medicine) => (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{medicine.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {medicine.manufacturerName}
                    </td>
                    <td className="px-4 py-3 text-xs">$ {medicine.price}</td>
                    <td className="px-4 py-3 text-sm">{medicine.stock}</td>
                    <td className="px-4 py-3 text-sm">{medicine.discount}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          onClick={() => {
                            setEditData(medicine);
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
                          onClick={() => deleteMedicine(medicine.id)}
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 flex justify-center">
          No Medicines Added Yet.
        </h4>
      )}
    </div>
  );
};

export default Medicines;
