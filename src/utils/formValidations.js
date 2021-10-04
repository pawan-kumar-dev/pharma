import * as Yup from "yup";

const stringRequired = Yup.string()
  .trim()
  .min(3, "Minimum 3 characters")
  .required("Required");

const numberRequired = Yup.number()
  .typeError("Enter number value")
  .positive("value should be greater than 0")
  .required("Required");

const loginValidation = Yup.object().shape({
  username: stringRequired,
  password: stringRequired,
});

const medicineValidation = Yup.object().shape({
  name: stringRequired,
  manufacturerName: stringRequired,
  price: numberRequired,
  stock: numberRequired,
});

const executivesValidation = Yup.object().shape({
  firstName: stringRequired,
  lastName: stringRequired,
  dob: stringRequired,
  gender: stringRequired,
  expYears: numberRequired,
});

const orderValidation = Yup.object().shape({
  customerName: stringRequired,
  contactNumber: stringRequired,
  amount: numberRequired,
});

export {
  medicineValidation,
  loginValidation,
  executivesValidation,
  orderValidation,
};
