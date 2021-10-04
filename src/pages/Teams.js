import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { InputField, MainModal } from "../components";
import { executivesValidation } from "../utils/formValidations";
import {
  generateId,
  getLocalStorageData,
  setLocalStorageData,
} from "../utils/setInitialData";

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editData, setEditData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    expYears: 0,
  });
  useEffect(() => {
    const totalTeams = getLocalStorageData("teams") || [];
    setTeams(totalTeams);
  }, []);
  const onCloseModal = () => {
    setOpenModal(false);
    setEditData({
      firstName: "",
      lastName: "",
      dob: "",
      gender: "",
      expYears: 0,
    });
  };
  const onAddEditTeams = (data) => {
    let totalTeams = getLocalStorageData("teams") || [];
    if (editData.firstName && data.id) {
      totalTeams = totalTeams.filter((team) => team.id !== data.id);
      totalTeams.push(data);
      const TeamsData = [...teams].filter((team) => team.id !== data.id);
      TeamsData.push(data);
      setTeams(TeamsData);
      setLocalStorageData("teams", totalTeams);
    } else {
      totalTeams = [...totalTeams, { ...data, id: generateId(totalTeams) }];
      setLocalStorageData("teams", totalTeams);

      const TeamsData = [...teams, { ...data, id: generateId(teams) }];
      setTeams(TeamsData);
    }
    onCloseModal();
  };
  const deleteTeam = (id) => {
    let totalTeams = getLocalStorageData("teams") || [];
    totalTeams = totalTeams.filter((team) => team.id !== id);
    setLocalStorageData("teams", totalTeams);
    const TeamsData = [...teams].filter((team) => team.id !== id);
    setTeams(TeamsData);
  };
  return (
    <div>
      <MainModal
        open={openModal}
        onClose={() => onCloseModal()}
        title={editData.name ? "Edit Executive" : "Add Executive"}
        editData={editData}
      >
        <Formik
          initialValues={editData}
          onSubmit={onAddEditTeams}
          validateOnBlur
          validationSchema={executivesValidation}
        >
          {({ values, handleChange }) => (
            <Form style={{ width: "100%" }}>
              <InputField
                name="firstName"
                label="First Name"
                value={values.firstName || ""}
                onChange={handleChange}
              />
              <InputField
                name="lastName"
                label="Last Name"
                value={values.lastName || ""}
                onChange={handleChange}
              />
              <InputField
                name="dob"
                label="Date of Birth"
                value={values.dob || ""}
                type="date"
                onChange={handleChange}
              />
              <div className="text-gray-700 dark:text-gray-400">Gender</div>
              <div role="group" aria-labelledby="my-radio-group">
                <label className="px-3 py-1">
                  <Field
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={handleChange}
                  />
                  Male
                </label>
                <label className="px-3 py-1">
                  <Field
                    type="radio"
                    name="gender"
                    value="female"
                    onChange={handleChange}
                  />
                  Female
                </label>
              </div>
              <InputField
                name="expYears"
                label="Year of Exp"
                value={values.expYears || ""}
                onChange={handleChange}
              />
              <button className="px-3 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-md active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple mt-1">
                {editData.name ? "Edit Executive" : "Add Executive"}
              </button>
            </Form>
          )}
        </Formik>
      </MainModal>
      <h4 className="mb-4 text-lg font-semibold text-gray-600 dark:text-gray-300 flex justify-between">
        Teams
        <button
          onClick={() => setOpenModal(true)}
          className="px-4 py-2 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple"
        >
          Add Executive
        </button>
      </h4>
      {teams.length > 0 ? (
        <div className="w-full overflow-hidden rounded-lg shadow-xs">
          <div className="w-full overflow-x-auto">
            <table className="w-full whitespace-no-wrap">
              <thead>
                <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800">
                  <th className="px-4 py-3">First Name</th>
                  <th className="px-4 py-3">Last Name</th>
                  <th className="px-4 py-3">Date of Birth</th>
                  <th className="px-4 py-3">Gender</th>
                  <th className="px-4 py-3">Year of Exp</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
                {teams.map((team) => (
                  <tr className="text-gray-700 dark:text-gray-400">
                    <td className="px-4 py-3">
                      <div className="flex items-center text-sm">
                        <div>
                          <p className="font-semibold">{team.firstName}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm">{team.lastName}</td>
                    <td className="px-4 py-3 text-xs">{team.dob}</td>
                    <td className="px-4 py-3 text-sm">{team.gender}</td>
                    <td className="px-4 py-3 text-sm">{team.expYears}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center space-x-4 text-sm">
                        <button
                          onClick={() => {
                            setEditData(team);
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
                          onClick={() => deleteTeam(team.id)}
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
          No Executives Added Yet.
        </h4>
      )}
    </div>
  );
};

export default Teams;
